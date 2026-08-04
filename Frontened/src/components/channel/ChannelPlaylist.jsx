import React from 'react'
import { Link } from 'react-router-dom'


const ChannelPlaylist = ({ playlist }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-10 mt-4 ml-6">
            {playlist.map((p) => (
                <Link to={`/playlists/${p._id}`}>
                    <div key={p._id} className="group cursor-pointer flex flex-col gap-3">
                        {/* Thumbnail Container */}
                        <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-surface-container-low  ">
                            {
                                p.videos?.length === 0 ?
                                    <div className='text-white text-center'>Playlist is Empty</div> :
                                    <img
                                        src={p.videos?.[0]?.thumbnail ? p.videos?.[0]?.thumbnail :
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
                           
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default ChannelPlaylist