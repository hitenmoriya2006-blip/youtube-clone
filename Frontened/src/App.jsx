import React, { useEffect } from 'react';
import { createBrowserRouter,Outlet,RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Watch from './pages/Watch';
import Channel from './pages/Channel';
import UploadVideo from './pages/UploadVideo';
import EditVideoDetails from './pages/EditVideoDetails';
import { useDispatch } from 'react-redux';
import { login } from './features/auth/authSlice';
import axios from 'axios'
import './index.css';
import MainLayout from './layout/MainLayout';
import AuthLayout from './layout/AuthLayout';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import SearchResults from './pages/SearchResults'
import Playlists from './pages/Playlists';
import PlaylistDetails from './pages/PlaylistDetails'


function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/users/current-user",
          {
            withCredentials: true,
          }
        );

        dispatch(login(response.data.data.user));
      } catch (error) {
        if (error.response?.status !== 401) {
          console.error(error);
        }

      }
    };

    getCurrentUser();
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      element: <MainLayout/>,
      children:[
        {
          path:'/',
          element:<Home />
        },
        {
          path:`/watch/:videoId`,
          element:<Watch />
        },
        {
          path:`/channel/:username`,
          element:<Channel />,
        },
        {
          path:'/profile',
          element:<Profile />
        },
        {
          path:'/edit-profile',
          element:<EditProfile />
        },
        {
          path:'/upload',
          element:<UploadVideo />
        },
        {
          path: '/edit-video',
          element: <EditVideoDetails />
        },
        {
          path:'/result',
          element: <SearchResults />
        },
        {
          path:'/playlist',
          element:<Playlists />
        },,
        {
          path:'/playlists/:playlistId',
          element:<PlaylistDetails />
        }
      ]
    },
    {
      element:<AuthLayout />,
      children:[
        {
          path:'/login',
          element:<Login />
        },
        {
          path:'/signup',
          element:<Signup />
        }
      ]
    }
  ])

  return (
   <RouterProvider router={router}/>
  )
}

export default App;
