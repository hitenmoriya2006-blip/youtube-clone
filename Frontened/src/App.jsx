import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Watch from './pages/Watch';
import { useDispatch } from 'react-redux';
import { login } from './features/auth/authSlice';
import axios from 'axios'
import './index.css';

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

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/watch/:videoId" element={<Watch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
