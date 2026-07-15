import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Header = ({ onMenuClick }) => {

  const user = useSelector((state) => state.auth.user)
  const  navigate = useNavigate()
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[56px] bg-background flex items-center justify-between px-4">
      {/* Left: Menu & Logo */}
      <div className="flex items-center gap-4 shrink-0">
        <button onClick={onMenuClick} className="w-10 h-10 rounded-full bg-transparent border-none text-on-surface flex items-center justify-center transition-colors hover:bg-surface-container-highest">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>menu</span>
        </button>
        <div onClick={() =>  navigate('/')}  className="flex items-center gap-0.5 cursor-pointer">
          <span className="material-symbols-outlined text-[28px] text-[#ff0000]" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
          <span className="font-headline-lg text-headline-lg tracking-[-0.5px] text-on-surface">YouTube</span>
        </div>
      </div>

      {/* Center: Search */}
      <div className="hidden sm:flex items-center flex-1 max-w-[720px] mx-10">
        <div className="flex w-full">
          <div className="flex flex-1 items-center bg-[#121212] border border-surface-variant rounded-l-full px-4 h-10 relative focus-within:border-[#1c62b9]">
            <input className="w-full bg-transparent border-none outline-none text-on-surface text-[16px] font-body-md placeholder:text-on-surface-variant" placeholder="Search" type="text" />
            <span className="material-symbols-outlined text-[20px] text-on-surface-variant cursor-pointer" style={{ fontVariationSettings: "'FILL' 0" }}>keyboard</span>
          </div>
          <button onClick={() => navigate('/result')} className="bg-surface-container-highest border border-l-0 border-surface-variant rounded-r-full w-16 h-10 flex items-center justify-center text-on-surface shrink-0 transition-colors hover:bg-surface-variant">
            <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 0" }}>search</span>
          </button>
        </div>
        <button className="ml-4 w-10 h-10 rounded-full bg-surface-container-highest border-none text-on-surface flex items-center justify-center shrink-0 transition-colors hover:bg-surface-variant">
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>mic</span>
        </button>
      </div>

      {/* Right: Actions & Profile */}
      <div className="flex items-center gap-2 shrink-0">
        <button className="w-10 h-10 rounded-full bg-transparent border-none text-on-surface flex items-center justify-center relative transition-colors hover:bg-surface-container-highest">
          <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 0" }}>video_call</span>
        </button>
        <button className="w-10 h-10 rounded-full bg-transparent border-none text-on-surface flex items-center justify-center relative transition-colors hover:bg-surface-container-highest">
          <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 0" }}>notifications</span>
          <span className="absolute top-1.5 right-1 bg-primary-container text-white text-[10px] font-bold px-1 rounded-[10px] leading-[1.2] border-2 border-background">9+</span>
        </button>
      
        <button onClick={() => navigate('/Profile')} className="w-8 h-8 rounded-full overflow-hidden border-none bg-transparent cursor-pointer ml-2 transition-shadow hover:shadow-[0_0_0_1px_var(--tw-colors-surface-variant)]">
          <img alt="User profile" className="w-full h-full object-cover" src={user?.avatar} />
        </button>
      </div>
    </header>
  );
};

export default Header;
