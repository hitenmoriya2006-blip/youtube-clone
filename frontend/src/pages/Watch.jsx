import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { formatDistanceToNowStrict } from "date-fns";
import { toast } from 'sonner'
import SuggestedVideoSkeleton from '@/skeleton/SuggestedVideoSkeleton';
import CommentSkeleton from '@/skeleton/CommentSkeleton';
import VideoPlayer from '@/components/VideoPlayer';
import { formatDuration, timeAgo } from '../utils/formatter.js'
import api from '@/api/axios';

const Watch = () => {
  const [isSubscribed, setIsSubscribed] = useState();
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [allComments, setAllComments] = useState([])
  const [video, setvideo] = useState()
  const [userInfo, setuserInfo] = useState(null)
  const [suggestedVideos, setsuggestedVideos] = useState([])
  const [comment, setComment] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [playlist, setPlaylist] = useState([])
  const [loading, setLoading] = useState(true)
  const [commentLoading, setCommentLoading] = useState(true)
  const navigate = useNavigate()

  
  const [isSavePopupOpen, setIsSavePopupOpen] = useState(false);
  const [replyingToId, setReplyingToId] = useState(null);
  const [replyContent, setReplyContent] = useState("");

  const { videoId } = useParams()

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await api.get(`/videos/get/${videoId}`,
          {
            withCredentials: true,
          }
        )
        if (response) {
          setvideo(response.data.data)
          setIsSubscribed(response.data.data.isSubscribed);
          setIsLiked(response.data.data.isLiked)
        }
      } catch (error) {
        console.log(error.response?.status);
        console.log(error.response?.data);
      }
    }

    fetchVideo()
  }, [videoId])

  useEffect(() => {
    const getAllComments = async () => {
      try {
        setCommentLoading(true)
        const response = await api.get(`/comment/get-comments/${videoId}`,
          {
            withCredentials: true
          }
        )

        if(response) setAllComments(response.data.data.docs)
      } catch (error) {
        console.log(error.response?.status);
        console.log(error.response?.data);
      } finally {
        setCommentLoading(false)
      }
    }

    getAllComments()
  }, [videoId])

  const toggleSubscription = async () => {
    try {
      const response = await api.patch(`/subscription/toggleSub/${video?.owner?._id}`,
        {},
        { withCredentials: true }
      )
      if (response) {
        toast.success(response.data?.message)
        setIsSubscribed(response.data.data.subscribed)
      }
    } catch (error) {
      toast.error(error.response?.data?.message)
      console.log(error.response?.status);
      console.log(error.response?.data?.message);
    }
  }

  const toggleLike = async () => {
    try {
      const response = await api.patch(`/like/toggle/${videoId}`,
        {},
        {
          withCredentials: true
        }
      )

      const videoResponse = await api.get(`/videos/get/${videoId}`,
        {
          withCredentials: true,
        }
      )

      if (videoResponse) {
        setvideo(videoResponse.data.data)
      }

      if (response) {
        toast.success(response.data.message)
        setIsLiked(response.data.data.liked)
      }
    } catch (error) {
      console.log(error.response?.status);
      console.log(error.response?.data);
    }
  }

  useEffect(() => {

    const fetchRelatedVideos = async () => {
      try {
        setLoading(true)
        const response = await api.get(`/videos/related/${videoId}`,
          {
            withCredentials: true
          }
        )
        
        if (response) {
          setsuggestedVideos(response.data.data)
        }
      } catch (error) {
        console.log(error.response?.status);
        console.log(error.response?.data);
      } finally {
        setLoading(false)
      }
    }

    const userInfoFetched = async () => {
      try {
        const response = await api.get('/users/current-user',
          {
            withCredentials: true
          }
        )
        if (response) setuserInfo(response.data.data.user)
      } catch (error) {
        console.log(error.response?.status);
        console.log(error.response?.data);
      }
    }

    const fetchedPlaylist = async () => {
      try {
        const response = await api.get('/playlist/user',
          {
            withCredentials: true
          }
        )
        if (response) setPlaylist(response.data.data)
      } catch (error) {
        console.log(error.response?.status);
        console.log(error.response?.data);
      }
    }

    fetchRelatedVideos()
    userInfoFetched()
    fetchedPlaylist()
  }, [])

  const addComment = async () => {
    try {
      const response = await api.post(`/comment/add/${videoId}`,
        { comment },
        {
          withCredentials: true
        }
      )

      setComment('')
      setIsFocused(false)
      if (response.data?.data) {
        const newComment = { ...response.data.data};
        setAllComments(prev => [newComment, ...prev]);
      }
    } catch (error) {
      console.log(error.response?.status);
      console.log(error.response?.data);
    }
  }

  const handleLikeComment = async (commentId) => {
    
    setAllComments(prev => prev.map(c => {
      if (c._id === commentId) {
        const wasLiked = c.isLiked;
        return {
          ...c,
          isLiked: !wasLiked,
          likesCount: wasLiked ? c.likesCount - 1 : c.likesCount + 1
        };
      }
      return c;
    }));

    try {
      const response = await api.patch(`/like/toggle/c/${commentId}`, {}, { withCredentials: true });
      if (response) toast.success(response.data?.message)

    } catch (error) {
      setAllComments(prev => prev.map(c => {
        if (c._id === commentId) {
          const wasLiked = c.isLiked;
          return {
            ...c,
            isLiked: !wasLiked,
            likesCount: wasLiked ? c.likesCount - 1 : c.likesCount + 1
          };
        }
        return c;
      }));
      console.log("Like API error", error);
    }
  }

  const handleReplySubmit = async (commentId) => {
    if (!replyContent.trim()) return;
    try {
      const response = await api.post(`/comment/add/${videoId}`,
        { comment: replyContent, parentId: commentId },
        { withCredentials: true }
      );
      toast.success("Reply posted");
      setReplyingToId(null);
      setReplyContent("");

      if (response.data?.data) {
        setAllComments(prev => prev.map(c => {
          if (c._id === commentId) {
            return {
              ...c,
              replies: [response.data.data, ...(c.replies || [])]
            }
          }
          return c;
        }));
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to post reply");
    }
  }

  const addVideoTOPlayList = async (playlistId) => {
    try {
      const response = await api.patch(`/playlist/add/${videoId}/${playlistId}`,
        {},
        {
          withCredentials: true
        }
      )
      if (response) alert('Video added to Playlist')
      setIsSavePopupOpen(false)
    } catch (error) {
      console.log(error.response?.status);
      console.log(error.response?.data);
    }
  }

  return (
    <div className="font-body-lg text-on-surface bg-surface h-screen overflow-y-auto">

      {/* Main Content Grid */}
      <main className="pt-4  min-h-screen">
        <div className="max-w-[1700px] mx-auto flex flex-col lg:flex-row gap-6 p-4 lg:p-4">
          {/* Video Section */}
          <div className="flex-1 lg:max-w-[calc(100%-400px)]">
            {/* Video Player */}
            <div className="relative aspect-video bg-black rounded-xl overflow-hidden group cursor-pointer shadow-2xl">
              {/* <video src={video?.videoFile} controls autoPlay
                className="w-full h-full object-cover opacity-80" alt="Video Player"></video> */}
                <VideoPlayer src={video?.videoFile} poster={video?.thumbnail} title={video?.title} />
            </div>

            {/* Video Metadata */}
            <div className="mt-4">
              <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold leading-tight">
                {video?.title}
              </h1>
              <div className="mt-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex flex-wrap sm:flex-nowrap items-center justify-between sm:justify-start gap-3 w-full lg:w-auto">
                  <div className="flex items-center gap-3 min-w-0">
                    <Link to={`/channel/${video?.owner?.username}`} className="shrink-0">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container">
                        <img className="w-full h-full object-cover" alt="Nexus Tech Lab Logo" src={video?.owner?.avatar} />
                      </div>
                    </Link>
                    <div className="min-w-0 pr-2">
                      <Link to={`/channel/${video?.owner?.username}`}><h3 className="font-headline-md text-headline-md truncate">{video?.owner?.fullName}</h3></Link>
                      <p className="text-label-sm text-on-surface-variant truncate">{video?.subscribersCount} subscribers</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-2 sm:mt-0 ml-auto sm:ml-2 shrink-0">
                    <button
                      onClick={toggleSubscription}
                      className={`px-4 py-2 rounded-full font-bold text-label-lg transition-all active:scale-95 whitespace-nowrap ${isSubscribed
                        ? 'bg-surface-container-high text-on-surface-variant'
                        : 'bg-on-surface text-surface hover:opacity-90'
                        }`}
                    >
                      {isSubscribed ? 'Subscribed' : 'Subscribe'}
                    </button>
                    <button className="px-4 py-2 bg-surface-container-high text-on-surface rounded-full font-bold text-label-lg hover:bg-surface-variant transition-colors active:scale-95 whitespace-nowrap hidden sm:block">
                      Join
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 pb-2 lg:pb-0 overflow-x-auto scrollbar-hide w-full lg:w-auto">
                  <div className="flex items-center bg-surface-container-high rounded-full shrink-0">
                    <button
                      onClick={toggleLike}
                      className={`flex items-center gap-2 px-4 py-2 border-r border-outline-variant hover:bg-surface-variant transition-colors rounded-l-full ${isLiked ? 'text-primary-container' : ''
                        }`}
                    >
                      <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: isLiked ? "'FILL' 1" : "'FILL' 0" }}>thumb_up</span>
                      <span className="text-label-lg font-bold">{video?.likesCount}</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsDisliked(!isDisliked);
                        if (isLiked) setIsLiked(false);
                      }}
                      className={`px-4 py-2 hover:bg-surface-variant transition-colors rounded-r-full ${isDisliked ? 'text-primary-container' : ''
                        }`}
                    >
                      <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: isDisliked ? "'FILL' 1" : "'FILL' 0" }}>thumb_down</span>
                    </button>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-high rounded-full hover:bg-surface-variant transition-colors active:scale-95 shrink-0">
                    <span className="material-symbols-outlined">share</span>
                    <span className="text-label-lg font-bold">Share</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-high rounded-full hover:bg-surface-variant transition-colors active:scale-95 shrink-0">
                    <span className="material-symbols-outlined">download</span>
                    <span className="text-label-lg font-bold">Download</span>
                  </button>
                  <button
                    onClick={() => setIsSavePopupOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-surface-container-high rounded-full hover:bg-surface-variant transition-colors active:scale-95 shrink-0"
                  >
                    <span className="material-symbols-outlined">bookmark_border</span>
                    <span className="text-label-lg font-bold">Save</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-4 p-3 bg-surface-container-low rounded-xl cursor-pointer hover:bg-surface-container transition-colors group">
              <div className="flex gap-2 text-label-lg font-bold mb-1">
                <span>{video?.views} views</span>
                <span>{video && timeAgo(video.createdAt)}</span>
                <span className="text-on-surface-variant"></span>
              </div>
              <div className="text-body-md leading-relaxed">
                {video?.description}
              </div>
              <button className="mt-2 text-label-lg font-bold text-on-surface group-hover:underline">Show more</button>
            </div>

            {/* Comments Section */}
            <div className="mt-6">
              <div className="flex items-center gap-6 mb-6">
                <h2 className="font-headline-lg text-headline-lg">{allComments.length} Comments</h2>
                <button className="flex items-center gap-2">
                  <span className="material-symbols-outlined">sort</span>
                  <span className="text-label-lg font-bold">Sort by</span>
                </button>
              </div>
              {/* Add Comment */}
              <div className="flex gap-4 mb-8">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container-highest flex-shrink-0">
                  <img
                    className="w-full h-full object-cover"
                    src={userInfo?.avatar}
                  />
                </div>

                <div className="flex-1">
                  <div className="border-b border-outline-variant focus-within:border-on-surface transition-colors pb-1">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      onFocus={() => setIsFocused(true)}
                      className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-body-lg placeholder:text-on-surface-variant"
                    />
                  </div>

                  {isFocused && (
                    <div className="flex justify-end gap-2 mt-3">
                      <button
                        onClick={() => {
                          setComment("");
                          setIsFocused(false);
                        }}
                        className="px-4 py-2 rounded-full font-medium hover:bg-surface-container-high transition-colors"
                      >
                        Cancel
                      </button>

                      <button
                        disabled={!comment.trim()}
                        className={`px-4 py-2 rounded-full font-medium transition-colors ${comment.trim()
                          ? "bg-primary text-on-primary hover:opacity-90"
                          : "bg-surface-container-high text-on-surface-variant cursor-not-allowed"
                          }`}
                        onClick={addComment}
                      >
                        Comment
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {/* Comment List */}

              {
                commentLoading ? (
                  <div className="space-y-6">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <CommentSkeleton key={index} />
                    ))}
                  </div>
                ) :
                  allComments.length === 0 ?
                    (<div className='text-white font-medium text-center'>no comments on this video</div>) :
                    (
                      <div className="space-y-6">
                        {allComments.map((comts) => (
                          <div key={comts._id} className="flex gap-4">
                            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                              <img className="w-full h-full object-cover" alt="User Avatar" src={comts.owner?.avatar} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-label-lg font-bold">{comts.owner?.fullName}</span>
                                <span className="text-label-sm text-on-surface-variant">{timeAgo(comts.createdAt)}</span>
                              </div>
                              <p className="text-body-md">{comts.content}</p>
                              <div className="flex items-center gap-4 mt-2">
                                <button onClick={() => handleLikeComment(comts._id)} className="flex items-center gap-1 hover:bg-surface-variant px-2 py-1 rounded-full transition-colors">
                                  <span className="material-symbols-outlined text-lg" style={{ color: comts.isLiked ? '#ef4444' : 'inherit', fontVariationSettings: comts.isLiked ? "'FILL' 1" : "'FILL' 0" }}>thumb_up</span>
                                  <span className="text-label-sm">{comts.likesCount}</span>
                                </button>
                                <button className="flex items-center hover:bg-surface-variant p-1 rounded-full transition-colors">
                                  <span className="material-symbols-outlined text-lg">thumb_down</span>
                                </button>
                                <button
                                  onClick={() => {
                                    setReplyingToId(comts._id);
                                    setReplyContent("");
                                  }}
                                  className="text-label-sm font-bold hover:bg-surface-variant px-3 py-1 rounded-full transition-colors">
                                  Reply
                                </button>
                              </div>

                              {/* Reply Input Box */}
                              {replyingToId === comts._id && (
                                <div className="mt-4 flex gap-4">
                                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                                    <img className="w-full h-full object-cover" src={userInfo?.avatar} alt="User Avatar" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="border-b border-outline-variant focus-within:border-on-surface transition-colors pb-1">
                                      <input
                                        type="text"
                                        autoFocus
                                        placeholder="Add a reply..."
                                        value={replyContent}
                                        onChange={(e) => setReplyContent(e.target.value)}
                                        className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-body-md placeholder:text-on-surface-variant"
                                      />
                                    </div>
                                    <div className="flex justify-end gap-2 mt-3">
                                      <button
                                        onClick={() => {
                                          setReplyingToId(null);
                                          setReplyContent("");
                                        }}
                                        className="px-4 py-2 rounded-full font-medium text-label-lg hover:bg-surface-container-high transition-colors"
                                      >
                                        Cancel
                                      </button>
                                      <button
                                        disabled={!replyContent.trim()}
                                        onClick={() => handleReplySubmit(comts._id)}
                                        className={`px-4 py-2 rounded-full font-medium text-label-lg transition-colors ${replyContent.trim()
                                          ? "bg-primary text-on-primary hover:opacity-90"
                                          : "bg-surface-container-high text-on-surface-variant cursor-not-allowed"
                                          }`}
                                      >
                                        Reply
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Replies List */}
                              {comts.replies && comts.replies.length > 0 && (
                                <div className="mt-4 space-y-4 pl-4 border-l border-outline-variant/30">
                                  {comts.replies.map(reply => (
                                    <div key={reply._id} className="flex gap-3">
                                      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                                        <img className="w-full h-full object-cover" alt="User Avatar" src={reply.owner?.avatar} />
                                      </div>
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                          <span className="text-label-sm font-bold">{reply.owner?.fullName}</span>
                                          <span className="text-[11px] text-on-surface-variant">{reply.createdAt && timeAgo(reply.createdAt)}</span>
                                        </div>
                                        <p className="text-body-md text-sm">{reply.content}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}

                            </div>
                          </div>
                        ))
                        }
                      </div>
                    )
              }
            </div>
          </div>

          {/* Sidebar (Recommendations) */}
          <div className="w-full lg:w-[400px] flex flex-col gap-3">
            Filters
            <div  className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <button onClick={() =>  navigate(`/`)} className="px-3 py-1.5 bg-on-surface text-surface rounded-lg text-label-lg font-bold whitespace-nowrap">All</button>
              <button onClick={() =>  navigate(`/channel/${video?.owner?.username}`)} className="px-3 py-1.5 bg-surface-container-high text-on-surface rounded-lg text-label-lg font-bold whitespace-nowrap hover:bg-surface-variant transition-colors">From {video?.owner?.fullName}</button>
            </div>
            {/* Related Videos */}
            <div className="flex flex-col gap-3">
              {
                loading ? <div className="flex flex-col gap-4">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <SuggestedVideoSkeleton key={index} />
                  ))}
                </div>
                  :
                  suggestedVideos.map((video) => (
                    <Link to={`/watch/${video._id}`} key={video._id}>
                      <div className="flex gap-3 group cursor-pointer">
                        <div className="relative w-40 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-surface-container">
                          <img className="w-full h-full object-cover" alt="Motherboard" src={video.thumbnail} />
                          <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] px-1 rounded">{formatDuration(video.duration)}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <h4 className="text-label-lg font-bold leading-tight line-clamp-2 group-hover:text-primary-container transition-colors">{video.title}</h4>
                          <p className="text-[12px] text-on-surface-variant hover:text-on-surface">{video.owner?.fullName}</p>
                          <p className="text-[12px] text-on-surface-variant">{video.views} views • {timeAgo(video.createdAt)}</p>
                        </div>
                      </div>
                    </Link>
                  ))
              }
            </div>
          </div>
        </div>
      </main>

      {/* BottomNavBar (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-12 bg-surface border-t border-outline-variant/10">
        <div className="flex flex-col items-center gap-0.5 text-on-surface font-bold">
          <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
          <span className="text-[9px] font-label-sm">Home</span>
        </div>
        <div className="flex flex-col items-center gap-0.5 text-on-surface-variant">
          <span className="material-symbols-outlined text-xl">play_circle</span>
          <span className="text-[9px] font-label-sm">Shorts</span>
        </div>
        <div className="flex flex-col items-center gap-0.5 text-on-surface-variant">
          <span className="material-symbols-outlined text-xl">subscriptions</span>
          <span className="text-[9px] font-label-sm">Subs</span>
        </div>
        <div className="flex flex-col items-center gap-0.5 text-on-surface-variant">
          <span className="material-symbols-outlined text-xl">video_library</span>
          <span className="text-[9px] font-label-sm">Library</span>
        </div>
      </nav>

      {/* Save to Playlist Popup */}
      {isSavePopupOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity duration-300">
          <div className="relative w-full max-w-[360px] bg-surface-container-high rounded-xl overflow-hidden shadow-2xl border border-white/5 mx-4">

            <div className="px-5 py-4 flex items-center justify-between border-b border-outline-variant/30">
              <h2 className="font-headline-md text-headline-md text-on-surface">Save to...</h2>
              <button
                className="p-2 rounded-full hover:bg-surface-container-highest transition-colors"
                onClick={() => setIsSavePopupOpen(false)}
              >
                <span className="material-symbols-outlined text-on-surface-variant">close</span>
              </button>
            </div>

            <div className="p-4 space-y-3 max-h-[60vh] overflow-y-auto">
              {playlist.map(pl => (
                <div onClick={() => addVideoTOPlayList(pl._id)} key={pl?._id} className="flex items-center justify-between p-2 rounded-lg hover:bg-surface-container-highest cursor-pointer transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-10 bg-surface-container rounded overflow-hidden">
                      <img src={pl.videos?.[0]?.thumbnail} alt={pl.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="text-label-lg font-bold text-on-surface">{pl.title}</div>
                      <div className="text-[12px] text-on-surface-variant">{pl.privacy}</div>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:text-on-surface">
                    bookmark_border
                  </span>
                </div>
              ))}
            </div>

            <div className="px-4 py-3 border-t border-outline-variant/30 bg-surface-container-highest/50">
              <button onClick={() => navigate('/playlist')} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full bg-surface-container-low hover:bg-surface-variant transition-colors text-on-surface font-label-lg border border-outline-variant/30">
                <span className="material-symbols-outlined">add</span>
                New playlist
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Watch;
