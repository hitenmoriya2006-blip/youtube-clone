import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '@/api/axios';
import { toast } from 'sonner'
import ChannelHome from '@/components/channel/ChannelHome';
import ChannelVideos from '@/components/channel/ChannelVideos';
import ChannelPlaylist from '@/components/channel/ChannelPlaylist';

const Channel = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [channelData, setchannelData] = useState()
  const [channelVideos, setchannelVideos] = useState([])
  const [playlist, setPlaylist] = useState([])
  const { username } = useParams()
  const navigate = useNavigate()

  const tabs = ['Home', 'Videos', 'Playlists', 'Community'];

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        const response = await api.get(`/users/channel/${username}`,
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
        const response = await api.get(`/videos/channel/${username}`,
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

    const getChannelPlaylist = async () => {
      try {
        const response = await api.get(`/playlist/c/${username}`,
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

    fetchChannelData()
    fetchVideos()
    getChannelPlaylist()
  }, [username])

  const toggleSubscription = async () => {
    try {
      const response = await api.patch(`/subscription/toggleSub/${channelData?._id}`,
        {},
        { withCredentials: true }
      )
      if (response) {
        setIsSubscribed(response.data.data.subscribed)
        toast.success(response.data?.message)
      }
    } catch (error) {
      console.log(error.response?.status);
      console.log(error.response?.data);
      toast.error(error.response?.data?.message)
    }
  }

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
            {<p className="text-on-surface-variant font-body-md text-body-md max-w-2xl line-clamp-1">
              {channelData?.description}
            </p>}
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

        {/*Tab Content */}

          {
            activeTab === 'Home' && <ChannelHome channelVideos={channelVideos} />
          }
          {
            activeTab === 'Videos' && <ChannelVideos videos={channelVideos} />
          }
          {
            activeTab === 'Playlists' && <ChannelPlaylist playlist={playlist} />
          }

        {

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
