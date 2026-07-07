import React, { useState } from 'react';

const Watch = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  return (
    <div className="font-body-lg text-on-surface bg-surface h-screen overflow-y-auto">
      {/* TopNavBar */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 h-14 md:h-16 bg-surface border-b border-outline-variant/10">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-surface-variant rounded-full transition-colors active:scale-95 duration-150">
            <span className="material-symbols-outlined text-on-surface">menu</span>
          </button>
          <div className="flex items-center gap-1 cursor-pointer">
            <span className="material-symbols-outlined text-primary-container text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
            <span className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tighter">YouTube</span>
          </div>
        </div>
        <div className="hidden md:flex flex-1 max-w-2xl px-8">
          <div className="flex w-full">
            <div className="flex flex-1 bg-surface-container-high rounded-l-full border border-outline-variant px-4 py-1.5 focus-within:border-primary transition-colors">
              <input className="bg-transparent border-none focus:outline-none focus:ring-0 w-full text-on-surface text-body-lg" placeholder="Search" type="text" />
            </div>
            <button className="bg-surface-container-highest border border-l-0 border-outline-variant px-5 rounded-r-full hover:bg-surface-variant transition-colors">
              <span className="material-symbols-outlined">search</span>
            </button>
          </div>
          <button className="ml-4 p-2 bg-surface-container-high rounded-full hover:bg-surface-variant transition-colors">
            <span className="material-symbols-outlined">mic</span>
          </button>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <button className="p-2 hover:bg-surface-variant rounded-full transition-colors active:scale-95">
            <span className="material-symbols-outlined">video_call</span>
          </button>
          <button className="p-2 hover:bg-surface-variant rounded-full transition-colors active:scale-95">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <div className="w-8 h-8 rounded-full overflow-hidden ml-2 cursor-pointer">
            <img className="w-full h-full object-cover" alt="User profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDae_aOV2_hFainTRVkR2sZsagVxdeVAm97HvPO3Ozc_gZ97sHzQZha2NDera4wu20gYxnlo6-jWKldEOyfXyOoJARHldGssUHetluurZSensBpnEhmYlQFz_BxJlSG64LkZ3dNCVrZRMfe8tb5dPx_2z1Ly7o8sfKknlVOnqwXr0k0atA1oxsh0-YUJY8SxAUG0_-yXGxeGyRyGTleb1vwcw3j7AEVXp0nfr9NN4CNUL4JgH2qjWQ" />
          </div>
        </div>
      </header>

      {/* SideNavBar (Minimized for Watch Page) */}
      <aside className="hidden md:flex flex-col fixed left-0 top-16 bottom-0 w-16 p-2 space-y-4 z-40 bg-surface overflow-y-hidden">
        <div className="flex flex-col items-center gap-1 p-2 bg-surface-container-highest text-on-surface font-bold rounded-lg cursor-pointer">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
          <span className="text-[10px] font-label-sm">Home</span>
        </div>
        <div className="flex flex-col items-center gap-1 p-2 text-on-surface hover:bg-surface-container-high rounded-lg cursor-pointer transition-all">
          <span className="material-symbols-outlined">play_circle</span>
          <span className="text-[10px] font-label-sm">Shorts</span>
        </div>
        <div className="flex flex-col items-center gap-1 p-2 text-on-surface hover:bg-surface-container-high rounded-lg cursor-pointer transition-all">
          <span className="material-symbols-outlined">subscriptions</span>
          <span className="text-[10px] font-label-sm">Subs</span>
        </div>
        <div className="flex flex-col items-center gap-1 p-2 text-on-surface hover:bg-surface-container-high rounded-lg cursor-pointer transition-all">
          <span className="material-symbols-outlined">video_library</span>
          <span className="text-[10px] font-label-sm">Library</span>
        </div>
      </aside>

      {/* Main Content Grid */}
      <main className="pt-14 md:pt-16 md:ml-16 min-h-screen">
        <div className="max-w-[1700px] mx-auto flex flex-col lg:flex-row gap-6 p-4 lg:p-6">
          {/* Video Section */}
          <div className="flex-1 lg:max-w-[calc(100%-400px)]">
            {/* Video Player */}
            <div className="relative aspect-video bg-black rounded-xl overflow-hidden group cursor-pointer shadow-2xl">
              <img className="w-full h-full object-cover opacity-80" alt="Video Player" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXoXsaRy-3SMI0FEMwlzC81U97IUBWaWSv1dbRIPwGlUEce5Zy4cIW4KdrL8WfxGlTwVIFLrjWLczElqZInhImJYnMqDeOrHjiI6PJ2RCX90ZUPS_qE-WK3N7P58jmbLWp4kLpjqNVBQVtzaCFiSQujnX2KU84QhM8diiRWiGaez24AfAaNgH68PC7vhx_wgfarBM7EYtl-3076bbPu7r6_uA3tTjDVw0N78PraZGFtRtwrAIXBgg" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity scale-125">
                  <span className="material-symbols-outlined text-white text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                </div>
              </div>
              {/* Mock Player Controls Overlay */}
              <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
                <div className="h-1 bg-white/30 rounded-full mb-4 overflow-hidden">
                  <div className="h-full bg-primary-container w-1/3"></div>
                </div>
                <div className="flex justify-between items-center text-white">
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined cursor-pointer">play_arrow</span>
                    <span className="material-symbols-outlined cursor-pointer">skip_next</span>
                    <span className="material-symbols-outlined cursor-pointer">volume_up</span>
                    <span className="text-label-sm">12:34 / 45:10</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined cursor-pointer">settings</span>
                    <span className="material-symbols-outlined cursor-pointer">picture_in_picture_alt</span>
                    <span className="material-symbols-outlined cursor-pointer">fullscreen</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Metadata */}
            <div className="mt-4">
              <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold leading-tight">
                Building the Ultimate $20,000 Quantum-Grade Workstation
              </h1>
              <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container">
                    <img className="w-full h-full object-cover" alt="Nexus Tech Lab Logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeoYmqRcMEN2vhH9hqNuMuAEcTUMsj8er7YZ0PKkFUT2t0v8rIwC4Y_yzv7l8_Y6oWw-L_zQCUPGGQRCasQ1weew-vwBB9BFwMou8zZZ28a4uxtZa76uRD0YIyupdspcS5cc66j8EuLVnb5JILbRdYz3l1qfrOnehLRUNHeHHO120jbdtf8sLz2Fn3v-W9hyv63IS_EvUsAXMay8rQUHlimndkEBFZmsGxOycLrcsz0WqsdPFolTs" />
                  </div>
                  <div>
                    <h3 className="font-headline-md text-headline-md">Nexus Tech Lab</h3>
                    <p className="text-label-sm text-on-surface-variant">124K subscribers</p>
                  </div>
                  <button
                    onClick={() => setIsSubscribed(!isSubscribed)}
                    className={`ml-4 px-4 py-2 rounded-full font-bold text-label-lg transition-all active:scale-95 ${
                      isSubscribed
                        ? 'bg-surface-container-high text-on-surface-variant'
                        : 'bg-on-surface text-surface hover:opacity-90'
                    }`}
                  >
                    {isSubscribed ? 'Subscribed' : 'Subscribe'}
                  </button>
                  <button className="px-4 py-2 bg-surface-container-high text-on-surface rounded-full font-bold text-label-lg hover:bg-surface-variant transition-colors active:scale-95">
                    Join
                  </button>
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                  <div className="flex items-center bg-surface-container-high rounded-full">
                    <button
                      onClick={() => {
                        setIsLiked(!isLiked);
                        if (isDisliked) setIsDisliked(false);
                      }}
                      className={`flex items-center gap-2 px-4 py-2 border-r border-outline-variant hover:bg-surface-variant transition-colors rounded-l-full ${
                        isLiked ? 'text-primary-container' : ''
                      }`}
                    >
                      <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: isLiked ? "'FILL' 1" : "'FILL' 0" }}>thumb_up</span>
                      <span className="text-label-lg font-bold">12K</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsDisliked(!isDisliked);
                        if (isLiked) setIsLiked(false);
                      }}
                      className={`px-4 py-2 hover:bg-surface-variant transition-colors rounded-r-full ${
                        isDisliked ? 'text-primary-container' : ''
                      }`}
                    >
                      <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: isDisliked ? "'FILL' 1" : "'FILL' 0" }}>thumb_down</span>
                    </button>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-high rounded-full hover:bg-surface-variant transition-colors active:scale-95 shrink-0">
                    <span className="material-symbols-outlined">share</span>
                    <span className="text-label-lg font-bold">Share</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-high rounded-full hover:bg-surface-variant transition-colors active:scale-95 shrink-0">
                    <span className="material-symbols-outlined">download</span>
                    <span className="text-label-lg font-bold">Download</span>
                  </button>
                  <button className="p-2 bg-surface-container-high rounded-full hover:bg-surface-variant transition-colors active:scale-95 shrink-0">
                    <span className="material-symbols-outlined">more_horiz</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-4 p-3 bg-surface-container-low rounded-xl cursor-pointer hover:bg-surface-container transition-colors group">
              <div className="flex gap-2 text-label-lg font-bold mb-1">
                <span>482,910 views</span>
                <span>Oct 24, 2023</span>
                <span className="text-on-surface-variant">#quantumtech #pcbuilding #nexuslab</span>
              </div>
              <div className="text-body-md leading-relaxed">
                Today we're pushing the boundaries of what's possible in a consumer workstation. This $20,000 monster features custom-engineered liquid cooling and dual-socket enterprise CPUs optimized for quantum simulation workloads. We'll be walking through the entire assembly process...
              </div>
              <button className="mt-2 text-label-lg font-bold text-on-surface group-hover:underline">Show more</button>
            </div>

            {/* Comments Section */}
            <div className="mt-6">
              <div className="flex items-center gap-6 mb-6">
                <h2 className="font-headline-lg text-headline-lg">1,245 Comments</h2>
                <button className="flex items-center gap-2">
                  <span className="material-symbols-outlined">sort</span>
                  <span className="text-label-lg font-bold">Sort by</span>
                </button>
              </div>
              {/* Add Comment */}
              <div className="flex gap-4 mb-8">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container-highest flex-shrink-0">
                  <img className="w-full h-full object-cover" alt="User Profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXkFOYBPyDPAo3842MWjSbfLMfiThYD1x92WpkYJcS9NNEkxyrA5z-W1WCpLowWRa4HBFo2kH6y9wIlzytAVZVS3Q3QjUXiyv2-1m8trNj4-5LvJ-_z2BJ_b_Y7146H4B70z5m89ryp_pzYN7lmlUOyj5xpddnS2a8OZyokamO6bEtNZcZCNzsp4VBHpQbE-z0Beji4lgn2FXj8IZwcz6r7v-fT-0-MeHVUpCkd5EAWf4RoZRKPA8" />
                </div>
                <div className="flex-1 border-b border-outline-variant focus-within:border-on-surface transition-colors pb-1">
                  <input className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-body-lg placeholder:text-on-surface-variant" placeholder="Add a comment..." type="text" />
                </div>
              </div>
              {/* Comment List */}
              <div className="space-y-6">
                {/* Comment 1 */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <img className="w-full h-full object-cover" alt="User Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPgka1KTWDi7AnAvCuEK0nZRsXjliCYODD20EB1y2j7knCUa_5XrzU-Nh-T3s7nNFxdewnJ2iVMU4NoAZTqEifjR2N9HG4x33cC9f9DvWGvo7FG8K0pOZRUI4TDBFDPpRjkhpoLVq3bwxmVwAKjaujbvSazqtAs5-yLT1HXjCZ19pxnzQi9E2WbZ_ig2q1LGw5L6_YKBjkovlNoA2akDXInNCkVG0Wils1cMt39-NAJSFd0Ig7gRI" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-label-lg font-bold">@CyberArchitect</span>
                      <span className="text-label-sm text-on-surface-variant">2 days ago</span>
                    </div>
                    <p className="text-body-md">That cooling loop is absolute art. I've never seen anyone attempt that quantum-simulation configuration on a desktop scale before. Great breakdown!</p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-lg cursor-pointer">thumb_up</span>
                        <span className="text-label-sm">842</span>
                      </div>
                      <span className="material-symbols-outlined text-lg cursor-pointer">thumb_down</span>
                      <button className="text-label-sm font-bold hover:bg-surface-variant px-3 py-1 rounded-full">Reply</button>
                    </div>
                  </div>
                </div>
                {/* Comment 2 */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <img className="w-full h-full object-cover" alt="User Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRHPB0L8S8K9QHzmTF8a0hWe6uCMueDmar9_DZRa-gDzRHSkKpcP-919aDw_7GY1DNEhIE5mOhsjtQvMYU1RsKJ97EP6ORWFZwnhAqfLLlNrZxYpoI6_yhZ112XyhSOQO5eO2GGoeEcom5aoO7ffTSH0s5aa9vjARJQMwCl_e1Iog8ZnDMZTO0ZoRMETWoHf1DvWynAW974isj1KgzWPUrrDNAxP3UOn5oOCgJxq-mjtdn_Oc2qfk" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-label-lg font-bold">@HardwareHacker</span>
                      <span className="text-label-sm text-on-surface-variant">15 hours ago</span>
                    </div>
                    <p className="text-body-md">The cable management alone deserves an award. Can we get a separate video just on the power supply distribution you used?</p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-lg cursor-pointer">thumb_up</span>
                        <span className="text-label-sm">125</span>
                      </div>
                      <span className="material-symbols-outlined text-lg cursor-pointer">thumb_down</span>
                      <button className="text-label-sm font-bold hover:bg-surface-variant px-3 py-1 rounded-full">Reply</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar (Recommendations) */}
          <div className="w-full lg:w-[400px] flex flex-col gap-3">
            {/* Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <button className="px-3 py-1.5 bg-on-surface text-surface rounded-lg text-label-lg font-bold whitespace-nowrap">All</button>
              <button className="px-3 py-1.5 bg-surface-container-high text-on-surface rounded-lg text-label-lg font-bold whitespace-nowrap hover:bg-surface-variant transition-colors">From Nexus Tech Lab</button>
              <button className="px-3 py-1.5 bg-surface-container-high text-on-surface rounded-lg text-label-lg font-bold whitespace-nowrap hover:bg-surface-variant transition-colors">PC Building</button>
              <button className="px-3 py-1.5 bg-surface-container-high text-on-surface rounded-lg text-label-lg font-bold whitespace-nowrap hover:bg-surface-variant transition-colors">Hardware</button>
            </div>
            {/* Related Videos */}
            <div className="flex flex-col gap-3">
              {/* Related Video 1 */}
              <div className="flex gap-3 group cursor-pointer">
                <div className="relative w-40 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-surface-container">
                  <img className="w-full h-full object-cover" alt="Motherboard" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCASgMS8VbaypOZ4kn-Zwt5so5gBmCIu_uh0tZGTmRhM78ttvPtsuf8hHFtdAx1LkZnFSTmUdmfMgvVTHBMbQVqlGCJF3FtArVw8xelzQoA2JhLDoJoJFL9dC_PNk-ZM9ZjBcXyurC6NlUOOjzRNwL0HB-LF3fSTsJEJc89w-XbhGuvNb8V1qNV6mQ-VwJ_6jZAMhpVEQCssZ1DS-BQX3YMVjpZiJ1iTo8tD9VEcVDyn5F3i_ffrIo" />
                  <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] px-1 rounded">15:42</span>
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-label-lg font-bold leading-tight line-clamp-2 group-hover:text-primary-container transition-colors">Top 5 CPUs for 2024 Ultimate Benchmarks</h4>
                  <p className="text-[12px] text-on-surface-variant hover:text-on-surface">Nexus Tech Lab</p>
                  <p className="text-[12px] text-on-surface-variant">450K views • 1 month ago</p>
                </div>
              </div>
              {/* Related Video 2 */}
              <div className="flex gap-3 group cursor-pointer">
                <div className="relative w-40 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-surface-container">
                  <img className="w-full h-full object-cover" alt="Liquid Nitrogen" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCllShxPMmvEluNxTYGSoPW2_7Kkwn0kZF3ACQLTCGloEbSpBLVZN6RCUIghPtjDwgz3uC-swp9AQxlqasvMWJmub1TIGF6FFJtCrksTJavFQi1QKJxEBTF8tXiS9PF53pmFcAIZdNGXAVb9MogKBeq5_Xe5zPpyj0TrU4R4cEJjbY5moOQeafbWGeXNcJnQuOomZs6UdAM8m5Nenre55LARbQbdlngWCkt3XGWEfwD4M0EA0wK9bQ" />
                  <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] px-1 rounded">22:10</span>
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-label-lg font-bold leading-tight line-clamp-2 group-hover:text-primary-container transition-colors">LN2 Overclocking: Breaking World Records</h4>
                  <p className="text-[12px] text-on-surface-variant hover:text-on-surface">Extreme Tech Weekly</p>
                  <p className="text-[12px] text-on-surface-variant">1.2M views • 2 weeks ago</p>
                </div>
              </div>
              {/* Related Video 3 */}
              <div className="flex gap-3 group cursor-pointer">
                <div className="relative w-40 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-surface-container">
                  <img className="w-full h-full object-cover" alt="Data Center" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdHG_dRX_pcgIHM0FeGVrAIEWV_gDmlI0aHUmW99jvQBaBs6b_RB3YvyogfRnX9mrjFSoUhVD-1qRJKSHeW6BYp191h-O9ZdueyxXx9wb9VBz33fwK1KCL_azAAqkUMxsPGqVEXgeguCPlQJYgKL6GRy9zCz-l7H4mW_qjZfdx2MVLeDulR8GGXJS_JAySvE3apRJPyFWWv-ztFHawD_xQEerQfrtT907FJACHZlM0_9rUBnGjT0w" />
                  <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] px-1 rounded">12:05</span>
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-label-lg font-bold leading-tight line-clamp-2 group-hover:text-primary-container transition-colors">Inside the World's Fastest AI Supercomputer</h4>
                  <p className="text-[12px] text-on-surface-variant hover:text-on-surface">Global Compute</p>
                  <p className="text-[12px] text-on-surface-variant">89K views • 3 days ago</p>
                </div>
              </div>
              {/* Related Video 4 */}
              <div className="flex gap-3 group cursor-pointer">
                <div className="relative w-40 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-surface-container">
                  <img className="w-full h-full object-cover" alt="Studio Setup" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfNzwK3joFHq-Kv3lWHk57uabHSeLtDvQaQ0uJ4Pktep8f2tR1oXUVgDdDwcqf274vVPVG7Mdvv68C4pHQBPt4sQKNcfnFUPl2otJHeqVi1uhJ8BQvlrCsyuJH6dq0JWklcWSDQvJ9RpgFRACqPsZpScIVmlN1cvvnfXlNPUcLYg6xzZ0X6oq1YrB4bax3t7N91VL8IwOmxifhPtBbyv8DlpjDkXkRUYI-xJAiJyGh74GGtzfg1Jw" />
                  <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] px-1 rounded">18:30</span>
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-label-lg font-bold leading-tight line-clamp-2 group-hover:text-primary-container transition-colors">My $10,000 Studio Desk Setup Tour</h4>
                  <p className="text-[12px] text-on-surface-variant hover:text-on-surface">Nexus Tech Lab</p>
                  <p className="text-[12px] text-on-surface-variant">210K views • 5 months ago</p>
                </div>
              </div>
              {/* Related Video 5 */}
              <div className="flex gap-3 group cursor-pointer">
                <div className="relative w-40 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-surface-container">
                  <img className="w-full h-full object-cover" alt="Custom Cables" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1opM7RyZQG7YYNA6rLgp11C-bHrVPCQ6LIX_Yg6Syqu7IEdQgk_tUQrlB20Z1s9zU7-DKfq9PdqLPgpn63gAslPua6KZxXb7UuNOwq156UFtpAlkKsBysQmxfTovGd0Z9SMKh24nEB_q_SRsTYsYuvZfsvK2m19qTQ2_noWel8n1QRRezvVDpq2r6RyzWlwUb70VgcpUa7PTIKdiAUHERO-7O0SUZa3T4q7vYiaGoq_zme2eyUSI" />
                  <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] px-1 rounded">34:50</span>
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-label-lg font-bold leading-tight line-clamp-2 group-hover:text-primary-container transition-colors">Ultimate Cable Management Guide 2024</h4>
                  <p className="text-[12px] text-on-surface-variant hover:text-on-surface">CableMod Experts</p>
                  <p className="text-[12px] text-on-surface-variant">78K views • 1 week ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* BottomNavBar (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-12 bg-surface border-t border-outline-variant/10">
        <div className="flex flex-col items-center gap-0.5 text-on-surface font-bold">
          <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
          <span className="text-[9px] font-label-sm">Home</span>
        </div>
        <div className="flex flex-col items-center gap-0.5 text-on-surface-variant">
          <span className="material-symbols-outlined text-xl">play_circle</span>
          <span className="text-[9px] font-label-sm">Shorts</span>
        </div>
        <div className="flex flex-col items-center gap-0.5 text-on-surface-variant">
          <span className="material-symbols-outlined text-xl">subscriptions</span>
          <span className="text-[9px] font-label-sm">Subs</span>
        </div>
        <div className="flex flex-col items-center gap-0.5 text-on-surface-variant">
          <span className="material-symbols-outlined text-xl">video_library</span>
          <span className="text-[9px] font-label-sm">Library</span>
        </div>
      </nav>
    </div>
  );
};

export default Watch;
