import React from 'react'
import {formatDuration,timeAgo} from '../../utils/formatter.js'
import { useNavigate } from 'react-router-dom'

const ChannelHome = ({channelVideos}) => {

  const navigate = useNavigate()

  return (
    channelVideos.length === 0 ?
            <div className='text-white mt-16 font-medium text-lg text-center'>no video uploaded by this channel</div>
            :
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-12">
              {/* Featured Video */}
              <section onClick={() =>{navigate(`/watch/${channelVideos[0]._id}`)}} className="flex flex-col lg:flex-row gap-6 bg-surface-container p-4 rounded-xl border border-outline-variant/30">
                <div  className="lg:w-[48%] group cursor-pointer relative">
                  <div className="aspect-video w-full rounded-xl overflow-hidden relative shadow-lg">
                    <img
                      className="w-full h-full object-cover "
                      alt="Featured video thumbnail"
                      src={channelVideos[0]?.thumbnail}
                    />
                    <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 text-white text-[12px] font-bold rounded">{formatDuration(channelVideos[0]?.duration)}</div>

                  </div>
                </div>
                <div className="flex-1 space-y-4 pt-2">
                  <h2 className="font-headline-lg text-headline-lg text-on-surface hover:text-primary-container transition-colors cursor-pointer">
                    {channelVideos[0]?.title}
                  </h2>
                  <div className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">{channelVideos[0]?.views} views • {timeAgo(channelVideos[0]?.createdAt)}</div>
                  <p className="text-on-surface-variant font-body-md text-body-md leading-relaxed line-clamp-3 md:line-clamp-none">
                    {channelVideos[0]?.description}
                  </p>
                </div>
              </section>

              {/* For You Section */}
              <section className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <h3 className="font-headline-lg text-headline-lg text-on-surface">For you</h3>
                    <button className="flex items-center gap-2 px-3 py-1 bg-surface-container-high rounded-full font-label-sm text-label-sm hover:bg-surface-variant transition-all">
                      <span className="material-symbols-outlined text-sm">play_arrow</span>
                      <span>Play all</span>
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10">
                  {channelVideos.slice(0,4).map((video) => (
                    <div
                      onClick={() =>{navigate(`/watch/${video._id}`)}}
                      key={video._id}
                      className="group cursor-pointer rounded-xl p-2.5 transition-transform duration-300 hover:bg-surface-container-highest hover:-translate-y-1"
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
                  ))}
                </div>
              </section>

              {/* Recent Uploads Section */}
              <section className="space-y-6">
                <div className="flex items-center justify-between border-t border-outline-variant pt-12">
                  <div className="flex items-center gap-4">
                    <h3 className="font-headline-lg text-headline-lg text-on-surface">Recent Uploads</h3>
                  </div>
                  <button className="text-primary font-bold font-label-lg text-label-lg hover:underline">View all</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10">
                  {channelVideos.slice(0,4).map((video) => (
                    <div
                      onClick={() =>{navigate(`/watch/${video._id}`)}}
                      key={video._id}
                      className="group cursor-pointer rounded-xl p-2.5 transition-transform duration-300 hover:bg-surface-container-highest hover:-translate-y-1"
                    >
                      <div className="aspect-video rounded-xl overflow-hidden relative mb-3">
                        <img
                          className="w-full h-full object-cover "
                          alt={video.title}
                          src={video.thumbnail}
                        />
                        <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 text-white text-[12px] font-bold rounded">{formatDuration(video.duration)}</div>
                      </div>
                      <h4 className="font-headline-md text-headline-md text-on-surface line-clamp-2">{video.title}</h4>
                      <div className="text-on-surface-variant font-body-md text-body-md mt-1">{video.views} views • {timeAgo(video.createdAt)}</div>
                    </div>
                  ))}
                </div>
              </section>

            </div>
  )
}

export default ChannelHome