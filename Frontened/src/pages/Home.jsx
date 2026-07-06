import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ChipBar from '../components/ChipBar';
import VideoGrid from '../components/VideoGrid';

function Home() {
  return (
    <div className="text-on-surface bg-background">
      <Header />
      <Sidebar />
      <main className="mt-[56px] lg:ml-[240px] h-[calc(100vh-56px)] overflow-y-auto bg-background">
        <ChipBar />
        <VideoGrid />
      </main>
    </div>
  );
}

export default Home;
