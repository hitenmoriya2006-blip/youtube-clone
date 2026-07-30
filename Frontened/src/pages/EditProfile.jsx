import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'sonner'
import { updateUser } from "@/features/auth/authSlice";

const EditProfile = () => {

    const { register, reset, handleSubmit, formState: { errors, dirtyFields } } = useForm()
    const user = useSelector((state) => state.auth.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        reset({
            fullName: user?.fullName,
            username: user?.username,
            email: user?.email,
            description: user?.description,
        });
    }, [user, reset]);

    const updateAccountDetail = async (data) => {
        console.log(data);
        try {
            await axios.patch(
                "http://localhost:3000/api/v1/users/update-account",
                data,
                { withCredentials: true }
            );

            const fieldNames = {
                fullName: "Full Name",
                username: "Username",
                email: "Email",
                description: "description",
            };

            const changedFields = Object.keys(dirtyFields);

            if (changedFields.length === 0) {
                toast.info("No changes made.");
                return;
            }

            changedFields.forEach((field) => {
                toast.success(`${fieldNames[field]} updated successfully`);
            });

        } catch (error) {
            toast.error(
                error.response?.data?.message || "Something went wrong!"
            );
        }
    };

    const updateAvatar = async (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const formData = new FormData();
        formData.append("avatar", file);

        try {
            const response = await axios.patch(
                "http://localhost:3000/api/v1/users/avatar",
                formData,
                {
                    withCredentials: true,
                }
            );

            if (response) dispatch(updateUser(response.data.data.user))
            if (response) toast.success('profile photo changed')
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Something went wrong!"
            );
            console.log(error);
        }
    };

    const updateCoverImage = async (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const formData = new FormData();
        formData.append("coverImage", file);

        try {
            const response = await axios.patch(
                "http://localhost:3000/api/v1/users/cover-image",
                formData,
                {
                    withCredentials: true,
                }
            );

            if (response) dispatch(updateUser(response.data.data.user))
            if (response) toast.success('Banner  changed successfully')
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Something went wrong!"
            );
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            <div className="max-w-7xl mx-auto px-6 py-10">

                <button onClick={() => navigate('/profile')}
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 px-6 mb-6 py-3 rounded-4xl font-semibold transition"
                >
                    Back to profile
                </button>

                {/* Heading */}
                <div className="mb-10">
                    <h1 className="text-5xl font-bold">
                        Edit Channel Profile
                    </h1>

                    <p className="text-zinc-400 mt-3 text-lg">
                        Update your channel information and branding.
                    </p>
                </div>

                {/* Banner + Avatar */}
                <div className="flex gap-6">

                    {/* Banner */}
                    <div className="flex-2 relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 h-80">

                        <img
                            src={user?.coverImage}
                            alt="Cover"
                            className="w-full h-full object-cover"
                        />

                        <label
                            htmlFor="banner"
                            className="absolute bottom-5 left-5 cursor-pointer bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg font-semibold"
                        >
                            Change Banner
                        </label>

                        <input
                            id="banner"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={updateCoverImage}
                        />

                    </div>
                    {/* Avatar */}
                    <div className="bg-zinc-900 flex-1 border border-zinc-800 rounded-2xl p-8">

                        <div className="flex flex-col items-center">

                            <div className="relative">

                                <img
                                    src={user?.avatar}
                                    alt="Avatar"
                                    className="w-44 h-44 rounded-full object-cover border-[5px] border-red-600"
                                />

                                <label
                                    htmlFor="avatar"
                                    className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center cursor-pointer"
                                >
                                    ✎
                                </label>

                                <input
                                    id="avatar"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={updateAvatar}
                                />

                            </div>

                            <h3 className="text-2xl font-bold mt-8">
                                Profile Photo
                            </h3>

                            <p className="text-zinc-400 mt-2 text-center">
                                Recommended size 800 × 800 px
                            </p>

                            <label
                                htmlFor="avatar"
                                className="mt-6 text-red-500 font-semibold hover:text-red-400 cursor-pointer"
                            >
                                Change Photo
                            </label>

                        </div>

                    </div>

                </div>

            </div>

            {/* Identity & Access */}
            <div className="mt-10 mb-8 mx-7 bg-zinc-900 border border-zinc-800 rounded-2xl p-8">

                <h2 className="text-2xl font-bold mb-8">
                    Identity & Access
                </h2>

                <form onSubmit={handleSubmit(updateAccountDetail)} >
                    <div className="grid md:grid-cols-2 gap-6">

                        {/* Channel Name */}
                        <div>
                            <label className="block text-sm text-zinc-400 mb-2">
                                Channel name
                            </label>

                            <input
                                type="text"
                                placeholder="Channel Name"
                                {...register("fullName")
                                }
                                className=" w-full
                                     bg-zinc-800
                                      border
                                     border-zinc-700
                                      rounded-lg
                                      px-4
                                      py-3
                                      outline-none
                                   focus:border-red-500
                                     transition"
                            />
                            {errors.fullName && (
                                <p className="text-red-500 text-sm mt-2">
                                    {errors.fullName.message}
                                </p>
                            )}
                        </div>

                        {/* Username */}
                        <div>
                            <label className="block text-sm text-zinc-400 mb-2">
                                Handle
                            </label>

                            <input
                                type="text"
                                placeholder="@username"
                                {...register("username")}
                                className="
                                      w-full
                                     bg-zinc-800
                                      border
                                     border-zinc-700
                                      rounded-lg
                                      px-4
                                      py-3
                                      outline-none
                                   focus:border-red-500
                                     transition"
                            />
                            {errors.username && (
                                <p className="text-red-500 text-sm mt-2">
                                    {errors.username.message}
                                </p>
                            )}
                        </div>

                    </div>

                    {/* Email */}
                    <div className="mt-6">

                        <label className="block text-sm text-zinc-400 mb-2">
                            Contact email
                        </label>

                        <input
                            type="email"
                            placeholder="example@gmail.com"
                            {...register("email", {
                                pattern: {
                                    value: /^\S+@\S+\.\S+$/,
                                    message: "Invalid email"
                                }
                            })}
                            className="
                                w-full
                                bg-zinc-800
                                border
                                border-zinc-700
                                rounded-lg
                                px-4
                                py-3
                                outline-none
                                focus:border-red-500
                                transition"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-2">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Channel Bio */}
                    <div className="mt-6">
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm text-zinc-400 mb-2">
                                Channel bio
                            </label>
                        </div>

                        <textarea
                            rows={8}
                            maxLength={500}
                            placeholder="Tell viewers about your channel..."
                            {...register("description")}
                            className="
                            w-full
                            bg-zinc-800
                            border
                            border-zinc-700
                            rounded-xl
                            p-4
                            resize-none
                            outline-none
                            focus:border-red-500
                            transition"
                        />
                          {errors.description && (
                                <p className="text-red-500 text-sm mt-2">
                                    {errors.description.message}
                                </p>
                            )}

                        <p className="text-sm text-zinc-500 mt-3">
                            Share what your channel is about, what you create, and why people should subscribe.
                        </p>
                    </div>

                    <div className="flex justify-end mt-8">
                        <button
                            type="submit"
                            className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-4xl font-semibold transition"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default EditProfile;