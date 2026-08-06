import React from 'react'
import { useNavigate } from 'react-router-dom'

const EmptyPlaylist = () => {

   const navigate = useNavigate()

    return (
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
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-8 py-3 bg-surface-container-highest text-on-surface font-label-lg rounded-full hover:bg-surface-variant transition-colors border border-outline/20"
            >
              {/* <span className="material-symbols-outlined">add</span> */}
              Explore Videos
            </button>
          </div>
    )
}

export default EmptyPlaylist