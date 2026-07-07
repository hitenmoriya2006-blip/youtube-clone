import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ChipBar from '../components/ChipBar';
import VideoGrid from '../components/VideoGrid';
import axios from 'axios'

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const [allVideos, setallVideos] = useState([])

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  useEffect(() => {
    const fetchAllVideos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/videos/get-all',
          {
            withCredentials: true
          })

        if (response) {
          setallVideos(response.data.data.allVideos)
          console.log(allVideos);
          
        }
      } catch (error) {
        console.log(error.response?.status);
        console.log(error.response?.data);
      }
    }
    fetchAllVideos()
  }, [])

  return (
    <div className="text-on-surface bg-background">
      <Header onMenuClick={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />
      <main className={`mt-[56px] ${isSidebarOpen ? 'lg:ml-[240px]' : 'lg:ml-[72px]'} h-[calc(100vh-56px)] overflow-y-auto bg-background transition-all duration-200`}>
        <ChipBar />
        <VideoGrid videos={allVideos} />
      </main>
    </div>
  );
}

export default Home;

// lg:ml-[240px]
