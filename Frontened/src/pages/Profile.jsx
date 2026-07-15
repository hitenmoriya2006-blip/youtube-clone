import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { formatDistanceToNowStrict } from "date-fns";
import { logout } from '../features/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Profile = () => {

    const [user, setuser] = useState()
    const [channnelStats, setchannnelStats] = useState()
    const [channelVideos, setchannelVideos] = useState([])
    const [showPasswordModel, setshowPasswordModel] = useState(false)
    const { register, handleSubmit, formState: { errors }, setError } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const currentUserData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/users/current-user',
                    {
                        withCredentials: true
                    }
                )
                if (response) {
                    setuser(response.data.data.user)
                }
            } catch (error) {
                console.log(error.response?.status);
                console.log(error.response?.data);
            }
        }

        const channelStatsData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/dashboard/c/stats',
                    {
                        withCredentials: true
                    }
                )
                if (response) {
                    setchannnelStats(response.data.data)
                }
            } catch (error) {
                console.log(error.response?.status);
                console.log(error.response?.data);
            }
        }

        const channelVideosData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/dashboard/c/all-videos',
                    {
                        withCredentials: true
                    }
                )
                if (response) {
                    setchannelVideos(response.data.data.docs)
                }
            } catch (error) {
                console.log(error.response?.status);
                console.log(error.response?.data);
            }
        }

        currentUserData()
        channelStatsData()
        channelVideosData()
    }, [])

    const timeAgo = (date) => {
        if (!date || isNaN(new Date(date).getTime())) {
            return "";
        }

        return formatDistanceToNowStrict(new Date(date), {
            addSuffix: true,
        });
    };

    const formatDuration = (duration) => {
        const totalSeconds = Math.floor(duration);

        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        if (hours > 0) {
            return `${hours}:${minutes
                .toString()
                .padStart(2, "0")}:${seconds
                    .toString()
                    .padStart(2, "0")}`;
        }

        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    const logoutAccount = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/v1/users/logout',
                {},
                {
                    withCredentials: true,
                }
            )

            if (response) {
                dispatch(logout)
                navigate('/login')
            }
        } catch (error) {
            console.log(error.response?.status);
            console.log(error.response?.data);
        }
    }

    const changePassword = async (data) => {
        try {
            const response = await axios.patch('http://localhost:3000/api/v1/users/change-password',
                data,
                {
                    withCredentials: true
                }
            )
            console.log(response.data.data);
            
            setshowPasswordModel(false)
        } catch (error) {
            setError("oldPassword", {
                type: "server",
                message: error.response.data.message,
            });
        }
    }


    return (
        <div className="min-h-screen bg-background text-white">
            {/* Cover Image */}
            <div className="relative h-64 mr-4 md:h-80 w-full">
                <img
                    src={user?.coverImage}
                    alt="cover"
                    className="w-full h-full object-cover rounded-2xl"
                />

                <button className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-black/70 hover:bg-black flex items-center justify-center transition">
                    <span className="material-symbols-outlined">
                        photo_camera
                    </span>
                </button>
            </div>

            {/* Profile Header */}
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-16">
                    {/* Avatar */}
                    <div className="relative">
                        <img
                            src={user?.avatar}
                            alt="avatar"
                            className="w-36 h-36 md:w-44 md:h-44 rounded-full border-4 border-zinc-950 object-cover"
                        />

                        <button className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-black/80 hover:bg-black flex items-center justify-center transition">
                            <span className="material-symbols-outlined">
                                edit
                            </span>
                        </button>
                    </div>

                    {/* User Info */}
                    <div className="flex-1 mt-22">
                        <h1 className="text-3xl md:text-4xl font-bold">
                            {user?.fullName}
                        </h1>

                        <div className="flex flex-wrap gap-2 text-zinc-400 mt-2">
                            <span>@{user?.username}</span>
                            <span>•</span>
                            <span>{user?.email}</span>
                            <span>•</span>
                            <span>Joined {timeAgo(user?.createdAt)}</span>
                        </div>

                        <p className="mt-4 text-zinc-300 max-w-2xl">
                            Full Stack Developer passionate about building
                            scalable applications, sharing knowledge, and
                            creating amazing web experiences.
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <button onClick={() => navigate('/edit-profile')} className="px-5 py-2 rounded-full bg-white text-black font-semibold hover:opacity-90 transition">
                            Edit Profile
                        </button>

                        <button onClick={() => setshowPasswordModel(true)} className="px-5 py-2 rounded-full border border-zinc-700 hover:bg-zinc-900 transition">
                            Change Password
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
                    <div className="bg-zinc-900 rounded-2xl p-5">
                        <h2 className="text-3xl font-bold">{channnelStats?.totalVideos}</h2>
                        <p className="text-zinc-400 mt-1">
                            Videos Uploaded
                        </p>
                    </div>

                    <div className="bg-zinc-900 rounded-2xl p-5">
                        <h2 className="text-3xl font-bold">{channnelStats?.totalSubscribers}</h2>
                        <p className="text-zinc-400 mt-1">
                            Subscribers
                        </p>
                    </div>

                    <div className="bg-zinc-900 rounded-2xl p-5">
                        <h2 className="text-3xl font-bold">{channnelStats?.totalViews}</h2>
                        <p className="text-zinc-400 mt-1">
                            Total Views
                        </p>
                    </div>

                    <div className="bg-zinc-900 rounded-2xl p-5">
                        <h2 className="text-3xl font-bold">--</h2>
                        <p className="text-zinc-400 mt-1">
                            Subscribed Channels
                        </p>
                    </div>
                </div>
                {/* Personal Information + Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">

                    {/* Personal Information */}
                    <div className="lg:col-span-2 bg-zinc-900 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-semibold">
                                Personal Information
                            </h2>

                            <button className="p-2 rounded-full hover:bg-zinc-800 transition">
                                <span className="material-symbols-outlined">
                                    edit
                                </span>
                            </button>
                        </div>

                        <div className="space-y-6">

                            <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
                                <div>
                                    <p className="text-zinc-500 text-sm">Full Name</p>
                                    <p className="mt-1">{user?.fullName}</p>
                                </div>

                                <span className="material-symbols-outlined text-zinc-500">
                                    chevron_right
                                </span>
                            </div>

                            <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
                                <div>
                                    <p className="text-zinc-500 text-sm">Username</p>
                                    <p className="mt-1">@{user?.username}</p>
                                </div>

                                <span className="material-symbols-outlined text-zinc-500">
                                    chevron_right
                                </span>
                            </div>

                            <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
                                <div>
                                    <p className="text-zinc-500 text-sm">Email</p>
                                    <p className="mt-1">{user?.email}</p>
                                </div>

                                <span className="material-symbols-outlined text-zinc-500">
                                    chevron_right
                                </span>
                            </div>

                            <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
                                <div>
                                    <p className="text-zinc-500 text-sm">Bio</p>
                                    <p className="mt-1 max-w-xl">
                                        Full Stack Developer passionate about
                                        creating modern web applications.
                                    </p>
                                </div>

                                <span className="material-symbols-outlined text-zinc-500">
                                    chevron_right
                                </span>
                            </div>

                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-zinc-500 text-sm">Joined</p>
                                    <p className="mt-1">{timeAgo(user?.createdAt)}</p>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-zinc-900 rounded-2xl p-6">

                        <h2 className="text-2xl font-semibold mb-6">
                            Quick Actions
                        </h2>

                        <div className="grid grid-cols-2 gap-4">

                            <button onClick={() => navigate('/upload')} className="bg-zinc-800 rounded-xl p-5 hover:bg-zinc-700 transition active:scale-95">
                                <span className="material-symbols-outlined text-4xl mb-3">
                                    upload
                                </span>

                                <p className="font-medium">
                                    Upload Video
                                </p>
                            </button>

                            <button className="bg-zinc-800 rounded-xl p-5 hover:bg-zinc-700 transition active:scale-95">
                                <span className="material-symbols-outlined text-4xl mb-3">
                                    video_library
                                </span>

                                <p className="font-medium">
                                    My Videos
                                </p>
                            </button>

                            <button className="bg-zinc-800 rounded-xl p-5 hover:bg-zinc-700 transition active:scale-95">
                                <span className="material-symbols-outlined text-4xl mb-3">
                                    favorite
                                </span>

                                <p className="font-medium">
                                    Liked Videos
                                </p>
                            </button>

                            <button className="bg-zinc-800 rounded-xl p-5 hover:bg-zinc-700 transition active:scale-95">
                                <span className="material-symbols-outlined text-4xl mb-3">
                                    history
                                </span>

                                <p className="font-medium">
                                    History
                                </p>
                            </button>

                        </div>

                    </div>

                </div>
                {/* Latest Uploads */}

                <div className="mt-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-3xl font-bold">
                            Your Latest Uploads
                        </h2>

                        <button className="px-5 py-2 rounded-full border border-zinc-700 hover:bg-zinc-900 transition">
                            View All
                        </button>
                    </div>

                    {
                        channelVideos.length === 0 ?
                            <div className='text-white font-medium text-lg text-centre mt-8'>no video uploaded</div>
                            :
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

                                {channelVideos.map((video) => (
                                    <div
                                        key={video._id}
                                        className="group rounded-2xl overflow-hidden bg-zinc-900 hover:bg-zinc-800 transition cursor-pointer"
                                    >

                                        {/* Thumbnail */}
                                        <div className="relative overflow-hidden">
                                            <img
                                                src={video.thumbnail}
                                                alt="thumbnail"
                                                className="aspect-video w-full object-cover group-hover:scale-105 transition duration-300"
                                            />

                                            <span className="absolute bottom-2 right-2 px-2 py-1 text-xs rounded bg-black/80">
                                                {formatDuration(video?.duration)}
                                            </span>
                                        </div>

                                        {/* Video Details */}
                                        <div className="p-4">

                                            <div className="flex justify-between items-start">

                                                <div>

                                                    <h3 className="font-semibold line-clamp-2">
                                                        {video.title}
                                                    </h3>

                                                    <p className="text-sm text-zinc-400 mt-2">
                                                        {video.views} views • {timeAgo(video.createdAt)}
                                                    </p>

                                                </div>

                                                <button className="rounded-full p-2 hover:bg-zinc-700 transition">
                                                    <span className="material-symbols-outlined">
                                                        more_vert
                                                    </span>
                                                </button>

                                            </div>

                                        </div>

                                    </div>
                                ))}

                            </div>
                    }



                </div>


                {/* Danger Zone */}
                <div className="mt-14 mb-16">
                    <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-6">

                        <h2 className="text-2xl font-bold text-red-400">
                            Danger Zone
                        </h2>

                        <p className="mt-3 text-zinc-400 max-w-3xl">
                            Deleting your account is permanent. Your uploaded videos,
                            playlists, comments, likes, subscriptions, and all account
                            information will be permanently removed and cannot be recovered.
                        </p>

                        <div className="flex flex-wrap gap-4 mt-8">

                            <button className="px-6 py-3 rounded-full bg-red-600 hover:bg-red-700 transition active:scale-95 font-semibold">
                                Delete Account
                            </button>

                            <button onClick={logoutAccount} className="px-6 py-3 rounded-full border border-zinc-700 hover:bg-zinc-900 transition active:scale-95">
                                Logout
                            </button>

                        </div>

                    </div>
                </div>

            </div>

            {
                showPasswordModel &&
                (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" id="change-password-modal">
                        <div className="bg-surface-container-high w-full max-w-md rounded-2xl border border-surface-variant/30 shadow-2xl overflow-hidden">
                            <div className="p-6 border-b border-surface-variant/20">
                                <h2 className="font-headline-lg text-headline-lg text-on-surface">Change Password</h2>
                            </div>
                            <form onSubmit={handleSubmit(changePassword)}>
                                <div className="p-6 space-y-4">
                                    <div className="space-y-1.5">
                                        <label className="font-label-sm text-on-surface-variant ml-1">Current Password</label>
                                        <input className="w-full bg-surface-container-low border border-surface-variant rounded-xl px-4 py-3 text-on-surface focus:border-primary focus:ring-0 transition-all" placeholder="Enter current password" type="password"
                                            {...register('oldPassword',
                                                {
                                                    required: 'current password is required'
                                                }
                                            )
                                            } />
                                        {errors.oldPassword && (
                                            <p className="text-red-500 text-sm mt-2">
                                                {errors.oldPassword.message}
                                            </p>
                                        )}
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="font-label-sm text-on-surface-variant ml-1">New Password</label>
                                        <input className="w-full bg-surface-container-low border border-surface-variant rounded-xl px-4 py-3 text-on-surface focus:border-primary focus:ring-0 transition-all" placeholder="Enter new password" type="password"
                                            {...register('newPassword', {
                                                required: 'new password is required'
                                            })
                                            } />
                                        {errors.newPassword && (
                                            <p className="text-red-500 text-sm mt-2">
                                                {errors.newPassword.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="p-6 bg-surface-container-highest/50 flex gap-3 justify-end">
                                    <button type='button' onClick={() => setshowPasswordModel(false)} className="px-6 py-2.5 font-bold text-on-surface hover:bg-surface-variant rounded-full transition-all">Cancel</button>
                                    <button type='submit' className="px-6 py-2.5 bg-red-600 hover:bg-red-700 font-bold rounded-full  hover: transition-all">Update Password</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Profile








