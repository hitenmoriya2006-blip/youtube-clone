import React, { useState } from 'react';

const EditVideoDetails = () => {
  const [title, setTitle] = useState('Deep Dive: Building Neural Interfaces with Nexus Core v2');
  const [description, setDescription] = useState(
    `In this comprehensive guide, we explore the latest updates to the Nexus Core API. We'll walk through the implementation of ultra-low latency synaptic feedback loops and how to optimize neural bandwidth for consumer-grade wearables.

The session covers:
- Core architecture overhaul in v2
- Low-latency feedback mechanisms
- Optimization techniques for wearables
- Security protocols in neural data streaming`
  );
  const [isPublic, setIsPublic] = useState(true);
  const [selectedThumb, setSelectedThumb] = useState(1);
  const [copied, setCopied] = useState(false);

  const charCount = description.length;

  const handleCopy = () => {
    navigator.clipboard.writeText('https://nexus.tech/v/nxc_v2_core_deepdive');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const thumbnails = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDPSZLPkrcmWwyvccz7vP5WjLNGHyeKnSP-xYxlddrua8rgiYYmxSQa60QtKmccIVuT2k4y34p2a2xyrEBRX-92m1iBEI0TvrNhaRQH5PSRrWVU-poo7WP9xYudke_Bp6iDshbNV8q00s09oc5f-hrGDzWIKQv9MFJ0z-0NWZRmq5p6LSk2XnCR5X5nJoxE_T_eJZEi_Y8qGDvGG1Y3P-PFdaY-E8feEiWR3xksRCsZFjydmabnJOw',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAoWezH4yzwNV_Tj74le8q03Sc859DHrzG_faYG5UFJGRvN5fQGl9v-5yRATOR7IZBPNyxkOljsd5IJ6L6u1IgWu7u4_9v_U53NRWx5pIZr5co_t8FnZwBedJ8My3q_QkNKxjSiG-yemNEP9VtX5C2_oe-rZm-TufGJCV0iWeFtzfAVk6QjaIRfnu_E3unxY_ySyMUkOS0T2eEqHzGC5AuCh4djldYXJJMVgnQHtjQxgc6ouBnFeq0',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDFWnB-ybq8GeTWs6J8CMPPlCjPc89meqMIuhSW3XCpiQif_GOe3JbE9_lbY1Ernx4LULDTTVf8n_CqzsmLpQYHFFp-a--XVExqwiPeO8uyLatYqThXqLcwK1R8bOgCilbab0KRZ9u3UsE2-vwye4elcCLdDUGUE8-BPLhHOHiys_vaLUjQoU1Nyi-Rst-l5QoKNpH2GGNEwI52LtK1xf52pT60pXCeFxOQNgsO5iSWY6BlDkrN6vY',
  ];

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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* ── LEFT COLUMN: Primary Details ── */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">

            {/* Title */}
            <div className="bg-surface-container p-6 rounded-lg border border-outline-variant/10">
              <label className="block text-label-sm text-primary-container mb-2 font-bold uppercase tracking-wider">
                Title (required)
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add a title that describes your video"
                className="w-full bg-surface-container-high border-2 border-transparent focus:border-primary-container focus:ring-0 rounded-lg py-3 px-4 text-body-lg font-bold text-on-surface transition-all outline-none"
              />
            </div>

            {/* Description */}
            <div className="bg-surface-container p-6 rounded-lg border border-outline-variant/10 relative">
              <label className="block text-label-sm text-on-surface-variant mb-2 font-bold uppercase tracking-wider">
                Description
              </label>
              <textarea
                rows={12}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell viewers about your video"
                className="w-full bg-surface-container-high border-2 border-transparent focus:border-primary-container focus:ring-0 rounded-lg py-3 px-4 text-body-md text-on-surface transition-all resize-none outline-none"
              />
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
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Upload button */}
                <button className="aspect-video bg-surface-container-high border-2 border-dashed border-outline-variant rounded-lg flex flex-col items-center justify-center gap-2 hover:border-primary-container hover:bg-surface-container-highest transition-all group">
                  <span className="material-symbols-outlined text-3xl text-on-surface-variant group-hover:text-primary-container">add_photo_alternate</span>
                  <span className="text-label-sm text-on-surface-variant group-hover:text-on-surface">Upload Thumbnail</span>
                </button>

                {/* Thumbnail options */}
                {thumbnails.map((src, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedThumb(idx)}
                    className={`aspect-video rounded-lg overflow-hidden border-2 relative group cursor-pointer transition-all ${
                      selectedThumb === idx ? 'border-primary-container' : 'border-transparent hover:border-outline-variant'
                    }`}
                  >
                    <img className="w-full h-full object-cover" alt={`Video frame ${idx + 1}`} src={src} />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="material-symbols-outlined text-white">check_circle</span>
                    </div>
                    {selectedThumb === idx && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN: Sticky Preview & Controls ── */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6 lg:sticky lg:top-6">

            {/* Video Preview Card */}
            <div className="bg-surface-container rounded-lg overflow-hidden border border-outline-variant/10">
              <div className="aspect-video bg-black relative group">
                <img
                  className="w-full h-full object-cover"
                  alt="Main Preview"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5p3DBJyMlVipym_hpUgBd3TL6cxXcdrql_393Dag-n027UHHWbnhAZcQWhF-Zq3bcr3xLFZpJRDHMeFNGf6iY_xKkwz7wpraVyMtpMXkh2gcO1RfWiacywlyoWO6dKvdOuxFteeaM_UxwzSJ3FMqFSMs2LDy9l9ODz1RvoVF-HrnH8hCUeAhD_nX2QWf0RrJMcgy2VSxZKq5LQDm5RF7EQrFXN0ZaUQvxHNpc47yfxwGtf56WTm8"
                />
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
                      https://nexus.tech/v/nxc_v2_core_deepdive
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
                <div>
                  <p className="text-label-sm text-on-surface-variant font-bold uppercase mb-1">Filename</p>
                  <p className="text-on-surface text-body-md truncate">nexus_core_deepdive_v2_final_render.mp4</p>
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
                    checked={isPublic}
                    onChange={() => setIsPublic(!isPublic)}
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

            {/* Metadata Score Card */}
            <div className="bg-surface-container p-6 rounded-lg border border-outline-variant/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-label-lg text-on-surface font-bold">Metadata Score</h3>
                <span className="px-2 py-1 bg-primary-container/20 text-primary-container text-[10px] font-bold rounded uppercase">
                  Excellent
                </span>
              </div>
              <div className="h-2 bg-surface-container-high rounded-full overflow-hidden mb-6">
                <div className="h-full bg-primary-container rounded-full transition-all duration-500" style={{ width: '85%' }}></div>
              </div>
              <ul className="space-y-3">
                {[
                  'Optimized title length',
                  'Detailed description provided',
                  'High-res thumbnail selected',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-label-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-primary-container text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 pt-2">
              <button className="w-full py-3 rounded-xl font-label-lg text-label-lg bg-primary-container text-on-primary-container font-bold hover:brightness-110 transition-all active:scale-95 flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">save</span>
                Save Changes
              </button>
              <button className="w-full py-3 rounded-xl font-label-lg text-label-lg text-on-surface-variant border border-outline-variant hover:bg-surface-container-high transition-colors">
                Cancel
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default EditVideoDetails;
