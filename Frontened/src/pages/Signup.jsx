import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios'
import {Link,useNavigate} from 'react-router-dom'

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm()
  const password = watch('password')
  const navigate =  useNavigate()

  const createAccount = async (data) => {
    try {
      const formData = new FormData()

      formData.append('fullName', data.fullName)
      formData.append("username", data.username);
      formData.append("email", data.email);
      formData.append("password", data.password);

      formData.append("avatar", data.avatar[0]);

      if (data.coverImage?.length > 0) {
        formData.append("coverImage", data.coverImage[0]);
      }

      const response = await axios.post('http://localhost:3000/api/v1/users/register',
        formData,
        {
          withCredentials: true
        }
      )
      navigate('/login')
      console.log(response.message);
      reset()
    } catch (error) {
      console.log(error.response?.status);
      console.log(error.response?.data);
    }
  }

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen flex items-center justify-center cinematic-gradient overflow-hidden relative">
      {/* Atmospheric Subtle Background Animation Placeholder */}
      <div className="fixed inset-0 pointer-events-none opacity-20"></div>

      <main className="relative z-10 w-full max-w-[1040px] px-gutter flex flex-col md:flex-row items-center justify-center gap-12">
        {/* Brand Narrative Section */}
        <div className="hidden md:flex flex-col max-w-sm">
          <div className="flex items-center gap-1 mb-6">
            <span className="material-symbols-outlined text-primary-container text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
            <h1 className="font-headline-lg text-headline-lg tracking-tight text-on-surface">YouTube</h1>
          </div>
          <h2 className="font-display-lg text-display-lg mb-4 text-on-surface leading-tight">Create your account</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">Continue to YouTube to watch your favorite creators, save playlists, and join the conversation.</p>
          <div className="mt-12 overflow-hidden rounded-xl aspect-video glass-panel relative group">
            <div className="w-full h-full bg-cover bg-center opacity-60 group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAtVvRgWk9zvuyn4UU_AEfl7qx-pa0CFHntJjQ0wrOoQFxjvFTdB8H01EoLEQBz13RPlU_6-FIBg_quHnp_e3P65oRNwxRrhhW0ATHExagCaX2lszPcM5oV8gV2VA933qfl_-RXRLj1xOTAZOvoPnJIEUy89CsCKHCVaWV0jdmar49jjYJkK6T_HqC9ENerhWkL6yUdkJCYUniEM99_JZRXvAJhWYsh9HcodJfr0N1k9RsQpNLhwCw')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
          </div>
        </div>

        {/* Sign Up Card */}
        <div className="w-full max-w-[450px] glass-panel rounded-xl p-8 md:p-10 shadow-2xl">
          {/* Mobile Logo */}
          <div className="md:hidden flex flex-col items-center mb-8">
            <div className="flex items-center gap-1 mb-2">
              <span className="material-symbols-outlined text-primary-container text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
              <span className="font-headline-lg text-headline-lg font-bold">YouTube</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg">Create account</h2>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(createAccount)}>

            {/* Upload Fields */}
            <div className="flex gap-4">
              <div className="relative group">
                <input className="peer w-full bg-surface-container-high border-outline/30 border rounded-lg px-4 pt-6 pb-2 focus:border-primary-container focus:ring-0  text-on-surface transition-all" placeholder=" " type="file"
                  {...register("avatar", {
                    required: 'avatar is required'
                  })}
                />
                {errors.avatar && (<span className=' text-on-surface-variant font-label-lg transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-body-md peer-focus:top-1 peer-focus:text-label-sm peer-focus:text-primary-container peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-label-sm'>{errors.avatar.message}</span>)}
                <label className="absolute left-4 top-4 text-on-surface-variant font-label-lg transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-body-md peer-focus:top-1 peer-focus:text-label-sm peer-focus:text-primary-container peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-label-sm" htmlFor="first_name">upload avatar</label>
              </div>
              <div className="relative group">
                <input className="peer w-full bg-surface-container-high border-outline/30 border rounded-lg px-4 pt-6 pb-2 focus:border-primary-container focus:ring-0 text-on-surface transition-all" placeholder=" " type="file"
                  {...register("coverImage")}
                />
                {errors.coverImage && (<span className=' text-on-surface-variant font-label-lg transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-body-md peer-focus:top-1 peer-focus:text-label-sm peer-focus:text-primary-container peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-label-sm'>{errors.coverImage.message}</span>)}
                <label className="absolute left-4 top-4 text-on-surface-variant font-label-lg transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-body-md peer-focus:top-1 peer-focus:text-label-sm peer-focus:text-primary-container peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-label-sm" htmlFor="last_name">upload cover image</label>
              </div>
            </div>

            {/* Name Row */}
            <div className="relative group">
              <input className="peer w-full bg-surface-container-high border-outline/30 border rounded-lg px-4 pt-6 pb-2 focus:border-primary-container focus:ring-0 text-on-surface transition-all" id="first_name" name="first_name" placeholder=" " type="text"
                {...register("fullName", {
                  required: 'username is required'
                })}
              />
              {errors.fullName && (<span className=' text-on-surface-variant font-label-lg transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-body-md peer-focus:top-1 peer-focus:text-label-sm peer-focus:text-primary-container peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-label-sm'>{errors.fullName.message}</span>)}
              <label className="absolute left-4 top-4 text-on-surface-variant font-label-lg transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-body-md peer-focus:top-1 peer-focus:text-label-sm peer-focus:text-primary-container peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-label-sm" htmlFor="first_name">Enter Full Name here...</label>
            </div>

            {/* Username Field */}
            <div className="relative group">
              <input className="peer w-full bg-surface-container-high border-outline/30 border rounded-lg px-4 pt-6 pb-2 focus:border-primary-container focus:ring-0 text-on-surface transition-all" id="first_name" name="first_name" placeholder=" " type="text"
                {...register('username', {
                  required: 'username is required'
                })}
              />
              {errors.username && (<span className=' text-on-surface-variant font-label-lg transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-body-md peer-focus:top-1 peer-focus:text-label-sm peer-focus:text-primary-container peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-label-sm'>{errors.username.message}</span>)}
              <label className="absolute left-4 top-4 text-on-surface-variant font-label-lg transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-body-md peer-focus:top-1 peer-focus:text-label-sm peer-focus:text-primary-container peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-label-sm" htmlFor="first_name">Enter username here...</label>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <div className="relative group">
                <input className="peer w-full bg-surface-container-high border-outline/30 border rounded-lg px-4 pt-6 pb-2 focus:border-primary-container focus:ring-0 text-on-surface transition-all" id="email" name="email" placeholder=" " type="email"
                  {...register('email', {
                    required: 'email is required'
                  })}
                />
                {errors.email && (<span className=' text-on-surface-variant font-label-lg transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-body-md peer-focus:top-1 peer-focus:text-label-sm peer-focus:text-primary-container peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-label-sm'>{errors.email.message}</span>)}
                <label className="absolute left-4 top-4 text-on-surface-variant font-label-lg transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-body-md peer-focus:top-1 peer-focus:text-label-sm peer-focus:text-primary-container peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-label-sm" htmlFor="email">Email address</label>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-label-sm">@gmail.com</div>
              </div>
            </div>

            {/* Password Section */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative group">
                  <input className="peer w-full bg-surface-container-high border-outline/30 border rounded-lg px-4 pt-6 pb-2 focus:border-primary-container focus:ring-0 text-on-surface transition-all" id="password" name="password" placeholder=" " type={showPassword ? "text" : "password"}
                    {...register('password', {
                      required: 'password is required',
                      minLength: {
                        value: 4,
                        message: 'password is short'
                      },
                      maxLength: {
                        value: 12,
                        message: "password is too long"
                      }
                    })}
                  />
                  {errors.password && (<span className=' text-on-surface-variant font-label-lg transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-body-md peer-focus:top-1 peer-focus:text-label-sm peer-focus:text-primary-container peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-label-sm'>{errors.password.message}</span>)}
                  <label className="absolute left-4 top-4 text-on-surface-variant font-label-lg transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-body-md peer-focus:top-1 peer-focus:text-label-sm peer-focus:text-primary-container peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-label-sm" htmlFor="password">Password</label>
                </div>

                <div className="relative group">
                  <input className="peer w-full bg-surface-container-high border-outline/30 border rounded-lg px-4 pt-6 pb-2 focus:border-primary-container focus:ring-0 text-on-surface transition-all" id="confirm_password" name="confirm_password" placeholder=" " type={showPassword ? "text" : "password"}
                    {...register('confirmPass', {
                      required: 'confirmation is required',
                      validate: (value) => {
                        return value === password || 'password do not match'
                      }
                    })}
                  />
                  {errors.confirmPass && (<span className=' text-on-surface-variant font-label-lg transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-body-md peer-focus:top-1 peer-focus:text-label-sm peer-focus:text-primary-container peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-label-sm'>{errors.confirmPass.message}</span>)}
                  <label className="absolute left-4 top-4 text-on-surface-variant font-label-lg transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-body-md peer-focus:top-1 peer-focus:text-label-sm peer-focus:text-primary-container peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-label-sm" htmlFor="confirm_password">Confirm</label>
                </div>
              </div>
              <p className="text-label-sm text-on-surface-variant px-1">Use 4 or more characters with a mix of letters</p>

              <label className="flex items-center gap-3 cursor-pointer group px-1">
                <div className="relative w-5 h-5">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={showPassword}
                    onChange={(e) => setShowPassword(e.target.checked)}
                  />

                  <div className="w-5 h-5 border-2 border-outline/50 rounded flex items-center justify-center transition-colors group-hover:border-primary-container peer-checked:bg-primary-container peer-checked:border-primary-container">
                    <span
                      className="material-symbols-outlined text-white text-[16px]"
                      style={{ fontVariationSettings: "'wght' 400" }}
                    >
                      {showPassword ? "check" : ""}
                    </span>
                  </div>
                </div>

                <span className="font-label-lg text-on-surface select-none">
                  Show password
                </span>
              </label>
            </div>

            {/* Footer Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 mt-4">
              <button className="text-primary-container font-headline-md hover:bg-primary-container/10 px-4 py-2 rounded-full transition-all active:scale-95" type="button"><Link to={'/login'}>Sign in instead</Link></button>
              <button className="bg-primary-container text-on-primary-container font-headline-md px-10 py-2.5 rounded-full hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary-container/20" type="submit">create</button>
            </div>
          </form>
        </div>
      </main>

      {/* Language & Links Footer */}
      <footer className="fixed bottom-0 left-0 w-full px-8 py-6 flex flex-col md:flex-row justify-between items-center text-label-sm text-on-surface-variant/60 gap-4">
        <div className="flex gap-6">
          <a className="hover:text-on-surface transition-colors" href="#">Help</a>
          <a className="hover:text-on-surface transition-colors" href="#">Privacy</a>
          <a className="hover:text-on-surface transition-colors" href="#">Terms</a>
        </div>
      </footer>
    </div>
  );
};

export default Signup;
