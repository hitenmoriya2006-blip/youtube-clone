import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useParams, Link, useNavigate, data } from 'react-router-dom';
import { formatDistanceToNowStrict } from "date-fns";

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


  const { videoId } = useParams()

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/videos/get/${videoId}`,
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

  const toggleSubscription = async () => {
    try {
      const response = await axios.patch(`http://localhost:3000/api/v1/subscription/toggleSub/${video?.owner?._id}`,
        {},
        { withCredentials: true }
      )
      if (response) {
        setIsSubscribed(response.data.data.subscribed)
      }
    } catch (error) {
      console.log(error.response?.status);
      console.log(error.response?.data);
    }
  }

  const toggleLike = async () => {
    try {
      const response = await axios.patch(`http://localhost:3000/api/v1/like/toggle/${videoId}`,
        {},
        {
          withCredentials: true
        }
      )

      if (response) {
        setIsLiked(response.data.data.liked)
      }
    } catch (error) {
      console.log(error.response?.status);
      console.log(error.response?.data);
    }
  }

  const timeAgo = (date) => {
    return formatDistanceToNowStrict(new Date(date), {
      addSuffix: true,
    });
  };

  useEffect(() => {
    const getAllComments = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/comment/get-comments/${videoId}`,
          {
            withCredentials: true
          }
        )
        if (response) {
          setAllComments(response.data.data.docs)
        }
      } catch (error) {
        console.log(error.response?.status);
        console.log(error.response?.data);
      }
    }

    const fetchSuggestedVideos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/videos/get-all',
          {
            withCredentials: true
          }
        )
        if (response) {
          setsuggestedVideos(response.data.data.allVideos)
        }
      } catch (error) {
        onsole.log(error.response?.status);
        console.log(error.response?.data);
      }
    }

    const userInfoFetched = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/users/current-user',
          {
            withCredentials:true
          }
        )
        if(response) setuserInfo(response.data.data.user)
      } catch (error) {
        console.log(error.response?.status);
        console.log(error.response?.data);
      }
    }

    getAllComments()
    fetchSuggestedVideos()
    userInfoFetched()
  }, [])

  const formatDuration = (duration) => {
    const totalSeconds = Math.floor(duration);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`;
    }

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const addComment = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/api/v1/comment/add/${videoId}`,
        { comment },
        {
          withCredentials: true
        }
      )
    } catch (error) {
      console.log(error.response?.status);
      console.log(error.response?.data);
    }
  }

  return (
    <div className="font-body-lg text-on-surface bg-surface h-screen overflow-y-auto">



      {/* Main Content Grid */}
      <main className="pt-4  min-h-screen">
        <div className="max-w-[1700px] mx-auto flex flex-col lg:flex-row gap-6 p-4 lg:p-6">
          {/* Video Section */}
          <div className="flex-1 lg:max-w-[calc(100%-400px)]">
            {/* Video Player */}
            <div className="relative aspect-video bg-black rounded-xl overflow-hidden group cursor-pointer shadow-2xl">
              <video src={video?.videoFile} controls autoPlay
                className="w-full h-full object-cover opacity-80" alt="Video Player"></video>
            </div>

            {/* Video Metadata */}
            <div className="mt-4">
              <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold leading-tight">
                {video?.title}
              </h1>
              <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Link to={`/channel/${video?.owner?.username}`}>  <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container">
                    <img className="w-full h-full object-cover" alt="Nexus Tech Lab Logo" src={video?.owner?.avatar} />
                  </div></Link>
                    <div>
                    <Link to={`/channel/${video?.owner?.username}`}><h3 className="font-headline-md text-headline-md">{video?.owner?.fullName}</h3></Link>
                      <p className="text-label-sm text-on-surface-variant">{video?.subscribersCount} subscribers</p>
                    </div>
                  
                  <button
                    onClick={toggleSubscription}
                    className={`ml-4 px-4 py-2 rounded-full font-bold text-label-lg transition-all active:scale-95 ${isSubscribed
                      ? 'bg-surface-container-high text-on-surface-variant'
                      : 'bg-on-surface text-surface hover:opacity-90'
                      }`}
                  >
                    {isSubscribed ? 'Subscribed' : 'Subscribe'}
                  </button>
                  <button className="px-4 py-2 bg-surface-container-high text-on-surface rounded-full font-bold text-label-lg hover:bg-surface-variant transition-colors active:scale-95">
                    Join
                  </button>
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                  <div className="flex items-center bg-surface-container-high rounded-full">
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
                  <button className="p-2 bg-surface-container-high rounded-full hover:bg-surface-variant transition-colors active:scale-95 shrink-0">
                    <span className="material-symbols-outlined">more_horiz</span>
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
                allComments.length === 0 ?
                  <div className='text-white font-medium text-center'>no comments on this video</div> :
                  <div className="space-y-6">
                    {
                      allComments.map((comts) => (
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
                              <div className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-lg cursor-pointer">thumb_up</span>
                                <span className="text-label-sm">842</span>
                              </div>
                              <span className="material-symbols-outlined text-lg cursor-pointer">thumb_down</span>
                              <button className="text-label-sm font-bold hover:bg-surface-variant px-3 py-1 rounded-full">Reply</button>
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
              }
            </div>
          </div>

          {/* Sidebar (Recommendations) */}
          <div className="w-full lg:w-[400px] flex flex-col gap-3">
            {/* Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <button className="px-3 py-1.5 bg-on-surface text-surface rounded-lg text-label-lg font-bold whitespace-nowrap">All</button>
              <button className="px-3 py-1.5 bg-surface-container-high text-on-surface rounded-lg text-label-lg font-bold whitespace-nowrap hover:bg-surface-variant transition-colors">From Nexus Tech Lab</button>
              <button className="px-3 py-1.5 bg-surface-container-high text-on-surface rounded-lg text-label-lg font-bold whitespace-nowrap hover:bg-surface-variant transition-colors">PC Building</button>
              <button className="px-3 py-1.5 bg-surface-container-high text-on-surface rounded-lg text-label-lg font-bold whitespace-nowrap hover:bg-surface-variant transition-colors">Hardware</button>
            </div>
            {/* Related Videos */}
            <div className="flex flex-col gap-3">
              {
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
    </div>
  );
};

export default Watch;




//  <div className="relative aspect-video bg-black rounded-xl overflow-hidden group cursor-pointer shadow-2xl">
//             <img className="w-full h-full object-cover opacity-80" alt="Video Player" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXoXsaRy-3SMI0FEMwlzC81U97IUBWaWSv1dbRIPwGlUEce5Zy4cIW4KdrL8WfxGlTwVIFLrjWLczElqZInhImJYnMqDeOrHjiI6PJ2RCX90ZUPS_qE-WK3N7P58jmbLWp4kLpjqNVBQVtzaCFiSQujnX2KU84QhM8diiRWiGaez24AfAaNgH68PC7vhx_wgfarBM7EYtl-3076bbPu7r6_uA3tTjDVw0N78PraZGFtRtwrAIXBgg" />
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity scale-125">
//                 <span className="material-symbols-outlined text-white text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
//               </div>
//             </div>
//             {/* Mock Player Controls Overlay */}
//             <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
//               <div className="h-1 bg-white/30 rounded-full mb-4 overflow-hidden">
//                 <div className="h-full bg-primary-container w-1/3"></div>
//               </div>
//               <div className="flex justify-between items-center text-white">
//                 <div className="flex items-center gap-4">
//                   <span className="material-symbols-outlined cursor-pointer">play_arrow</span>
//                   <span className="material-symbols-outlined cursor-pointer">skip_next</span>
//                   <span className="material-symbols-outlined cursor-pointer">volume_up</span>
//                   <span className="text-label-sm">12:34 / 45:10</span>
//                 </div>
//                 <div className="flex items-center gap-4">
//                   <span className="material-symbols-outlined cursor-pointer">settings</span>
//                   <span className="material-symbols-outlined cursor-pointer">picture_in_picture_alt</span>
//                   <span className="material-symbols-outlined cursor-pointer">fullscreen</span>
//                 </div>
//               </div>
//             </div>
//           </div>
