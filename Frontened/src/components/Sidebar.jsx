import React from 'react';

const Sidebar = ({ isOpen }) => {
  if (!isOpen) {
    return (
      <nav className="fixed left-0 top-[56px] w-[72px] h-[calc(100vh-56px)] bg-background flex flex-col items-center py-1 gap-1 overflow-y-auto overflow-x-hidden z-50 hidden lg:flex hide-scrollbar">
        <a className="flex flex-col items-center justify-center gap-1.5 w-[64px] h-[74px] rounded-lg text-on-surface bg-surface-container-highest transition-colors font-medium" href="#">
          <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
          <span className="text-[10px] scale-90 whitespace-nowrap">Home</span>
        </a>
        <a className="flex flex-col items-center justify-center gap-1.5 w-[64px] h-[74px] rounded-lg text-on-surface transition-colors hover:bg-surface-container-high" href="#">
          <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 0" }}>bolt</span>
          <span className="text-[10px] scale-90 whitespace-nowrap">Shorts</span>
        </a>
        <a className="flex flex-col items-center justify-center gap-1.5 w-[64px] h-[74px] rounded-lg text-on-surface transition-colors hover:bg-surface-container-high" href="#">
          <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 0" }}>subscriptions</span>
          <span className="text-[10px] scale-90 whitespace-nowrap">Subscriptions</span>
        </a>
        <a className="flex flex-col items-center justify-center gap-1.5 w-[64px] h-[74px] rounded-lg text-on-surface transition-colors hover:bg-surface-container-high" href="#">
          <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 0" }}>account_circle</span>
          <span className="text-[10px] scale-90 whitespace-nowrap">You</span>
        </a>
      </nav>
    );
  }

  return (
    <nav className="fixed left-0 top-[56px] w-[240px] h-[calc(100vh-56px)] bg-background flex flex-col p-3 overflow-y-auto overflow-x-hidden z-50 hidden lg:flex hover:overflow-y-auto hide-scrollbar transition-all duration-200">
      {/* Main Nav */}
      <div className="flex flex-col gap-0.5 py-3 border-b border-white/10 pt-0">
        <a className="flex items-center gap-6 px-3 h-10 rounded-[10px] text-[14px] font-normal text-on-surface bg-surface-container-highest font-bold transition-colors" href="#">
          <span className="material-symbols-outlined text-[24px] shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
          <span className="whitespace-nowrap overflow-hidden text-ellipsis flex-1">Home</span>
        </a>
        <a className="flex items-center gap-6 px-3 h-10 rounded-[10px] text-[14px] font-normal text-on-surface transition-colors hover:bg-surface-container-high" href="#">
          <span className="material-symbols-outlined text-[24px] shrink-0" style={{ fontVariationSettings: "'FILL' 0" }}>bolt</span>
          <span className="whitespace-nowrap overflow-hidden text-ellipsis flex-1">Shorts</span>
        </a>
        <a className="flex items-center gap-6 px-3 h-10 rounded-[10px] text-[14px] font-normal text-on-surface transition-colors hover:bg-surface-container-high" href="#">
          <span className="material-symbols-outlined text-[24px] shrink-0" style={{ fontVariationSettings: "'FILL' 0" }}>subscriptions</span>
          <span className="whitespace-nowrap overflow-hidden text-ellipsis flex-1">Subscriptions</span>
        </a>
      </div>

      {/* You Section */}
      <div className="flex flex-col gap-0.5 py-3 border-b border-white/10">
        <a className="flex items-center gap-1 px-3 pt-1 pb-2 font-headline-lg text-[16px] font-bold text-on-surface rounded-[10px] transition-colors hover:bg-surface-container-high" href="#">
          You
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>chevron_right</span>
        </a>
        <a className="flex items-center gap-6 px-3 h-10 rounded-[10px] text-[14px] font-normal text-on-surface transition-colors hover:bg-surface-container-high" href="#">
          <span className="material-symbols-outlined text-[24px] shrink-0" style={{ fontVariationSettings: "'FILL' 0" }}>history</span>
          <span className="whitespace-nowrap overflow-hidden text-ellipsis flex-1">History</span>
        </a>
        <a className="flex items-center gap-6 px-3 h-10 rounded-[10px] text-[14px] font-normal text-on-surface transition-colors hover:bg-surface-container-high" href="#">
          <span className="material-symbols-outlined text-[24px] shrink-0" style={{ fontVariationSettings: "'FILL' 0" }}>video_library</span>
          <span className="whitespace-nowrap overflow-hidden text-ellipsis flex-1">Playlists</span>
        </a>
        <a className="flex items-center gap-6 px-3 h-10 rounded-[10px] text-[14px] font-normal text-on-surface transition-colors hover:bg-surface-container-high" href="#">
          <span className="material-symbols-outlined text-[24px] shrink-0" style={{ fontVariationSettings: "'FILL' 0" }}>smart_display</span>
          <span className="whitespace-nowrap overflow-hidden text-ellipsis flex-1">Your Videos</span>
        </a>
        <a className="flex items-center gap-6 px-3 h-10 rounded-[10px] text-[14px] font-normal text-on-surface transition-colors hover:bg-surface-container-high" href="#">
          <span className="material-symbols-outlined text-[24px] shrink-0" style={{ fontVariationSettings: "'FILL' 0" }}>schedule</span>
          <span className="whitespace-nowrap overflow-hidden text-ellipsis flex-1">Watch Later</span>
        </a>
        <a className="flex items-center gap-6 px-3 h-10 rounded-[10px] text-[14px] font-normal text-on-surface transition-colors hover:bg-surface-container-high" href="#">
          <span className="material-symbols-outlined text-[24px] shrink-0" style={{ fontVariationSettings: "'FILL' 0" }}>thumb_up</span>
          <span className="whitespace-nowrap overflow-hidden text-ellipsis flex-1">Liked videos</span>
        </a>
      </div>

      {/* Subscriptions */}
      <div className="flex flex-col gap-0.5 py-3 border-b border-white/10">
        <h3 className="font-headline-lg text-[16px] font-bold text-on-surface px-3 pt-1 pb-2">Subscriptions</h3>
        <a className="flex items-center gap-6 px-3 h-10 rounded-[10px] text-[14px] font-normal text-on-surface transition-colors hover:bg-surface-container-high" href="#">
          <img className="w-6 h-6 rounded-full object-cover shrink-0" alt="Tech Minimalist" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcSxPc28cGPG3RddL5wB80-9hLOtXw96E1vuCcvuLCng5P9yhszeOJ5K2EMHDjY0bTHvldZ8AyDexfoKgntI1PWrXaukpbkV2Rb4nLZ6kOte2cxvYK_NcQjFbHn6MDwkLosq4mmlSdC8Iu-xAB_0xViaTOHhbL3XiiT0xzXDKIBNFjBUFe-H8IGcMIvl4R7H8kM9q9OdYfFqZyJDZ87ZnqnvmwDI_IyVePazsxnwSbi6E0Q2hCSRE" />
          <span className="whitespace-nowrap overflow-hidden text-ellipsis flex-1">Tech Minimalist</span>
          <span className="w-1 h-1 bg-[#3ea6ff] rounded-full shrink-0"></span>
        </a>
        <a className="flex items-center gap-6 px-3 h-10 rounded-[10px] text-[14px] font-normal text-on-surface transition-colors hover:bg-surface-container-high" href="#">
          <img className="w-6 h-6 rounded-full object-cover shrink-0" alt="Cinematic Vlogs" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnNvGl0DKUl8hWqrsWARvFwm1o7Qj26yha2WPmfSbiB6Pi-xF_xe3soUqhwfWqxg96rTMs02srre3OEhKYXPvHpTxL8EloYJBtJ5COvZ9gn1LjZycmmGHLOGxHon5WUmQNNUEf_zpbIWBTm7Pxo4XsJDFBGDWdcy1md49GbRxbNMTa5CTZGuKrmnmq4Hem0RcWBtFQNGi0FME5jRYYtqzs6ApjhtAA-JKJXSXYTcpZ0y7X4skIoL8" />
          <span className="whitespace-nowrap overflow-hidden text-ellipsis flex-1">Cinematic Vlogs</span>
        </a>
        <a className="flex items-center gap-6 px-3 h-10 rounded-[10px] text-[14px] font-normal text-on-surface transition-colors hover:bg-surface-container-high" href="#">
          <img className="w-6 h-6 rounded-full object-cover shrink-0" alt="Retro Gamer 84" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAa6YV0qePl8kozZCc8AfP8Yx4FTyLwlzCQSkftIfvkmHhraCx-kpT5mtg-BkyMIZVVi71peeJ4ol2Xgm77yU-Vuw9WG8EivXXdiaa7EnfS20S3zQPxOFdDyHGXUxr3rIoABHX1up5l1FrkUEl8JPsFzFQ1DiK7r334GBgd_VLQWOg5bnVkYQyOW64a545HyXPKktKZ1gFIHrGPNvVAO5wc4W5IAMwHqxTWVkroUYLXGYui2SUS5OQ" />
          <span className="whitespace-nowrap overflow-hidden text-ellipsis flex-1">Retro Gamer 84</span>
          <span className="material-symbols-outlined text-[16px] text-[#3ea6ff]" style={{ fontVariationSettings: "'FILL' 1" }}>cell_tower</span>
        </a>
      </div>

      {/* Explore */}
      <div className="flex flex-col gap-0.5 py-3 border-b border-white/10">
        <h3 className="font-headline-lg text-[16px] font-bold text-on-surface px-3 pt-1 pb-2">Explore</h3>
        <a className="flex items-center gap-6 px-3 h-10 rounded-[10px] text-[14px] font-normal text-on-surface transition-colors hover:bg-surface-container-high" href="#">
          <span className="material-symbols-outlined text-[24px] shrink-0" style={{ fontVariationSettings: "'FILL' 0" }}>local_fire_department</span>
          <span className="whitespace-nowrap overflow-hidden text-ellipsis flex-1">Trending</span>
        </a>
        <a className="flex items-center gap-6 px-3 h-10 rounded-[10px] text-[14px] font-normal text-on-surface transition-colors hover:bg-surface-container-high" href="#">
          <span className="material-symbols-outlined text-[24px] shrink-0" style={{ fontVariationSettings: "'FILL' 0" }}>music_note</span>
          <span className="whitespace-nowrap overflow-hidden text-ellipsis flex-1">Music</span>
        </a>
        <a className="flex items-center gap-6 px-3 h-10 rounded-[10px] text-[14px] font-normal text-on-surface transition-colors hover:bg-surface-container-high" href="#">
          <span className="material-symbols-outlined text-[24px] shrink-0" style={{ fontVariationSettings: "'FILL' 0" }}>sports_esports</span>
          <span className="whitespace-nowrap overflow-hidden text-ellipsis flex-1">Gaming</span>
        </a>
        <a className="flex items-center gap-6 px-3 h-10 rounded-[10px] text-[14px] font-normal text-on-surface transition-colors hover:bg-surface-container-high" href="#">
          <span className="material-symbols-outlined text-[24px] shrink-0" style={{ fontVariationSettings: "'FILL' 0" }}>news</span>
          <span className="whitespace-nowrap overflow-hidden text-ellipsis flex-1">News</span>
        </a>
      </div>

      {/* Settings */}
      <div className="flex flex-col gap-0.5 py-3 border-b border-white/10">
        <a className="flex items-center gap-6 px-3 h-10 rounded-[10px] text-[14px] font-normal text-on-surface transition-colors hover:bg-surface-container-high" href="#">
          <span className="material-symbols-outlined text-[24px] shrink-0" style={{ fontVariationSettings: "'FILL' 0" }}>settings</span>
          <span className="whitespace-nowrap overflow-hidden text-ellipsis flex-1">Settings</span>
        </a>
        <a className="flex items-center gap-6 px-3 h-10 rounded-[10px] text-[14px] font-normal text-on-surface transition-colors hover:bg-surface-container-high" href="#">
          <span className="material-symbols-outlined text-[24px] shrink-0" style={{ fontVariationSettings: "'FILL' 0" }}>flag</span>
          <span className="whitespace-nowrap overflow-hidden text-ellipsis flex-1">Report history</span>
        </a>
        <a className="flex items-center gap-6 px-3 h-10 rounded-[10px] text-[14px] font-normal text-on-surface transition-colors hover:bg-surface-container-high" href="#">
          <span className="material-symbols-outlined text-[24px] shrink-0" style={{ fontVariationSettings: "'FILL' 0" }}>help</span>
          <span className="whitespace-nowrap overflow-hidden text-ellipsis flex-1">Help</span>
        </a>
        <a className="flex items-center gap-6 px-3 h-10 rounded-[10px] text-[14px] font-normal text-on-surface transition-colors hover:bg-surface-container-high" href="#">
          <span className="material-symbols-outlined text-[24px] shrink-0" style={{ fontVariationSettings: "'FILL' 0" }}>feedback</span>
          <span className="whitespace-nowrap overflow-hidden text-ellipsis flex-1">Send feedback</span>
        </a>
      </div>

      {/* Footer */}
      <div className="p-3 pt-4 text-[12px] text-on-surface-variant leading-[1.6] opacity-75">
        <p className="mb-2">About Press Copyright Contact us Creators Advertise Developers</p>
        <p className="mb-2">Terms Privacy Policy & Safety How YouTube works Test new features</p>
        <p className="text-[#717171] font-bold mt-4">© 2024 Google LLC</p>
      </div>
    </nav>
  );
};

export default Sidebar;
