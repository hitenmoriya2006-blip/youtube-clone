import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

const Sidebar = ({ isOpen }) => {

  const [subscribedChannel, setSubscribedChannel] = useState([])

  useEffect(() => {
    const fetchedSubscribedChannels = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/subscription/c/subscribed',
          {
            withCredentials: true
          }
        )
        if (response) setSubscribedChannel(response.data.data)
      } catch (error) {
        console.log(error.response?.status);
        console.log(error.response?.data);
      }
    }
    fetchedSubscribedChannels()
  }, [])

  return (
    <>
      {/* Mini Sidebar (Desktop Only - Shows when closed) */}
      <nav 
        className={`fixed left-0 top-[56px] w-[72px] h-[calc(100vh-56px)] bg-background flex-col items-center py-1 gap-1 overflow-y-auto overflow-x-hidden z-40 hidden lg:flex hide-scrollbar transition-opacity duration-300 ${
          !isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <Link to={'/'} className="flex flex-col items-center justify-center gap-1.5 w-[64px] h-[74px] rounded-lg text-on-surface bg-surface-container-highest transition-colors font-medium">
          <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
          <span className="text-[10px] scale-90 whitespace-nowrap">Home</span>
        </Link>
        <Link to={'/profile'} className="flex flex-col items-center justify-center gap-1.5 w-[64px] h-[74px] rounded-lg text-on-surface transition-colors hover:bg-surface-container-high">
          <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 0" }}>account_circle</span>
          <span className="text-[10px] scale-90 whitespace-nowrap">You</span>
        </Link>
      </nav>

      {/* Full Sidebar (Mobile Drawer + Desktop Expanded) */}
      <nav 
        className={`fixed left-0 top-[56px] w-[240px] h-[calc(100vh-56px)] bg-background flex flex-col p-3 overflow-y-auto overflow-x-hidden z-50 hover:overflow-y-auto hide-scrollbar transition-transform duration-300 cubic-bezier(0.4, 0, 0.2, 1) shadow-2xl lg:shadow-none border-r border-white/5 lg:border-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Main Nav */}
        <div className="flex flex-col gap-0.5 py-3 border-b border-white/10 pt-0">
          <Link className="flex items-center gap-6 px-3 h-10 rounded-[10px] text-[14px] font-normal text-on-surface bg-surface-container-highest font-bold transition-colors" to="/">
            <span className="material-symbols-outlined text-[24px] shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
            <span className="whitespace-nowrap overflow-hidden text-ellipsis flex-1">Home</span>
          </Link>
        </div>

        {/* You Section */}
        <div className="flex flex-col gap-0.5 py-3 border-b border-white/10">
          <Link className="flex items-center gap-1 px-3 pt-1 pb-2 font-headline-lg text-[16px] font-bold text-on-surface rounded-[10px] transition-colors hover:bg-surface-container-high" to="/profile">
            You
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>chevron_right</span>
          </Link>
          <Link to={'/history'} className="flex items-center gap-6 px-3 h-10 rounded-[10px] text-[14px] font-normal text-on-surface transition-colors hover:bg-surface-container-high">
            <span className="material-symbols-outlined text-[24px] shrink-0" style={{ fontVariationSettings: "'FILL' 0" }}>history</span>
            <span className="whitespace-nowrap overflow-hidden text-ellipsis flex-1">History</span>
          </Link>
          <Link className="flex items-center gap-6 px-3 h-10 rounded-[10px] text-[14px] font-normal text-on-surface transition-colors hover:bg-surface-container-high" to={'/playlist'}>
            <span className="material-symbols-outlined text-[24px] shrink-0" style={{ fontVariationSettings: "'FILL' 0" }}>video_library</span>
            <span className="whitespace-nowrap overflow-hidden text-ellipsis flex-1">Playlists</span>
          </Link>
          <Link to={`/your-videos`} className="flex items-center gap-6 px-3 h-10 rounded-[10px] text-[14px] font-normal text-on-surface transition-colors hover:bg-surface-container-high">
            <span className="material-symbols-outlined text-[24px] shrink-0" style={{ fontVariationSettings: "'FILL' 0" }}>smart_display</span>
            <span className="whitespace-nowrap overflow-hidden text-ellipsis flex-1">Your Videos</span>
          </Link>
          <Link to={'/liked'} className="flex items-center gap-6 px-3 h-10 rounded-[10px] text-[14px] font-normal text-on-surface transition-colors hover:bg-surface-container-high">
            <span className="material-symbols-outlined text-[24px] shrink-0" style={{ fontVariationSettings: "'FILL' 0" }}>thumb_up</span>
            <span className="whitespace-nowrap overflow-hidden text-ellipsis flex-1">Liked videos</span>
          </Link>
        </div>

        {/* Subscriptions */}
        <div className="flex flex-col gap-0.5 py-3 border-b border-white/10">
          <h3 className="font-headline-lg text-[16px] font-bold text-on-surface px-3 pt-1 pb-2">Subscriptions</h3>
          {subscribedChannel.map((channel) => (
            <Link to={`/channel/${channel.username}`} key={channel._id} className="flex items-center gap-6 px-3 h-10 rounded-[10px] text-[14px] font-normal text-on-surface transition-colors hover:bg-surface-container-high">
              <img className="w-6 h-6 rounded-full object-cover shrink-0" alt="Channel Avatar" src={channel.avatar} />
              <span className="whitespace-nowrap overflow-hidden text-ellipsis flex-1">{channel.fullName}</span>
              <span className="w-1 h-1 bg-[#3ea6ff] rounded-full shrink-0"></span>
            </Link>
          ))}
        </div>

        {/* Explore */}
        <div className="flex flex-col gap-0.5 py-3 border-b border-white/10">
          <h3 className="font-headline-lg text-[16px] font-bold text-on-surface px-3 pt-1 pb-2">Explore</h3>
          <Link className="flex items-center gap-6 px-3 h-10 rounded-[10px] text-[14px] font-normal text-on-surface transition-colors hover:bg-surface-container-high" to="/">
            <span className="material-symbols-outlined text-[24px] shrink-0" style={{ fontVariationSettings: "'FILL' 0" }}>local_fire_department</span>
            <span className="whitespace-nowrap overflow-hidden text-ellipsis flex-1">Trending</span>
          </Link>
          <Link className="flex items-center gap-6 px-3 h-10 rounded-[10px] text-[14px] font-normal text-on-surface transition-colors hover:bg-surface-container-high" to="/">
            <span className="material-symbols-outlined text-[24px] shrink-0" style={{ fontVariationSettings: "'FILL' 0" }}>music_note</span>
            <span className="whitespace-nowrap overflow-hidden text-ellipsis flex-1">Music</span>
          </Link>
          <Link className="flex items-center gap-6 px-3 h-10 rounded-[10px] text-[14px] font-normal text-on-surface transition-colors hover:bg-surface-container-high" to="/">
            <span className="material-symbols-outlined text-[24px] shrink-0" style={{ fontVariationSettings: "'FILL' 0" }}>sports_esports</span>
            <span className="whitespace-nowrap overflow-hidden text-ellipsis flex-1">Gaming</span>
          </Link>
          <Link className="flex items-center gap-6 px-3 h-10 rounded-[10px] text-[14px] font-normal text-on-surface transition-colors hover:bg-surface-container-high" to="/">
            <span className="material-symbols-outlined text-[24px] shrink-0" style={{ fontVariationSettings: "'FILL' 0" }}>news</span>
            <span className="whitespace-nowrap overflow-hidden text-ellipsis flex-1">News</span>
          </Link>
        </div>

        {/* Settings */}
        <div className="flex flex-col gap-0.5 py-3 border-b border-white/10">
          <Link className="flex items-center gap-6 px-3 h-10 rounded-[10px] text-[14px] font-normal text-on-surface transition-colors hover:bg-surface-container-high" to="/">
            <span className="material-symbols-outlined text-[24px] shrink-0" style={{ fontVariationSettings: "'FILL' 0" }}>settings</span>
            <span className="whitespace-nowrap overflow-hidden text-ellipsis flex-1">Settings</span>
          </Link>
          <Link className="flex items-center gap-6 px-3 h-10 rounded-[10px] text-[14px] font-normal text-on-surface transition-colors hover:bg-surface-container-high" to="/">
            <span className="material-symbols-outlined text-[24px] shrink-0" style={{ fontVariationSettings: "'FILL' 0" }}>flag</span>
            <span className="whitespace-nowrap overflow-hidden text-ellipsis flex-1">Report history</span>
          </Link>
          <Link className="flex items-center gap-6 px-3 h-10 rounded-[10px] text-[14px] font-normal text-on-surface transition-colors hover:bg-surface-container-high" to="/">
            <span className="material-symbols-outlined text-[24px] shrink-0" style={{ fontVariationSettings: "'FILL' 0" }}>help</span>
            <span className="whitespace-nowrap overflow-hidden text-ellipsis flex-1">Help</span>
          </Link>
          <Link className="flex items-center gap-6 px-3 h-10 rounded-[10px] text-[14px] font-normal text-on-surface transition-colors hover:bg-surface-container-high" to="/">
            <span className="material-symbols-outlined text-[24px] shrink-0" style={{ fontVariationSettings: "'FILL' 0" }}>feedback</span>
            <span className="whitespace-nowrap overflow-hidden text-ellipsis flex-1">Send feedback</span>
          </Link>
        </div>

        {/* Footer */}
        <div className="p-3 pt-4 text-[12px] text-on-surface-variant leading-[1.6] opacity-75">
          <p className="mb-2">About Press Copyright Contact us Creators Advertise Developers</p>
          <p className="mb-2">Terms Privacy Policy & Safety How YouTube works Test new features</p>
          <p className="text-[#717171] font-bold mt-4">© 2024 Google LLC</p>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
