import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { formatDistanceToNowStrict } from "date-fns";
import axios from 'axios'

const Channel = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [channelData, setchannelData] = useState()
  const [channelVideos, setchannelVideos] = useState([])
  const { username } = useParams()
  const navigate = useNavigate()

  const tabs = ['Home', 'Videos', 'Shorts', 'Playlists', 'Community', 'About'];

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/users/channel/${username}`,
          {
            withCredentials: true
          }
        )
        if (response) {
          setchannelData(response.data.data)
          setIsSubscribed(response.data.data.isSubscribed)
        }
      } catch (error) {
        console.log(error.response?.status);
        console.log(error.response?.data);
      }

    }

    const fetchVideos = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/videos/channel/${username}`,
          {
            withCredentials: true
          }
        )
        if (response) {
          setchannelVideos(response.data.data)
        }
      } catch (error) {
        console.log(error.response?.status);
        console.log(error.response?.data);
      }
    }
    fetchChannelData()
    fetchVideos()
  }, [])

  const toggleSubscription = async () => {
    try {
      const response = await axios.patch(`http://localhost:3000/api/v1/subscription/toggleSub/${channelData?._id}`,
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

  const timeAgo = (date) => {
    if (!date || isNaN(new Date(date).getTime())) {
      return "";
    }

    return formatDistanceToNowStrict(new Date(date), {
      addSuffix: true,
    });
  };

  console.log(channelVideos);

  console.log(channelVideos.slice(0, 2));


  return (
    <div className="bg-surface text-on-surface h-screen overflow-y-auto">

      {/* Main Content */}
      <main className="pt-4  pb-20 md:pb-8 min-h-screen">

        {/* Cinematic Banner */}
        <section className="relative w-full h-[16vw] min-h-[160px] max-h-[320px] overflow-hidden">
          <img
            className="w-full h-full object-cover  rounded-xl"
            alt="channel banner"
            src={channelData?.coverImage ? channelData?.coverImage : 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnHYlLiRE1tMFH4x3ko5GaF_zuodrGt1wy7RwhZ6fg7_gnY6SEG1X3867OKllfiP-dyLoVgo0v-g5A4oerPaG0UBJETCyjonj8UP5ztQqHpZjGO3bBR2IGpkI06oCoXXp-yi96IzQi6A1HfTsrjiNW-o-3z1pCdla78XWPlSkN-ONcrePpX_3_4d7u9EECHlcdKi9E32zXJPHVgPOD7bQ-Ke-uDWzIOAtX4m6RZpRavnV-cqtcutU'}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-60"></div>
        </section>

        {/* Channel Header Section */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-6 flex flex-col md:flex-row items-start gap-6">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 md:w-40 md:h-40 rounded-full border-4 border-surface overflow-hidden shadow-2xl">
              <img
                className="w-full h-full object-cover"
                alt="channel avatar"
                src={channelData?.avatar}
              />
            </div>
          </div>

          {/* Channel Info */}
          <div className="flex-1 space-y-2 md:pt-4">
            <h1 className="font-headline-lg md:text-[44px] text-[20px] font-bold md:font-extrabold text-on-surface leading-tight">{channelData?.fullName}</h1>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-on-surface-variant font-label-lg text-label-lg">
              <span>@{channelData?.username}</span>
              <span className="hidden md:inline text-[8px]">•</span>
              <span>{channelData?.subscribersCount} subscribers</span>
              <span className="hidden md:inline text-[8px]">•</span>
              <span>{channelVideos.length} videos</span>
            </div>
            {/* <p className="text-on-surface-variant font-body-md text-body-md max-w-2xl line-clamp-1">
              Pushing the boundaries of consumer electronics and experimental hardware. Deep dives into the future of tech...{' '}
              <span className="text-on-surface font-bold cursor-pointer">more</span>
            </p> */}
            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={toggleSubscription}
                className={`px-6 py-2 font-headline-md text-headline-md rounded-full transition-all active:scale-95 ${isSubscribed
                  ? 'bg-surface-container-highest text-on-surface hover:bg-surface-variant'
                  : 'bg-on-surface text-surface hover:opacity-90'
                  }`}
              >
                {isSubscribed ? 'Subscribed' : 'Subscribe'}
              </button>
              <button className="px-6 py-2 bg-surface-container-highest text-on-surface font-headline-md text-headline-md rounded-full hover:bg-surface-variant transition-all active:scale-95">
                Join
              </button>
              <button className="p-2 bg-surface-container-highest rounded-full hover:bg-surface-variant transition-all">
                <span className="material-symbols-outlined">notifications_active</span>
              </button>
            </div>
          </div>
        </section>

        {/* Tabs Navigation */}
        <nav className="sticky top-14 md:top-14 z-30 bg-surface border-b border-outline-variant overflow-x-auto">
          <div className="max-w-7xl mx-auto px-4 md:px-6 flex gap-6 md:gap-12 h-12 items-center">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`h-full flex items-center font-bold whitespace-nowrap font-label-lg text-label-lg transition-colors ${activeTab === tab
                  ? 'border-b-2 border-on-surface text-on-surface'
                  : 'text-on-surface-variant hover:text-on-surface'
                  }`}
              >
                {tab}
              </button>
            ))}
            <button className="flex items-center text-on-surface-variant hover:text-on-surface">
              <span className="material-symbols-outlined">search</span>
            </button>
          </div>
        </nav>

        {/* Tab Content */}
         {
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
                  <button className="text-on-surface font-bold hover:underline font-label-lg text-label-lg">READ MORE</button>
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
        }
      </main>

      {/* Bottom Nav (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-12 bg-surface border-t border-outline-variant">
        <a className="flex flex-col items-center justify-center text-on-surface font-bold" href="#">
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
          <span className="font-label-sm text-label-sm">Home</span>
        </a>
        <a className="flex flex-col items-center justify-center text-on-surface-variant" href="#">
          <span className="material-symbols-outlined text-[20px]">play_circle</span>
          <span className="font-label-sm text-label-sm">Shorts</span>
        </a>
        <a className="flex flex-col items-center justify-center text-on-surface-variant" href="#">
          <span className="material-symbols-outlined text-[20px]">subscriptions</span>
          <span className="font-label-sm text-label-sm">Subscriptions</span>
        </a>
        <a className="flex flex-col items-center justify-center text-on-surface-variant" href="#">
          <span className="material-symbols-outlined text-[20px]">video_library</span>
          <span className="font-label-sm text-label-sm">Library</span>
        </a>
      </nav>

    </div>
  );
};

export default Channel;
