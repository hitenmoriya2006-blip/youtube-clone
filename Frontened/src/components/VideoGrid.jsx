import React from 'react';
import VideoCard from './VideoCard';
import ShortsShelf from './ShortsShelf';

const MOCK_VIDEOS = [
  {
    id: 1,
    title: "Building a Modern Web App with React and Vite - Full Course 2024",
    channel: "Tech Masterclass",
    views: "1.2M views",
    time: "2 days ago",
    duration: "4:32:15",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80",
    isLive: false
  },
  {
    id: 2,
    title: "The FUTURE of AI - What to expect in the next 5 years (Mind blowing)",
    channel: "Future Tech",
    views: "850K views",
    time: "4 hours ago",
    duration: "18:24",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&q=80",
    isLive: false
  },
  {
    id: 3,
    title: "Chill Lofi Beats To Study/Code To 🎵 (24/7 Radio)",
    channel: "Lofi Vibes",
    views: "12K watching",
    time: "Live now",
    duration: "LIVE",
    thumbnail: "https://images.unsplash.com/photo-1516280440502-6c3e98188177?w=800&q=80",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    isLive: true
  },
  {
    id: 4,
    title: "Minimalist Desk Setup Tour 2024 - Productivity Focused",
    channel: "Workspace Design",
    views: "320K views",
    time: "1 week ago",
    duration: "12:05",
    thumbnail: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&q=80",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80",
    isLive: false
  },
  {
    id: 5,
    title: "10 CSS Tricks You Didn't Know Existed",
    channel: "Frontend Daily",
    views: "2.1M views",
    time: "3 weeks ago",
    duration: "8:45",
    thumbnail: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&q=80",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    isLive: false
  },
  {
    id: 6,
    title: "Exploring the Deep Ocean - Documentary",
    channel: "Nature Focus",
    views: "4.5M views",
    time: "1 month ago",
    duration: "52:10",
    thumbnail: "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=800&q=80",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
    isLive: false
  },
  {
    id: 7,
    title: "My Morning Routine as a Software Engineer in Tokyo",
    channel: "Tech In Japan",
    views: "980K views",
    time: "5 days ago",
    duration: "15:30",
    thumbnail: "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800&q=80",
    avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=100&q=80",
    isLive: false
  },
  {
    id: 8,
    title: "SpaceX Starship Launch - Live Coverage",
    channel: "Space Exploration",
    views: "150K watching",
    time: "Live now",
    duration: "LIVE",
    thumbnail: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=800&q=80",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&q=80",
    isLive: true
  }
];

const MOCK_SHORTS = [
  {
    id: 1,
    title: "Insane trick shot 🎯 #shorts",
    views: "2.4M views",
    thumbnail: "https://images.unsplash.com/photo-1518605368461-1ee7c5320746?w=400&q=80"
  },
  {
    id: 2,
    title: "Quick healthy recipe in 60s 🥗",
    views: "890K views",
    thumbnail: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80"
  },
  {
    id: 3,
    title: "Cat vs Cucumber 😹",
    views: "5.1M views",
    thumbnail: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80"
  },
  {
    id: 4,
    title: "Coding hack you NEED to know 💻",
    views: "1.1M views",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80"
  },
  {
    id: 5,
    title: "Beautiful sunset timelapse 🌅",
    views: "450K views",
    thumbnail: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=400&q=80"
  }
];


const VideoGrid = ({ videos = MOCK_VIDEOS, shorts = MOCK_SHORTS }) => {
  return (
    <div className="p-4 sm:p-6 pb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-10 gap-x-4">
      {videos.slice(0, 4).map((video) => (
        <VideoCard key={video.id} {...video} />
      ))}
      
      <ShortsShelf shorts={shorts} />
      
      {videos.slice(4).map((video) => (
        <VideoCard key={video.id} {...video} />
      ))}
    </div>
  );
};

export default VideoGrid;
