import React from 'react'
import { formatDuration, timeAgo } from '../../utils/formatter.js'
import { useNavigate } from 'react-router-dom'

const ChannelVideos = ({ videos }) => {

    const navigate = useNavigate()

    return (
        
        
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 mt-4">
             {
                 videos.map((video) => (
                <div
                    onClick={() => { navigate(`/watch/${video._id}`) }}
                    key={video._id}
                    className="group cursor-pointer rounded-xl p-2.5 transition-transform duration-300 hover:bg-surface-container-highest "
                >
                    <div className="aspect-video rounded-xl overflow-hidden relative mb-3">
                        <img
                            className="w-full h-full object-cover"
                            alt={video.title}
                            src={video.thumbnail}
                        />
                        <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 text-white text-[12px] font-bold rounded">{formatDuration(video.duration)}</div>
                    </div>
                    <div className="flex gap-3">
                        <div className="flex-1">
                            <h4 className="font-headline-md text-headline-md text-on-surface line-clamp-2 group-hover:text-primary-container transition-colors">{video.title}</h4>
                            <div className="text-on-surface-variant font-body-md text-body-md mt-1">{video.views} views • {timeAgo(video.createdAt)}</div>
                        </div>
                        <button className="p-1 h-fit opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="material-symbols-outlined">more_vert</span>
                        </button>
                    </div>
                </div>
            ))
             }
           </div>
        
    )
}

export default ChannelVideos