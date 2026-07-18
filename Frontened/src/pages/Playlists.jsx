import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const Playlists = () => {
  // Use these to test the loading and empty states
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [playlist, setPlaylist] = useState([])

  // Popup state
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
  const [playlistTitle, setPlaylistTitle] = useState('');
  const [playlistDesc, setPlaylistDesc] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  
  // Delete Popup state
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [playlistToDelete, setPlaylistToDelete] = useState(null);
  
  const { register, handleSubmit, reset, formState: { errors }, setError } = useForm()

  useEffect(() => {
    const getUserPlaylist = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/playlist/user',
          {
            withCredentials: true
          }
        )
        if (response) setPlaylist(response.data.data)
        
      } catch (error) {
        console.log(error);
        console.log(error.response?.status);
        console.log(error.response?.data);
      }
    }
    getUserPlaylist()
  }, [])

  const createPlayList = async (data) => {
    console.log('start');

    try {
      const response = await axios.post('http://localhost:3000/api/v1/playlist/create',
        data,
        {
          withCredentials: true
        }
      )
      if (response) console.log('playlist created');
      setIsCreatePopupOpen(false)
    } catch (error) {
      console.log(error);
      console.log(error.response?.status);
      console.log(error.response?.data);
    }
    reset()
  }

  const PlaylistSkeleton = () => (
    <div className="flex flex-col gap-3">
      <div className="aspect-video w-full rounded-xl bg-surface-container-high animate-pulse"></div>
      <div className="flex justify-between items-start pt-1">
        <div className="flex flex-col gap-2 w-full pr-4">
          <div className="h-5 w-3/4 bg-surface-container-high rounded animate-pulse"></div>
          <div className="h-4 w-full bg-surface-container-high rounded animate-pulse"></div>
          <div className="flex gap-4 mt-1">
            <div className="h-3 w-16 bg-surface-container-high rounded animate-pulse"></div>
            <div className="h-3 w-24 bg-surface-container-high rounded animate-pulse"></div>
          </div>
        </div>
        <div className="w-6 h-6 rounded-full bg-surface-container-high animate-pulse"></div>
      </div>
    </div>
  );

  return (
    <div className="bg-background min-h-screen text-on-background font-body-lg">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-8">

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 border-b border-outline/10 pb-6">
          <div>
            <h1 className="text-display-lg font-display-lg font-extrabold text-on-surface tracking-tight mb-2">
              Your Playlists
            </h1>
            <p className="text-body-lg text-secondary">
              Organize your favorite videos, tutorials, and content into custom collections.
            </p>
          </div>
          <button
            onClick={() => setIsCreatePopupOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-primary-container text-on-primary-container font-label-lg rounded-full hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary-container/20 whitespace-nowrap"
          >
            <span className="material-symbols-outlined">add</span>
            Create Playlist
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-10">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <PlaylistSkeleton key={item} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && isEmpty && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-32 h-32 mb-6 rounded-full bg-surface-container-high flex items-center justify-center">
              <span className="material-symbols-outlined text-6xl text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                playlist_play
              </span>
            </div>
            <h2 className="text-headline-lg font-headline-lg text-on-surface mb-3">
              No playlists created yet
            </h2>
            <p className="text-body-md text-secondary max-w-md mb-8">
              Save your favorite videos or organize content by topics. Playlists make it easy to find what you're looking for later.
            </p>
            <button
              onClick={() => setIsCreatePopupOpen(true)}
              className="flex items-center gap-2 px-8 py-3 bg-surface-container-highest text-on-surface font-label-lg rounded-full hover:bg-surface-variant transition-colors border border-outline/20"
            >
              <span className="material-symbols-outlined">add</span>
              Create your first playlist
            </button>
          </div>
        )}

        {/* Playlists Grid */}
        {!isLoading && !isEmpty && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-10">
            {playlist.map((p) => (
              <Link to={`/playlists/${p._id}`}>
                <div key={p._id} className="group cursor-pointer flex flex-col gap-3">
                  {/* Thumbnail Container */}
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-surface-container-low  ">
                    {
                      p.videos?.length === 0 ?
                        <div className='text-white text-center'>Playlist is Empty</div> :
                        <img
                          src={p.videos?.[0]?.thumbnail ?p.videos?.[0]?.thumbnail : 
                            'https://images.openai.com/static-rsc-4/UEsPB_FDurvL9hMCC4ayTb-9EPKtTjpHSxZxlheF2-GsaPbcRVRgYNIK0jcQR_VJY8XYFxY492Y-9DbqwbUhxZL2Tm_4hOHiuCj30DylPYrI-uryAVBBG9NQH47y-cCVdUIvDq4k96Um9zpiQ4YcqyX9HEaztcAlc7QvVlNfYj2G7DgmWC_hKNDE_2bM7PgD?purpose=fullsize'
                           }
                          alt={'playlist is empty'}
                          className="w-full h-full object-cover transition-opacity text-center duration-300"
                        />
                    }
                    {/* Overlay for playlist indicator */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                      <span className="material-symbols-outlined text-white text-4xl">play_circle</span>
                      <span className="text-white font-label-lg uppercase tracking-wider">Play All</span>
                    </div>
                    {/* Video Count Badge */}
                    <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/80 backdrop-blur-sm px-2 py-1 rounded text-white text-[12px] font-bold">
                      <span className="material-symbols-outlined text-[14px]">playlist_play</span>
                      {p.videos?.length}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex justify-between items-start pt-1">
                    <div className="flex flex-col pr-4">
                      <h3 className="text-headline-md font-headline-md text-on-surface group-hover:text-primary transition-colors line-clamp-1">
                        {p.title}
                      </h3>
                      <p className="text-label-sm text-secondary mt-1 line-clamp-2">
                        {p.description}
                      </p>
                      <span className="text-label-sm text-tertiary-container mt-2">
                        {p.lastUpdated}
                      </span>
                    </div>

                    {/* Action Menu */}
                    <div className="relative">
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveDropdown(activeDropdown === p._id ? null : p._id);
                        }}
                        className={`p-1.5 text-secondary hover:text-on-surface hover:bg-surface-variant/40 rounded-full h-10 w10 transition-colors flex-shrink-0 ${activeDropdown === p._id ? 'bg-surface-variant/40 text-on-surface' : 'opacity-0 group-hover:opacity-100'}`}
                      >
                        <span className="material-symbols-outlined">more_vert</span>
                      </button>

                      {/* Dropdown Menu */}
                      {activeDropdown === p._id && (
                        <div className="absolute right-0 top-full mt-1 w-40 bg-surface-container-highest rounded-lg shadow-xl border border-white/5 py-1 z-50">
                          <button 
                            onClick={(e) => {
                              e.preventDefault();
                              setPlaylistToDelete(p);
                              setActiveDropdown(null);
                            }}
                            className="w-full flex items-center gap-2 px-4 py-2 text-label-lg text-error hover:bg-white/5 transition-colors text-left"
                          >
                            <span className="material-symbols-outlined text-error text-[20px]">delete</span>
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>

      {/* Create Playlist Popup */}
      {isCreatePopupOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity duration-300">
          <div className="relative w-full max-w-[480px] bg-surface-container-high rounded-xl overflow-hidden shadow-2xl border border-white/5 mx-4 md:mx-0">
            {/* Modal Header */}
            <div className="px-5 py-4 flex items-center justify-between border-b border-outline-variant/30">
              <h2 className="font-headline-md text-headline-md text-on-surface">Create Playlist</h2>
              <button 
                className="p-2 rounded-full hover:bg-surface-container-highest transition-colors" 
                onClick={() => setIsCreatePopupOpen(false)}
              >
                <span className="material-symbols-outlined text-on-surface-variant">close</span>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 space-y-5 max-h-[716px] overflow-y-auto custom-scrollbar">
              <form onSubmit={handleSubmit(createPlayList)}>

              {/* Title Field */}
              <div className="space-y-1.5 group mb-4">
                <div className="flex justify-between items-center">
                  <label className="font-label-lg text-label-lg text-on-surface-variant group-focus-within:text-primary-container transition-colors">
                    Title (required)
                  </label>
                  <span className={`font-label-sm text-label-sm ${playlistTitle.length >= 100 ? 'text-error' : 'text-on-surface-variant/60'}`}>
                    {playlistTitle.length}/100
                  </span>
                </div>
                <input 
                 {...register('title')}
                  className={`w-full bg-surface-container-lowest border-2 rounded-lg py-2.5 px-4 text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none transition-all ${
                    !playlistTitle.trim() && playlistTitle.length > 0 ? 'border-error focus:border-error' : 'border-outline-variant/30 focus:border-primary-container'
                  }`}
                  maxLength="100" 
                  placeholder="Add a title that describes your playlist" 
                  value={playlistTitle}
                  onChange={(e) => setPlaylistTitle(e.target.value)}
                  type="text" 
                />
              </div>

              {/* Description Field */}
              <div className="space-y-1.5 group mb-4">
                <div className="flex justify-between items-center">
                  <label className="font-label-lg text-label-lg text-on-surface-variant group-focus-within:text-primary-container transition-colors">
                    Description
                  </label>
                  <span className={`font-label-sm text-label-sm ${playlistDesc.length >= 5000 ? 'text-error' : 'text-on-surface-variant/60'}`}>
                    {playlistDesc.length}/5000
                  </span>
                </div>
                <textarea 
                 {...register('description')}
                  className="w-full bg-surface-container-lowest border-2 border-outline-variant/30 rounded-lg py-2.5 px-4 text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary-container transition-all resize-none custom-scrollbar"
                  maxLength="5000" 
                  placeholder="Tell viewers about your playlist" 
                  rows="3"
                  value={playlistDesc}
                  onChange={(e) => setPlaylistDesc(e.target.value)}
                ></textarea>
              </div>

              <div className="px-5 py-3 bg-surface-container-highest/50 flex justify-end items-center gap-3">
              <button 
                className="px-5 py-2 rounded-full font-label-lg text-label-lg text-primary hover:bg-primary/10 transition-all active:scale-95" 
                onClick={() => setIsCreatePopupOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="px-5 py-2 rounded-full font-label-lg text-label-lg bg-primary-container text-on-primary-container font-bold hover:brightness-110 transition-all active:scale-95 shadow-lg shadow-primary-container/20 flex items-center justify-center min-w-[80px]" 
                type='submit'
                disabled={isCreating}
              >
                {isCreating ? (
                  <span className="material-symbols-outlined animate-spin">sync</span>
                ) : (
                  'Create'
                )}
              </button>
            </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Playlist Popup */}
      {playlistToDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity duration-300">
          <div className="relative w-full max-w-[400px] bg-surface-container-high rounded-xl overflow-hidden shadow-2xl border border-white/5 mx-4">
            <div className="p-6">
              <h3 className="text-headline-lg font-headline-lg text-on-surface mb-2">Delete playlist?</h3>
              <p className="text-body-md text-secondary">
                Are you sure you want to delete <span className="font-bold text-on-surface">"{playlistToDelete.name || playlistToDelete.title}"</span>? This action cannot be undone.
              </p>
            </div>
            <div className="px-6 py-4 bg-surface-container-highest/50 flex justify-end items-center gap-3">
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  setPlaylistToDelete(null);
                }}
                className="px-5 py-2 rounded-full font-label-lg text-label-lg text-on-surface hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={async (e) => {
                  e.preventDefault();
                  try {
                    await axios.delete(`http://localhost:3000/api/v1/playlist/delete/${playlistToDelete._id}`, {
                      withCredentials: true
                    });
                    setPlaylist(playlist.filter(p => p._id !== playlistToDelete._id));
                    setPlaylistToDelete(null);
                  } catch (error) {
                    console.log(error);
                  }
                }}
                className="px-5 py-2 rounded-full font-label-lg text-label-lg bg-error text-on-error font-bold hover:brightness-110 transition-colors shadow-lg shadow-error/20"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Playlists;
