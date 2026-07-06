import React from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios'
import {Link,useNavigate} from 'react-router-dom'
import  {useDispatch,useSelector} from 'react-redux'
import { login,logout } from '../features/auth/authSlice.js';

const Login = () => {

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const loginAccount = async (data) =>{
    try {
      const response = await  axios.post('http://localhost:3000/api/v1/users/login',
         data,
        {
          withCredentials: true
        }
      )
      console.log(response.message);
      dispatch(login(response.data.data.user))
      navigate('/')
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
        <div className="w-full max-w-[450px] glass-panel rounded-xl p-8 md:p-10 shadow-2xl">

          <div className="flex justify-center items-center gap-1 mb-6">
            <span className="material-symbols-outlined text-primary-container text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
            <h1 className="font-headline-lg text-headline-lg tracking-tight text-on-surface">YouTube</h1>
          </div>

          <div className="flex flex-col justify-center items-center gap-1 mb-6">
            <h1 className='text-xl font-medium tracking-wide'>Sign in</h1>
            <p className='text-on-surface-variant font-label-lg transition-all text-sm'>continue to youtube</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(loginAccount)}>


            {/* Name Row */}
            <div className="relative group">
              <input className="peer w-full bg-surface-container-high border-outline/30 border rounded-lg px-4 pt-6 pb-2 focus:border-primary-container focus:ring-0 text-on-surface transition-all" id="first_name" name="first_name" placeholder=" " type="text"
                {...register("login", {
                  required: 'usernameOremail is required'
                })}
              />
              {errors.login && (<span className=' text-on-surface-variant font-label-lg transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-body-md peer-focus:top-1 peer-focus:text-label-sm peer-focus:text-primary-container peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-label-sm'>{errors.login.message}</span>)}
              <label className="absolute left-4 top-4 text-on-surface-variant font-label-lg transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-body-md peer-focus:top-1 peer-focus:text-label-sm peer-focus:text-primary-container peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-label-sm" htmlFor="first_name">Email or username</label>
            </div>

            {/* Password Section */}
            <div className="space-y-4">
            
                <div className="relative group">
                  <input className="peer w-full bg-surface-container-high border-outline/30 border rounded-lg px-4 pt-6 pb-2 focus:border-primary-container focus:ring-0 text-on-surface transition-all" id="password" name="password" placeholder=" "
                    {...register('password', {
                      required: 'password is required',
                    })}
                  />
                  {errors.password && (<span className=' text-on-surface-variant font-label-lg transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-body-md peer-focus:top-1 peer-focus:text-label-sm peer-focus:text-primary-container peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-label-sm'>{errors.password.message}</span>)}
                  <label className="absolute left-4 top-4 text-on-surface-variant font-label-lg transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-body-md peer-focus:top-1 peer-focus:text-label-sm peer-focus:text-primary-container peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-label-sm" htmlFor="password">Password</label>
                </div>             

              <label className="flex items-center gap-3 cursor-pointer group px-1">
                <span className='text-primary-container font-label-lg transition-all text-sm'>
                  Forget password?
                </span>
              </label>
            </div>

            {/* Footer Actions */}
            <div className='flex flex-col gap-1'>
              <p className='text-on-surface-variant transition-all text-xs'>Not your computer? Use Guest mode to sin in privately</p>
              <p className='text-primary-container font-label-lg transition-all text-xs'>Learn more.</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 mt-4">
              <button className="text-primary-container font-headline-md hover:bg-primary-container/10 px-4 py-2 rounded-full transition-all active:scale-95" type="button"><Link to={'/signup'}>don't have account ?</Link></button>
              <button className="bg-primary-container text-on-primary-container font-headline-md px-10 py-2.5 rounded-full hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary-container/20" type="submit">sign in</button>
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

export default Login;
