import React, { useState, useEffect, useRef } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { toast } from 'sonner'
import api from '@/api/axios';

const EditVideoDetails = () => {

  const [videoData, setVideoData] = useState()
  const { register, handleSubmit, reset, formState: { errors, dirtyFields }, watch } = useForm()
  const { videoId } = useParams()
  const isPublic = watch('isPublished')
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [uploading, setUploading] = useState(false)
  const thumbnailInputRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate()

  const charCount = ''

  useEffect(() => {

    const fetchVideoData = async () => {
      try {
        const response = await api.get(`/videos/get/${videoId}`,
          {
            withCredentials: true
          }
        )

        if (response) {
          setVideoData(response.data.data)
          setTitle(response.data.data?.title)
          setDescription(response.data.data?.description)
        }
      } catch (error) {
        console.log(error.response?.status);
        console.log(error.response?.data);
      }
    }

    fetchVideoData()
  }, [])

  const handleThumbnail = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setThumbnail(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    if (videoData) {
      reset({
        title: videoData?.title,
        description: videoData?.description,
        isPublished: videoData?.isPublished,
      })
    }
  }, [videoData, reset])

  const handleCopy = () => {
    navigator.clipboard.writeText('https://nexus.tech/v/nxc_v2_core_deepdive');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const updateVideoInfo = async (data) => {
    try {
      setUploading(true)

      const formData = new FormData()

      if (dirtyFields.title) {
        formData.append('title', data.title)
      }

      if (dirtyFields.description) {
        formData.append('description', data.description)
      }

      if (thumbnail) {
        formData.append('thumbnail', thumbnail)
      }
      if (dirtyFields.isPublished) {
        formData.append('isPublished', data.isPublished)
      }

      const hasVideoInfoChanged = dirtyFields.title || dirtyFields.description || thumbnail

      if (hasVideoInfoChanged) {
        await api.patch(`/videos/update/${videoId}`,
          formData,
          {
            withCredentials: true
          }
        )
      }

      if (dirtyFields.isPublished) {
        await api.patch(`/videos/toggle/${videoId}`,
          {},
          {
            withCredentials: true
          }
        )
      }

      toast.success("Video updated successfully");
      navigate('/profile')

    } catch (error) {
      console.log(error.response?.status);
      console.log(error.response?.data);
      toast.error(error.response?.data?.message)
    } finally {
      setUploading(false)
    }
  }

  if (uploading) {
    return <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
        <div className="w-[360px] rounded-2xl bg-[#1f1f1f] border border-zinc-700 p-8 flex flex-col items-center">

          <div className="w-14 h-14 rounded-full border-[4px] border-red-600 border-t-transparent animate-spin"></div>

          <h2 className="mt-6 text-xl font-semibold text-white">
            updating Video ..
          </h2>

          <p className="mt-2 text-sm text-zinc-400 text-center leading-6">
            Please wait while your video is being updating.
            <br />
            This may take a few moments.
          </p>
        </div>
      </div>
    </>
  }

  return (
    <div className="bg-surface-container-lowest min-h-screen text-on-surface font-body-md text-body-md overflow-y-auto">
      <div className="max-w-[1600px] mx-auto px-4 md:px-10 py-8">

        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">Video Details</h2>
          <div className="flex items-center gap-4">
            <button className="px-6 py-2 rounded-full font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container-high transition-colors">
              Undo
            </button>
            <button className="px-8 py-2 rounded-full font-label-lg text-label-lg bg-primary-container text-on-primary-container font-bold hover:brightness-110 transition-all active:scale-95 shadow-lg">
              Save
            </button>
          </div>
        </div>

        {/* Split Pane Grid */}
        <form onSubmit={handleSubmit(updateVideoInfo)}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* ── LEFT COLUMN: Primary Details ── */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-6">

              {/* Title */}
              <div className="bg-surface-container p-6 rounded-lg border border-outline-variant/10">
                <label className="block text-label-sm text-primary-container mb-2 font-bold uppercase tracking-wider">
                  Title
                </label>
                <input
                  type="text"
                  {...register('title')}
                  placeholder="Add a title that describes your video"
                  className="w-full bg-surface-container-high border-2 border-transparent focus:border-primary-container focus:ring-0 rounded-lg py-3 px-4 text-body-lg font-bold text-on-surface transition-all outline-none"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="bg-surface-container p-6 rounded-lg border border-outline-variant/10 relative">
                <label className="block text-label-sm text-on-surface-variant mb-2 font-bold uppercase tracking-wider">
                  Description
                </label>
                <textarea
                  rows={12}
                  {...register('description')}
                  placeholder="Tell viewers about your video"
                  className="w-full bg-surface-container-high border-2 border-transparent focus:border-primary-container focus:ring-0 rounded-lg py-3 px-4 text-body-md text-on-surface transition-all resize-none outline-none"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.title.message}
                  </p>
                )}
                <div className="mt-2 text-right">
                  <span className={`text-label-sm ${charCount > 4500 ? 'text-error' : 'text-on-surface-variant'}`}>
                    {charCount} / 5000
                  </span>
                </div>
              </div>

              {/* Thumbnail */}
              <div className="bg-surface-container p-6 rounded-lg border border-outline-variant/10">
                <label className="block text-label-sm text-on-surface-variant mb-2 font-bold uppercase tracking-wider">
                  Thumbnail
                </label>
                <p className="text-label-sm text-on-surface-variant mb-4">
                  Select or upload a picture that shows what's in your video. A good thumbnail stands out and draws viewers' attention.
                </p>
                <div className="flex gap-6">
                  {/* Upload button */}
                  <div
                    onClick={() => thumbnailInputRef.current?.click()}
                    className="w-full sm:w-48 aspect-video rounded-lg overflow-hidden relative group cursor-pointer "
                  >
                    {thumbnailPreview ? (
                      <img
                        src={thumbnailPreview}
                        alt="Thumbnail Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <>
                        <button className="aspect-video bg-surface-container-high border-2 border-dashed border-outline-variant rounded-lg flex flex-col items-center justify-center w-full h-full gap-2 hover:border-primary-container hover:bg-surface-container-highest transition-all group">
                          <span className="material-symbols-outlined text-3xl text-on-surface-variant group-hover:text-primary-container">add_photo_alternate</span>
                          <span className="text-label-sm text-on-surface-variant group-hover:text-on-surface">Upload Thumbnail</span>
                        </button>
                      </>
                    )}
                  </div>

                  {/* Thumbnail Info */}
                  <div className="flex-1 space-y-2">

                    <p className="font-semibold">
                      {thumbnail ? thumbnail.name : "No thumbnail selected"}
                    </p>

                    <p className="text-sm text-zinc-400">
                      Select a thumbnail that best represents your video.
                    </p>

                    <button
                      type="button"
                      onClick={() => thumbnailInputRef.current?.click()}
                      className="px-4 py-2 rounded-lg border border-white/10 hover:border-white/30"
                    >
                      Choose Thumbnail
                    </button>

                    <input
                      ref={thumbnailInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnail}
                      className="hidden"
                    />
                  </div>

                </div>
              </div>
            </div>

            {/* ── RIGHT COLUMN: Sticky Preview & Controls ── */}
            <div className="lg:col-span-5 xl:col-span-4 space-y-6 lg:sticky lg:top-6">

              {/* Video Preview Card */}
              <div className="bg-surface-container rounded-lg overflow-hidden border border-outline-variant/10">
                <div className="aspect-video bg-black relative group">
                  {
                    thumbnailPreview ? <img src={thumbnailPreview} alt="" />
                      :
                      ''
                  }
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="w-14 h-14 bg-black/60 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-white text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                    </button>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase tracking-tighter">
                    Preview Mode
                  </div>
                </div>
                <div className="p-4 bg-surface-container-low">
                  <div className="mb-4">
                    <p className="text-label-sm text-on-surface-variant font-bold uppercase mb-1">Video Link</p>
                    <div className="flex items-center justify-between gap-2">
                      <a href="#" className="text-primary truncate font-medium hover:underline text-sm">
                        {videoData?.videoFile}
                      </a>
                      <button
                        onClick={handleCopy}
                        className="p-1.5 hover:bg-surface-container-high rounded-full transition-colors flex-shrink-0"
                        title="Copy link"
                      >
                        <span className="material-symbols-outlined text-on-surface-variant text-sm">
                          {copied ? 'check' : 'content_copy'}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visibility Card */}
              <div className="bg-surface-container p-6 rounded-lg border border-outline-variant/10">
                <h3 className="text-label-lg text-on-surface font-bold mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary-container">visibility</span>
                  Visibility
                </h3>
                <div className="flex items-center justify-between py-2">
                  <div className="flex flex-col">
                    <span className="text-body-md font-bold text-on-surface">
                      {isPublic ? 'Public' : 'Private'}
                    </span>
                    <span className="text-label-sm text-on-surface-variant">
                      {isPublic ? 'Everyone can see your video' : 'Only you can see your video'}
                    </span>
                  </div>
                  {/* Toggle switch */}
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      {...register('isPublished')}
                    />
                    <div className="w-11 h-6 bg-surface-container-highest rounded-full peer
                    peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full
                    peer-checked:after:border-white
                    after:content-[''] after:absolute after:top-[2px] after:start-[2px]
                    after:bg-white after:border-gray-300 after:border after:rounded-full
                    after:h-5 after:w-5 after:transition-all
                    peer-checked:bg-primary-container">
                    </div>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 pt-2">
                <button
                  type='submit'
                  className="w-full py-3 rounded-xl font-label-lg text-label-lg bg-primary-container text-on-primary-container font-bold hover:brightness-110 transition-all active:scale-95 flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined">save</span>
                  Save Changes
                </button>
                <button
                  type='button'
                   onClick={() => navigate('/profile')}
                  className="w-full py-3 rounded-xl font-label-lg text-label-lg text-on-surface-variant border border-outline-variant hover:bg-surface-container-high transition-colors">
                  Cancel
                </button>
              </div>

            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditVideoDetails;
