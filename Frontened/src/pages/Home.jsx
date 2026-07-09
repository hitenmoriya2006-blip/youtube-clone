import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ChipBar from '../components/ChipBar';
import VideoGrid from '../components/VideoGrid';
import axios from 'axios'

function Home() {

  const [allVideos, setallVideos] = useState([])

  
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
    <>
      <ChipBar />
      <VideoGrid videos={allVideos} />
    </>
  );
}

export default Home;


