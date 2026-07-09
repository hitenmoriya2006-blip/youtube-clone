import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const MainLayout = () => {

    const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
    const [allVideos, setallVideos] = useState([])

    const toggleSidebar = () => {
        setIsSidebarOpen(prev => !prev);
    };
    return (
        <div className='min-h-screen  flex flex-col'>

            <Header onMenuClick={toggleSidebar} />
            <Sidebar isOpen={isSidebarOpen} />
            <main className={`mt-[56px] ${isSidebarOpen ? 'lg:ml-[240px]' : 'lg:ml-[72px]'} h-[calc(100vh-56px)] overflow-y-auto bg-background transition-all duration-200`}>
                <Outlet />
            </main>


        </div>
    )
}

export default MainLayout