import React, { useState, useEffect } from 'react';
import ChipBar from '../components/ChipBar';
import VideoGrid from '../components/VideoGrid';
import api from '@/api/axios';

function Home() {

  const [allVideos, setallVideos] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchAllVideos = async () => {
      try {
        setLoading(true)
        const response = await api.get('/videos/get-all',
          {
            withCredentials: true
          })

        if (response) {
          setallVideos(response.data.data.allVideos)
        }
      } catch (error) {
        console.log(error.response?.status);
        console.log(error.response?.data);
      } finally {
        setLoading(false)
      }
    }
     fetchAllVideos()
  }, [])

  return (
    <>
      <ChipBar />
      <VideoGrid videos={allVideos} loading={loading} />
    </>
  );
}

export default Home;


