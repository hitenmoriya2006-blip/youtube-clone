import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '@/api/axios';
import SearchVideoSkeleton from '@/skeleton/SearchVideoSkeleton';
import EmptySearch from '@/components/empty-states/EmptySearch';
import { formatDuration, timeAgo } from '../utils/formatter.js'

const SearchResults = () => {
  const chips = ['All', 'Recent', 'Tech', 'AI', 'Tutorials', 'Gaming', 'Review'];

  const [searchParams, setSearchParams] = useSearchParams()
  const [searchedVideo, setsearchedVideo] = useState([])
  const navigate = useNavigate()
  const query = searchParams.get('query')
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const fetchSearchedVideo = async () => {

      try {
        setLoading(true)
        const response = await api.get(`/videos/get-all?query=${query}`,
          {
            withCredentials: true
          }
        )
        if (response) setsearchedVideo(response.data.data.allVideos)
      } catch (error) {
        console.log(error.response?.status);
        console.log(error.response?.data);
      } finally {
        setLoading(false)
      }
    }

    fetchSearchedVideo()
  }, [query])

  return (
    <div className="bg-background min-h-screen text-on-background font-body-lg">
      <div className="max-w-[1280px] mx-auto px-4 md:px-4 py-4">
        {/* Filter Chips */}
        <div className="sticky top-0 bg-background z-40 py-4 flex gap-3 overflow-x-auto no-scrollbar mb-6">
          {chips.map((chip, index) => (
            <button
              key={index}
              className={`whitespace-nowrap px-4 py-1.5 rounded-lg font-label-lg transition-colors ${index === 0
                ? 'bg-on-surface text-background hover:bg-on-surface-variant'
                : 'bg-surface-container-highest text-on-surface hover:bg-surface-variant/40'
                }`}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="flex flex-col gap-4">
          {
            loading ? (
              Array.from({ length: 8 }).map((_, index) => (
                <SearchVideoSkeleton key={index} />
              )) 
            ) :
          searchedVideo.length === 0 ?
          (<EmptySearch query={query} />) :
          (
               searchedVideo.map((video) => (
          <div onClick={() => navigate(`/watch/${video._id}`)} key={video?._id} className={`flex flex-col md:flex-row gap-4 group cursor-pointer  mt-4`}>
            <div className="relative w-full md:w-[360px] aspect-video flex-shrink-0 overflow-hidden rounded-xl bg-surface-container-low transition-transform duration-300">
              {/* {idx === 2 && (
                  <div className="absolute inset-0 bg-gradient-to-tr from-surface-container-low to-primary-container/10"></div>
                )} */}
              <img className="w-full h-full object-cover" src={video?.thumbnail} alt={video?.title} />
              <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 text-white text-[12px] font-medium rounded">
                {formatDuration(video.duration)}
              </div>
            </div>

            <div className="flex flex-col py-1">
              <h2 className="text-headline-md font-headline-md text-on-surface group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                {video?.title}
              </h2>
              <div className="mt-1 text-label-sm text-secondary flex items-center gap-1">
                <span>{video?.views}</span>
                <span className="text-[8px]">•</span>
                <span>{timeAgo(video?.createdAt)}</span>
              </div>

              <div className="flex items-center gap-2 my-3">
                <div className="w-6 h-6 rounded-full overflow-hidden">
                  <img className="w-full h-full object-cover" src={video.owner?.avatar} alt={video.owner?.fullName} />
                </div>
                <span className="text-label-lg text-secondary flex items-center gap-1">
                  {video.owner?.fullName}
                  <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </span>
              </div>

              <p className="text-body-md text-secondary line-clamp-2 max-w-2xl mb-2">
                {video.description}
              </p>
            </div>
          </div>
          ))
          )
         }
        </div>

        {/* Load More */}
      {
        searchedVideo.length > 0 && (
            <div className="flex flex-col items-center justify-center py-16 border-t border-outline/10 mt-8">
          <span className="material-symbols-outlined text-secondary text-[32px] mb-2">check_circle</span>
          <p className="text-secondary font-label-lg">You've reached the end of the results</p>
          {/* <button className="mt-4 px-6 py-2 rounded-full border border-outline/30 text-on-surface font-label-lg hover:bg-surface-variant/20 transition-colors">
            Back to top
          </button> */}
        </div>
        )
      }
      </div>
    </div>
  );
};

export default SearchResults;
