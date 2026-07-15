import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'


const UploadVideo = () => {

  const [videoFile, setvideoFile] = useState(null)
  const [fileName, setFileName] = useState('No video selected');
  const [isDragging, setIsDragging] = useState(false);
  const [fileSelected, setFileSelected] = useState(false);
  const [visibility, setVisibility] = useState(null);
  const [description, setDescription] = useState('');
  const fileInputRef = useRef(null);

  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const thumbnailInputRef = useRef(null);

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm()
  const isVisibility = watch('isPublished')

  const navigate = useNavigate()

  useEffect(() => {
    setVisibility(isVisibility)
    console.log(visibility);
    
  },[isVisibility])

  const handleFiles = (files) => {
    if (!files || !files.length) return;

    const file = files[0];
    setvideoFile(file)
    setFileName(file.name);
    setFileSelected(true);
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length) {
      handleFiles(e.dataTransfer.files);
    }
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleThumbnail = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setThumbnail(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const handleDragLeave = () => setIsDragging(false);

  const descCharCount = description.length;

  const uploadVideo = async (data) => { 
    try {
      data.isPublished = data.isPublished === 'true'

      const formData = new FormData()

      if(!videoFile) alert('video file is required')
      if(!thumbnail) alert('Thumbnail is required for ur video')

      formData.append('videoFile', videoFile)
      formData.append('thumbnail', thumbnail)
      formData.append('title', data.title)
      formData.append('description', data.description)
      formData.append('isPublished', data.isPublished)
     
      const response = await axios.post('http://localhost:3000/api/v1/videos/publish',
        formData,
        {
          withCredentials: true
        }
      )

       if(response) navigate('/')
    } catch (error) {
      console.log(error.response?.status);
      console.log(error.response?.data);
    }

  }

  return (
    <div className="bg-[#0F0F0F] text-on-surface min-h-screen py-12 px-4 md:px-8">
      <main className="max-w-4xl mx-auto space-y-10">

        {/* Header */}
        <header className="space-y-2 border-b border-outline-variant/20 pb-8">
          <h1 className="font-headline-lg text-[44px] font-extrabold text-on-surface tracking-tighter uppercase">Upload Video</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">Upload a new video to your channel</p>
        </header>

        <form className='space-y-8' onSubmit={handleSubmit(uploadVideo)}  >
          {/* Drag & Drop Zone */}
          <section className="relative">
            <div
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`w-full min-h-[320px] flex flex-col items-center justify-center p-8 cursor-pointer rounded-2xl transition-all duration-300 group
              ${isDragging ? 'bg-surface-container' : 'hover:bg-surface-container'}
            `}
              style={{
                backgroundImage: isDragging
                  ? `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='16' ry='16' stroke='%23FF5540FF' stroke-width='3' stroke-dasharray='10%2c 10' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`
                  : `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='16' ry='16' stroke='%23333535FF' stroke-width='3' stroke-dasharray='10%2c 10' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
                borderRadius: '16px',
              }}
            >
              <div className="bg-surface-container-highest rounded-full p-6 mb-6 group-hover:scale-110 transition-transform duration-300">
                {fileSelected ? (
                  <span className="material-symbols-outlined text-secondary text-5xl" style={{ fontVariationSettings: "'wght' 300" }}>check_circle</span>
                ) : (
                  <span className="material-symbols-outlined text-primary text-5xl" style={{ fontVariationSettings: "'wght' 300" }}>cloud_upload</span>
                )}
              </div>
              <h3 className="font-headline-lg text-headline-lg mb-2">
                {fileSelected ? 'File Selected' : 'Drag & drop your video here'}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                or <span className="text-primary font-bold">click to browse</span>
              </p>
              <input
                accept="video/*"
                className="hidden"
                ref={fileInputRef}
                type="file"
                onChange={(e) => { if (e.target.files.length) handleFiles(e.target.files); }}
              />
            </div>
          </section>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Left: Form */}
            <div className="lg:col-span-2 space-y-10">

              {/* Thumbnail */}
              <section className="space-y-4">
                <h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">
                    image
                  </span>
                  Thumbnail
                </h2>

                <div className="flex flex-col sm:flex-row gap-6 items-start">

                  {/* Thumbnail Preview */}
                  <div
                    onClick={() => thumbnailInputRef.current?.click()}
                    className="w-full sm:w-48 aspect-video rounded-lg overflow-hidden relative group cursor-pointer border border-white/10"
                  >
                    {thumbnailPreview ? (
                      <img
                        src={thumbnailPreview}
                        alt="Thumbnail Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
                          <span className="material-symbols-outlined text-4xl opacity-60">
                            add_photo_alternate
                          </span>
                        </div>
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
              </section>

              {/* Details Form */}
              <section className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <label className="font-label-lg text-label-lg text-on-surface block px-1" htmlFor="title">Video Title</label>
                  <input
                    id="title"
                    type="text"
                    placeholder="Add a title that describes your video"
                    className="w-full p-4 rounded-lg font-body-lg text-body-lg text-on-surface focus:outline-none transition-all duration-200"
                    style={{
                      backgroundColor: '#212121',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                    onFocus={(e) => { e.target.style.borderColor = '#ff5540'; e.target.style.boxShadow = '0 0 0 2px rgba(255,85,64,0.2)'; }}
                    onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
                    {...register('title', {
                      required: 'title is required'
                    })}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.title.message}
                    </p>
                  )}
                </div>
                {/* Description */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <label className="font-label-lg text-label-lg text-on-surface block" htmlFor="description">Description</label>
                    {/* <span className={`text-label-sm ${descCharCount > 5000 ? 'text-error' : 'text-on-surface-variant'}`}>{descCharCount}/5000</span> */}
                  </div>
                  <textarea
                    id="description"
                    rows={8}
                    placeholder="Tell viewers about your video"
                    // value={description}
                    // onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-4 rounded-lg font-body-md text-body-md text-on-surface resize-none focus:outline-none transition-all duration-200"
                    style={{
                      backgroundColor: '#212121',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                    onFocus={(e) => { e.target.style.borderColor = '#ff5540'; e.target.style.boxShadow = '0 0 0 2px rgba(255,85,64,0.2)'; }}
                    onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
                    {...register('description', {
                      required: 'desscription is required'
                    })}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.description.message}
                    </p>
                  )}
                </div>
              </section>

              {/* Visibility */}
              <section className="space-y-4">
                <h2 className="font-headline-md text-headline-md text-on-surface">Visibility</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Public */}
                  <label
                    className={`relative flex items-center p-4 rounded-lg cursor-pointer transition-colors hover:bg-surface-container ${isVisibility ? 'border-primary' : ''}`}
                    style={{
                      backgroundColor: '#212121',
                      border: `1px solid ${isVisibility ? '#ffb4a8' : 'rgba(255,255,255,0.1)'}`,
                    }}
                  >
                    <input
                      type="radio"
                      value='true'
                      {...register("isPublished", {
                        required: "Visibility is required",
                      })}
                      className="w-5 h-5 text-primary bg-surface-container-highest border-outline focus:ring-primary"
                    />
                    {errors.isPublished && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors.isPublished.message}
                      </p>
                    )}
                    <div className="ml-4">
                      <span className="block font-label-lg text-label-lg text-on-surface">Public</span>
                      <span className="block text-label-sm text-on-surface-variant">Everyone can watch your video</span>
                    </div>
                  </label>
                  {/* Private */}
                  <label
                    className={`relative flex items-center p-4 rounded-lg cursor-pointer transition-colors hover:bg-surface-container`}
                    style={{
                      backgroundColor: '#212121',
                      border: `1px solid ${isVisibility ? '#ffb4a8' : 'rgba(255,255,255,0.1)'}`,
                    }}
                  >
                    <input
                      type="radio"
                      value='false'
                      {...register("isPublished", {
                        required: "Visibility is required",
                      })}
                      className="w-5 h-5 text-primary bg-surface-container-highest border-outline focus:ring-primary"
                    />
                    {errors.isPublished && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors.isPublished.message}
                      </p>
                    )}
                    <div className="ml-4">
                      <span className="block font-label-lg text-label-lg text-on-surface">Private</span>
                      <span className="block text-label-sm text-on-surface-variant">Only you can see your video</span>
                    </div>
                  </label>
                </div>
              </section>

            </div>

            {/* Right: Review Summary */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="bg-surface-container p-6 rounded-xl space-y-6" style={{ border: '1px solid rgba(96,62,57,0.1)' }}>
                  <h3 className="font-headline-md text-headline-md text-on-surface">Review Summary</h3>

                  {/* Preview Image */}
                  <div className="aspect-video w-full rounded-lg overflow-hidden bg-surface-container-lowest" style={{ border: '1px solid rgba(96,62,57,0.05)' }}>
                    <img
                      className="w-full h-full object-cover"
                      alt="Preview"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDiLw_G-smJ5fv35OqColdbXJ8orRQSdvfccVJyuS3nXc5RuMuqQnwhMCkSgDrwuqJOlD2f1WJ2NrKoZvCbDU1AnvaDAMi1-fu_GSeZaic0qTrArA5338wq-k1t_3C28u6XY9F8_KC_e-J0y07-4OoOrctP7i7sCEH2zghT8E_jfwiHELloiowuu6Ocmn98sPByzfjbhyCFeyhbbqRVAzzgRw9iZ3I6HBXh-xBWitXh8ILQTlLrznA"
                    />
                  </div>

                  {/* Details */}
                  <div className="space-y-4 pt-4" style={{ borderTop: '1px solid rgba(96,62,57,0.1)' }}>
                    <div className="flex justify-between items-start gap-4">
                      <span className="text-label-sm text-on-surface-variant uppercase tracking-wider">File Name</span>
                      <span className="text-label-sm text-on-surface text-right truncate max-w-[120px]">{fileSelected ? fileName : 'waiting...'}</span>
                    </div>
                    <div className="flex justify-between items-start gap-4">
                      <span className="text-label-sm text-on-surface-variant uppercase tracking-wider">Thumbnail</span>
                      <span className="text-label-sm text-on-surface text-right">{thumbnail ? `${thumbnail.name.slice(0, 8)}...` : "Default.jpg"}</span>
                    </div>
                    <div className="flex justify-between items-start gap-4">
                      <span className="text-label-sm text-on-surface-variant uppercase tracking-wider">Visibility</span>
                      <span className="text-label-sm text-on-surface text-right capitalize">{visibility ? 'public' : 'private'}</span>
                    </div>
                  </div>

                  {/* Status badge */}
                  <div className="flex items-center gap-2 px-3 py-2 rounded-full w-fit" style={{ backgroundColor: 'rgba(255,85,64,0.1)', border: '1px solid rgba(255,85,64,0.2)' }}>
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    <span className="text-label-sm text-primary font-bold uppercase tracking-widest">Ready to upload</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>


          {/* Footer Actions */}
          <footer className="pt-12 flex flex-col sm:flex-row justify-end items-center gap-4">
            <button
              onClick={() => navigate('/profile')}
              type='button'
              className="w-full sm:w-auto px-8 py-3 rounded-full text-on-surface font-bold hover:bg-surface-container-highest transition-colors active:scale-95 duration-150">
              Cancel
            </button>
            <button
              type='submit'
              className="w-full sm:w-auto px-10 py-3 rounded-full bg-primary text-on-primary font-bold shadow-lg hover:opacity-90 active:scale-95 transition-all duration-150"
              style={{ boxShadow: '0 4px 20px rgba(255,181,168,0.2)' }}>
              Upload Video
            </button>
          </footer>
        </form>

      </main>
    </div>
  );
};

export default UploadVideo;
