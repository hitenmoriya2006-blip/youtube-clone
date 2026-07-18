import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom';
import { formatDistanceToNowStrict } from "date-fns";
import { useForm } from 'react-hook-form';

const PlaylistDetails = () => {

  const [isLoading, setIsLoading] = useState(false);

  const {register,handleSubmit,reset} = useForm()

  const [playlist, setPlaylist] = useState({})
  const [playlistVideos, setPlaylistVideos] = useState([])
  const { playlistId } = useParams()
  const isEmpty = playlist?.videos?.length === 0
  const navigate = useNavigate()

  const [isEditPlaylistOpen, setIsEditPlaylistOpen] = useState(false);
  const [isDeletePlaylistOpen, setIsDeletePlaylistOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [activeVideoDropdown, setActiveVideoDropdown] = useState(null);
  const [videoToRemove, setVideoToRemove] = useState(null);

  const openEditPopup = () => {
    setIsEditPlaylistOpen(true);
  };

  const editPlaylist = async (data) => {
    try {
      const response = await axios.patch(`http://localhost:3000/api/v1/playlist/update/${playlist._id}`,
        data,
        {
          withCredentials: true
        }
      )
      setIsEditPlaylistOpen(false)
      if (response) alert('playlist updated !!')
    } catch (error) {
      console.log(error);
    }
  }

  const removeVideoFromPlaylist = async (videoId) => {
    try {
      const response = await axios.patch(`http://localhost:3000/api/v1/playlist/remove/${videoId}/${playlist._id}`,
        {},
        {
          withCredentials:true
        }
      )
    } catch (error) {
      console.log(error);
    }
  }

  const deletePlaylist = async (playlistId) => {
    try {
      const  response = await axios.delete(`http://localhost:3000/api/v1/playlist/delete/${playlistId}`,
        {
          withCredentials:true
        }
      )
      setIsDeletePlaylistOpen(false)
      if(response) alert('playlist deleted !!')
      if(response) navigate('/playlist')
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchedPLaylist = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/playlist/${playlistId}`, {
          withCredentials: true
        })
        if (response) setPlaylist(response.data.data)
        if (response) setPlaylistVideos(response.data.data.videos)

        const playlistData = response.data.data

        reset({
          title:playlistData.title,
          description:playlistData.description
        })
      } catch (error) {
        console.log(error.response?.status);
        console.log(error.response?.data);
      }
    }
    fetchedPLaylist()
  }, [playlistId,reset])

  useEffect(() => {
    console.log(playlist);
    console.log(playlistVideos);

  }, [playlist, playlistVideos])

  const timeAgo = (date) => {
    if (!date || isNaN(new Date(date).getTime())) {
      return "";
    }

    return formatDistanceToNowStrict(new Date(date), {
      addSuffix: true,
    });
  };

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


  // Skeletons
  const HeaderSkeleton = () => (
    <div className="flex flex-col md:flex-row gap-8 mb-10">
      <div className="w-full md:w-[400px] xl:w-[480px] aspect-video rounded-xl bg-surface-container-high animate-pulse flex-shrink-0"></div>
      <div className="flex flex-col gap-4 w-full pt-2">
        <div className="h-8 w-3/4 bg-surface-container-high rounded animate-pulse"></div>
        <div className="flex items-center gap-3 mt-2">
          <div className="w-8 h-8 rounded-full bg-surface-container-high animate-pulse"></div>
          <div className="h-4 w-32 bg-surface-container-high rounded animate-pulse"></div>
        </div>
        <div className="space-y-2 mt-4">
          <div className="h-4 w-full bg-surface-container-high rounded animate-pulse"></div>
          <div className="h-4 w-5/6 bg-surface-container-high rounded animate-pulse"></div>
        </div>
        <div className="flex gap-4 mt-6">
          <div className="h-10 w-32 bg-surface-container-high rounded-full animate-pulse"></div>
          <div className="h-10 w-32 bg-surface-container-high rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );

  const VideoSkeleton = () => (
    <div className="flex flex-col sm:flex-row gap-4 p-3 rounded-xl">
      <div className="w-full sm:w-[240px] md:w-[280px] aspect-video bg-surface-container-high rounded-xl animate-pulse flex-shrink-0"></div>
      <div className="flex flex-col gap-2 w-full pt-1">
        <div className="h-5 w-3/4 bg-surface-container-high rounded animate-pulse"></div>
        <div className="h-4 w-1/3 bg-surface-container-high rounded animate-pulse"></div>
        <div className="h-3 w-2/3 bg-surface-container-high rounded animate-pulse mt-2"></div>
      </div>
    </div>
  );

  return (
    <div className="bg-background min-h-screen text-on-background font-body-lg">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-8">

        {/* Loading State */}
        {isLoading && (
          <div>
            <HeaderSkeleton />
            <div className="space-y-2">
              {[1, 2, 3, 4].map(i => <VideoSkeleton key={i} />)}
            </div>
          </div>
        )}

        {!isLoading && (
          <>
            {/* Playlist Header (Cinematic Banner Enhanced) */}
            <div className="flex flex-col md:flex-row gap-8 mb-10 bg-surface-container-low p-6 md:p-8 rounded-2xl border border-outline/10 relative overflow-hidden">
              {/* Blurred Background effect */}
              {/* <div
                className="absolute inset-0 opacity-10 blur-3xl saturate-200 pointer-events-none"
                style={{ backgroundImage: `url(${playlist[0]?.video[0]?.thumbnail})`, backgroundSize: 'cover' }}
              ></div> */}

              {/* Cover Image */}
              <div className="w-full md:w-[400px] xl:w-[480px] aspect-video rounded-xl overflow-hidden flex-shrink-0 shadow-2xl relative z-10 group">
                <img
                  src={playlist?.videos?.[0]?.thumbnail || 'https://images.openai.com/static-rsc-4/UEsPB_FDurvL9hMCC4ayTb-9EPKtTjpHSxZxlheF2-GsaPbcRVRgYNIK0jcQR_VJY8XYFxY492Y-9DbqwbUhxZL2Tm_4hOHiuCj30DylPYrI-uryAVBBG9NQH47y-cCVdUIvDq4k96Um9zpiQ4YcqyX9HEaztcAlc7QvVlNfYj2G7DgmWC_hKNDE_2bM7PgD?purpose=fullsize'}
                  alt={playlist?.title}
                  className="w-full h-full object-cover "
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-5xl drop-shadow-lg" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                </div>
              </div>

              {/* Info & Actions */}
              <div className="flex flex-col w-full z-10">
                <h1 className="text-display-lg font-display-lg font-extrabold text-on-surface tracking-tight mb-4 leading-tight">
                  {playlist?.title}
                </h1>

                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-surface-container">
                    <img src={playlist?.owner?.avatar} alt={playlist?.owner?.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="font-label-lg text-on-surface font-bold">{playlist?.owner?.fullName}</span>
                  <span className="text-secondary text-[12px]">•</span>
                  <span className="text-secondary text-label-sm">{playlist?.videos?.length} videos</span>
                  <span className="text-secondary text-[12px]">•</span>
                  <span className="text-secondary text-label-sm">{timeAgo(playlist?.createdAt)}</span>
                </div>

                <p className="text-body-md text-secondary mb-8 max-w-2xl leading-relaxed">
                  {playlist?.description}
                </p>

                <div className="mt-auto flex flex-wrap items-center gap-3">
                  <button className="flex items-center gap-2 px-8 py-3 rounded-full bg-on-surface text-background font-label-lg font-bold hover:bg-on-surface-variant transition-colors shadow-lg active:scale-95">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                    Play All
                  </button>
                  <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-surface-container-high text-on-surface font-label-lg hover:bg-surface-variant/50 border border-outline/20 transition-colors active:scale-95">
                    <span className="material-symbols-outlined">shuffle</span>
                    Shuffle
                  </button>

                  <div className="h-8 w-[1px] bg-outline/20 mx-2 hidden sm:block"></div>

                  <button
                    onClick={() => openEditPopup()}
                    className="p-3 rounded-full bg-surface-container-high text-on-surface hover:bg-surface-variant/50 border border-outline/20 transition-colors" title="Edit Playlist"
                  >
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <button className="p-3 rounded-full bg-surface-container-high text-on-surface hover:bg-surface-variant/50 border border-outline/20 transition-colors" title="Share Playlist">
                    <span className="material-symbols-outlined">share</span>
                  </button>
                  <button
                    onClick={() => setIsDeletePlaylistOpen(true)}
                    className="p-3 rounded-full bg-surface-container-high text-on-surface hover:bg-error/20 hover:text-error hover:border-error/30 border border-outline/20 transition-colors ml-auto md:ml-0" title="Delete Playlist"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Empty State */}
            {isEmpty ? (
              <div className="flex flex-col items-center justify-center py-16 text-center bg-surface-container-lowest rounded-2xl border border-outline/5 border-dashed">
                <div className="w-24 h-24 mb-6 rounded-full bg-surface-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-5xl text-secondary">video_library</span>
                </div>
                <h2 className="text-headline-lg font-headline-lg text-on-surface mb-2">
                  This playlist is empty
                </h2>
                <p className="text-body-md text-secondary max-w-md mb-6">
                  Start adding videos to your playlist to watch them here later or share them with others.
                </p>
                <button onClick={() => navigate('/')} className="flex items-center gap-2 px-6 py-2.5 bg-primary-container text-on-primary-container font-label-lg rounded-full hover:brightness-110 transition-colors">
                  <span className="material-symbols-outlined">add</span>
                  Add Videos
                </button>
              </div>
            ) : (
              /* Video List */
              <div className="flex flex-col gap-2">
                {playlistVideos.map((video) => (
                  <Link to={`/watch/${video._id}`}>
                    <div
                      key={video._id}
                      className="group flex flex-col sm:flex-row gap-4 p-3 rounded-xl hover:bg-surface-container-lowest transition-colors cursor-pointer border border-transparent hover:border-outline/5"
                    >

                      {/* Thumbnail */}
                      <div className="relative w-full sm:w-[240px] md:w-[280px] aspect-video bg-surface-container-low rounded-xl overflow-hidden flex-shrink-0">
                        <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                        <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 bg-black/80 text-white text-[12px] font-medium rounded backdrop-blur-sm">
                          {formatDuration(video.duration)}
                        </div>
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="material-symbols-outlined text-white text-4xl">play_arrow</span>
                        </div>
                      </div>

                      {/* Video Info */}
                      <div className="flex flex-col flex-1 py-1 pr-2">
                        <div className="flex justify-between items-start gap-4">
                          <h3 className="text-headline-md font-headline-md text-on-surface group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                            {video.title}
                          </h3>
                          <div className="relative">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                setActiveVideoDropdown(activeVideoDropdown === video._id ? null : video._id);
                              }}
                              className={`p-1.5 text-secondary hover:text-on-surface hover:bg-surface-variant/40 rounded-full transition-colors flex-shrink-0 ${activeVideoDropdown === video._id ? 'bg-surface-variant/40 text-on-surface' : 'opacity-0 group-hover:opacity-100'}`}
                            >
                              <span className="material-symbols-outlined">more_vert</span>
                            </button>

                            {activeVideoDropdown === video._id && (
                              <div className="absolute right-0 top-full mt-1 w-56 bg-surface-container-highest rounded-lg shadow-xl border border-white/5 py-1 z-50">
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setVideoToRemove(video);
                                    setActiveVideoDropdown(null);
                                  }}
                                  className="w-full flex items-center gap-2 px-4 py-2 text-label-lg text-error hover:bg-white/5 transition-colors text-left"
                                >
                                  <span className="material-symbols-outlined text-error text-[20px]">delete</span>
                                  Remove from playlist
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="mt-1 flex items-center gap-1 text-label-sm text-secondary">
                          <span className="hover:text-on-surface transition-colors">{video.owner?.fullName}</span>
                          <span className="text-[10px]">•</span>
                          <span>{video?.views}  views</span>
                          <span className="text-[10px]">•</span>
                          <span>{timeAgo(video?.createdAt)}</span>
                        </div>

                        <p className="mt-2 text-body-md text-secondary line-clamp-2 hidden sm:block">
                          {video.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Edit Playlist Popup */}
      {isEditPlaylistOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity duration-300">
          <div className="relative w-full max-w-[480px] bg-surface-container-high rounded-xl overflow-hidden shadow-2xl border border-white/5 mx-4 md:mx-0">
            <div className="px-5 py-4 flex items-center justify-between border-b border-outline-variant/30">
              <h2 className="font-headline-md text-headline-md text-on-surface">Edit Playlist</h2>
              <button
                className="p-2 rounded-full hover:bg-surface-container-highest transition-colors"
                onClick={() => setIsEditPlaylistOpen(false)}
              >
                <span className="material-symbols-outlined text-on-surface-variant">close</span>
              </button>
            </div>
            <form onSubmit={handleSubmit(editPlaylist)}>
              <div className="p-5 space-y-5">
                <div className="space-y-1.5 group mb-4">
                  <div className="flex justify-between items-center">
                    <label className="font-label-lg text-label-lg text-on-surface-variant">Title (required)</label>
                  </div>
                  <input
                    className="w-full bg-surface-container-lowest border-2 border-outline-variant/30 focus:border-primary-container rounded-lg py-2.5 px-4 text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none transition-all"
                    maxLength="100"
                    {...register('title')}
                    type="text"
                  />
                </div>
                <div className="space-y-1.5 group mb-4">
                  <div className="flex justify-between items-center">
                    <label className="font-label-lg text-label-lg text-on-surface-variant">Description</label>
                  </div>
                  <textarea
                    className="w-full bg-surface-container-lowest border-2 border-outline-variant/30 focus:border-primary-container rounded-lg py-2.5 px-4 text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none transition-all resize-none custom-scrollbar"
                    maxLength="5000"
                    rows="3"
                    {...register('description')}
                  ></textarea>
                </div>
              </div>
              <div className="px-5 py-3 bg-surface-container-highest/50 flex justify-end items-center gap-3">
                <button className="px-5 py-2 rounded-full font-label-lg text-label-lg text-primary hover:bg-primary/10 transition-all active:scale-95" onClick={() => setIsEditPlaylistOpen(false)}>Cancel</button>
                <button
                 type='submit'
                  className="px-5 py-2 rounded-full font-label-lg text-label-lg bg-primary-container text-on-primary-container font-bold hover:brightness-110 transition-all active:scale-95 flex items-center justify-center min-w-[80px]"
                >
                  {isSaving ? <span className="material-symbols-outlined animate-spin">sync</span> : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Playlist Popup */}
      {isDeletePlaylistOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity duration-300">
          <div className="relative w-full max-w-[400px] bg-surface-container-high rounded-xl overflow-hidden shadow-2xl border border-white/5 mx-4">
            <div className="p-6">
              <h3 className="text-headline-lg font-headline-lg text-on-surface mb-2">Delete playlist?</h3>
              <p className="text-body-md text-secondary">
                Are you sure you want to delete <span className="font-bold text-on-surface">"{playlist?.title}"</span>? This action cannot be undone.
              </p>
            </div>
            <div className="px-6 py-4 bg-surface-container-highest/50 flex justify-end items-center gap-3">
              <button className="px-5 py-2 rounded-full font-label-lg text-label-lg text-on-surface hover:bg-white/5 transition-colors" onClick={() => setIsDeletePlaylistOpen(false)}>Cancel</button>
              <button
                onClick={() => deletePlaylist(playlist._id)}
                className="px-5 py-2 rounded-full font-label-lg text-label-lg bg-error text-on-error font-bold hover:brightness-110 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Remove Video Popup */}
      {videoToRemove && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity duration-300">
          <div className="relative w-full max-w-[400px] bg-surface-container-high rounded-xl overflow-hidden shadow-2xl border border-white/5 mx-4">
            <div className="p-6">
              <h3 className="text-headline-lg font-headline-lg text-on-surface mb-2">Remove video?</h3>
              <p className="text-body-md text-secondary">
                Remove <span className="font-bold text-on-surface">"{videoToRemove.title}"</span> from this playlist?
              </p>
            </div>
            <div className="px-6 py-4 bg-surface-container-highest/50 flex justify-end items-center gap-3">
              <button className="px-5 py-2 rounded-full font-label-lg text-label-lg text-on-surface hover:bg-white/5 transition-colors" onClick={() => setVideoToRemove(null)}>Cancel</button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                 removeVideoFromPlaylist(videoToRemove._id)
                  setVideoToRemove(null);
                }}
                className="px-5 py-2 rounded-full font-label-lg text-label-lg bg-error text-on-error font-bold hover:brightness-110 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default PlaylistDetails;
