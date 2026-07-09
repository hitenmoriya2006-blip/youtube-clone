import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'

const Channel = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [channelData, setchannelData] = useState()
  const { username } = useParams

  const tabs = ['Home', 'Videos', 'Shorts', 'Playlists', 'Community', 'About'];

  const forYouVideos = [
    {
      id: 1,
      title: 'The First Truly Holographic Smartphone is Here',
      views: '456K views • 3 days ago',
      duration: '12:05',
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAD0TuQt6yO6_ETsmA4d5zC6YAx1CfPPRBQ9icipsPuzvSsKIqt4NZx6GTo5A_EEIVkuJJoS7hVWTH-I1qhsKzJ_zAiMmCQhoI_-vuqzAJMpzYydSAVZa81Yu4TKyfPP7bTa8DO9MEh-inSu-ZIecTThfkCHZn4tfrMgf-Xts1zFGtNk5vyrAz55kOUKyNxhGq785urV78eNtIDWAqshLF5h6NQZIbJBPe6IdBKsA04n73jCt6MnnI',
    },
    {
      id: 2,
      title: 'Why I Switched to an All-Obsidian Desk Setup',
      views: '1.2M views • 1 month ago',
      duration: '18:40',
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3eGcfk_RNpBB1yHrbC75RYdJ9nvY8IUewE1OHNeGoNrGf_6hG7svHTo_qKhQsvNts-gmHi8np6ip2VZ8ksLCm09ENzw2mH_CiIwjzcOD85Ymuhbj3r_PcQRXYuSDig13WMK3YuR53dAfYqIttbMJbnVpz30SA-UequtSdW9aN0fuGO802tMyP9l737bLwOWi76VAQiayAcoq99lSN7OWbZ0e5wtHNRjaVuvn1f-_O0dmyO_HRHcs',
    },
    {
      id: 3,
      title: 'Decoding the Next Generation of Neural Processors',
      views: '89K views • 5 days ago',
      duration: '25:15',
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMAb8VJ2ae85zNDjhLMkZ7Sv2K_p372ePvD_Gpbwl6a2Uf7LvJCydktv1bJigOmVaU_NFmt20g7a25C4I6hd9CxtMEZLFyzdKAZK1216eelmQ8650IPeloeyX4pXxX4gNc_96eGYQVpHAuIjVQ_7T_0bwivN7n9W102ElLHp6lGw0vTQlkAMpFrC7lKC88XHRw_rX_XVroNrZ-sJuf0Pqf8KymblbaehR4GzPFZOikuwI8f7MX5DM',
    },
    {
      id: 4,
      title: 'Experimental Fusion Cooling: Does it actually work?',
      views: '312K views • 1 week ago',
      duration: '09:55',
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6hBUFpL-jI6tRAgtJqUgc-k9nzTyHgDGIV8fQCBe0AxRvKN2mUHEzEDZjMhmlkwAd_JT7b862OPQjwUavN2Nf_EVIObtpO2CpQfdriE4wQ2F1xJuVayWEkwpNMVgtYx3VnuriRLxp_23eVqc9VAZJ0XvyKnu1BxdSPe9DTV0reUv37nRk2l68B9si8KlBpdUfYHtb2C2WnKvEcV1hdusI5E1ELrggbV0K510wrYOi_TMuiua9gPY',
    },
  ];

  const recentUploads = [
    {
      id: 1,
      title: "FPV Drone of the Future? Hands-on with the X-9",
      views: '22K views • 6 hours ago',
      duration: '05:22',
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDc53lRLKDExtdpHsMmm4_-EQ9sw9rOEEJMrqossvnUFewYZ3F8Y_z9wa9jL_Ek7b4IzKUSkbe8jl79hcCCHwAfztKaNV2O_B2Ck6E6Sb-2RiHZgzUIIM2TYhU-MNwJsB9UpAcCALIWNl1PWflmSmzr7FL7mrz43EL8Re62P4_9od1Zwq3YviR4NFN33gbRhpp047ZCfvFN_IOlP4y4VJl4u2NwA2QktRmK3j_kuRMUI3TDJfpZoog',
    },
    {
      id: 2,
      title: 'Building the "Thackiest" Keyboard Possible',
      views: '67K views • 1 day ago',
      duration: '11:10',
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPxzSBxSGdVQdUpyo5sNUR3PaadUsVvGn2dzqFBjwVD6aFAWZZno3JVQGEuiQGutvnL8eUG1zDV6PnovoVzH-37hDaNnFdSCB-HgWzDVz4DUfHe6xoi9_S6LTfRJWby3lNCWaTzsBhtf__aXC3s3OOJttzJxBen5M60L8TKSOCM7owQ89B3eRkDxBXYwLTcA4v1t0zZQsi5UbqyhFhGhdq-G6YNwkYofrncVaONrnRlazSSg6sFVE',
    },
    {
      id: 3,
      title: 'How Microchips are Made: A Deep Dive',
      views: '104K views • 2 days ago',
      duration: '14:02',
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvCmaRNJI3tiviUteuMFSS2vhIBPiBj5h19mc3WtXNZ6Spjfj78QXa50ud9EWxDvAom4ZU2A7XdJHjQ1Um3ycX0LntxAElq4bFDRoIJ74-absdfdbPLPbfVPVoQd0jyNUWknHGq23Hl7CJfuNKbH7Ae0tWF0gMrdAMh4ffmxXcksgoEn4ADh-wRnsCVznSXisPH8uJbvOe9dDBH4Noryk6K0pe055Ro6J82M4pNtN7IuYvWmkFpNQ',
    },
    {
      id: 4,
      title: 'Mystery Package from a Secret Tech Startup',
      views: '45K views • 3 days ago',
      duration: '08:45',
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIlTLd1XHFhT_vY8sT1jPnmY1YvAv4EcPh-WtrW1Wi_SqvO4X_9dDrtkrU2WJDbhmR4zs-VWrewC73bBTjflqlghCOsLxlQdJFqjchUD2BcIMdSCROLuQN_SjCvZAw3BrsrN_QGRoeoVZWCPETFYz_CYGEIwTLWymtnFfSMxoJZ30fjaHwvmwYx3esdpumprG5baUtvoPbWgvoRdWgQSFNjy5xOzsyEFNPv7dUA3xxkrM622jn4uQ',
    },
  ];

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/users/channel/${username}`,
          {
            withCredentials: true
          }
        )
        if (response) {
          setchannelData(response.data.data)
          console.log(response);
        }
      } catch (error) {
        console.log(error.response?.status);
        console.log(error.response?.data);
      }

    }
    fetchChannelData()
  },[])



  return (
    <div className="bg-surface text-on-surface h-screen overflow-y-auto">

      {/* Main Content */}
      <main className="pt-4  pb-20 md:pb-8 min-h-screen">

        {/* Cinematic Banner */}
        <section className="relative w-full h-[16vw] min-h-[160px] max-h-[320px] overflow-hidden">
          <img
            className="w-full h-full object-cover  rounded-xl"
            alt="Nexus Tech Lab banner"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnHYlLiRE1tMFH4x3ko5GaF_zuodrGt1wy7RwhZ6fg7_gnY6SEG1X3867OKllfiP-dyLoVgo0v-g5A4oerPaG0UBJETCyjonj8UP5ztQqHpZjGO3bBR2IGpkI06oCoXXp-yi96IzQi6A1HfTsrjiNW-o-3z1pCdla78XWPlSkN-ONcrePpX_3_4d7u9EECHlcdKi9E32zXJPHVgPOD7bQ-Ke-uDWzIOAtX4m6RZpRavnV-cqtcutU"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-60"></div>
        </section>

        {/* Channel Header Section */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-6 flex flex-col md:flex-row items-start gap-6">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 md:w-40 md:h-40 rounded-full border-4 border-surface overflow-hidden shadow-2xl">
              <img
                className="w-full h-full object-cover"
                alt="Nexus Tech Lab avatar"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4nurG8WR1Na7w-Y5FLBcFPHxoluKoD706CgAR43dMOQEydW_bn33pWzGbpAc7dr0gII2s7_asxSOq_5sJCE-LMHbZIXr8FPrj1syqBVpcpBE-Xy_6IkUxOsUB_uJrZnjhV3mCPRRgwdpyUCWJzhycXgqnDWaTEkSXnC-D04syLhjGtBd3F5yiOWZb981uxltgXyG_I3Q78Mj-PbprqiiahofYqJHN0BeK7SkVlr1r3gQ-1gLpJZ4"
              />
            </div>
          </div>

          {/* Channel Info */}
          <div className="flex-1 space-y-2 md:pt-4">
            <h1 className="font-headline-lg md:text-[44px] text-[20px] font-bold md:font-extrabold text-on-surface leading-tight">Nexus Tech Lab</h1>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-on-surface-variant font-label-lg text-label-lg">
              <span>@nexustechlab</span>
              <span className="hidden md:inline text-[8px]">•</span>
              <span>124K subscribers</span>
              <span className="hidden md:inline text-[8px]">•</span>
              <span>482 videos</span>
            </div>
            <p className="text-on-surface-variant font-body-md text-body-md max-w-2xl line-clamp-1">
              Pushing the boundaries of consumer electronics and experimental hardware. Deep dives into the future of tech...{' '}
              <span className="text-on-surface font-bold cursor-pointer">more</span>
            </p>
            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setIsSubscribed(!isSubscribed)}
                className={`px-6 py-2 font-headline-md text-headline-md rounded-full transition-all active:scale-95 ${isSubscribed
                  ? 'bg-surface-container-highest text-on-surface hover:bg-surface-variant'
                  : 'bg-on-surface text-surface hover:opacity-90'
                  }`}
              >
                {isSubscribed ? 'Subscribed' : 'Subscribe'}
              </button>
              <button className="px-6 py-2 bg-surface-container-highest text-on-surface font-headline-md text-headline-md rounded-full hover:bg-surface-variant transition-all active:scale-95">
                Join
              </button>
              <button className="p-2 bg-surface-container-highest rounded-full hover:bg-surface-variant transition-all">
                <span className="material-symbols-outlined">notifications_active</span>
              </button>
            </div>
          </div>
        </section>

        {/* Tabs Navigation */}
        <nav className="sticky top-14 md:top-14 z-30 bg-surface border-b border-outline-variant overflow-x-auto">
          <div className="max-w-7xl mx-auto px-4 md:px-6 flex gap-6 md:gap-12 h-12 items-center">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`h-full flex items-center font-bold whitespace-nowrap font-label-lg text-label-lg transition-colors ${activeTab === tab
                  ? 'border-b-2 border-on-surface text-on-surface'
                  : 'text-on-surface-variant hover:text-on-surface'
                  }`}
              >
                {tab}
              </button>
            ))}
            <button className="flex items-center text-on-surface-variant hover:text-on-surface">
              <span className="material-symbols-outlined">search</span>
            </button>
          </div>
        </nav>

        {/* Tab Content */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-12">

          {/* Featured Video */}
          <section className="flex flex-col lg:flex-row gap-6 bg-surface-container p-4 rounded-xl border border-outline-variant/30">
            <div className="lg:w-[48%] group cursor-pointer relative">
              <div className="aspect-video w-full rounded-xl overflow-hidden relative shadow-lg">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt="Featured video thumbnail"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCE2E1X_EFxbut2BcdLInn6QT1XhWeJoKUpS6CgTkHwrNCFb0_veI6sIgq3xUmLv70IIVHwEYayjm_mrcfAFkwB2Mgl4_E60QJmsC9SgKwOV30iVi8uGd4SA3OwTkCxg8eR0K6v-5DE_xR7mTumImn7WebSv5uA1DzobSrXRG_prmxyX3U2r9IvW6QUC9tcUmcnl1_JMk9C4oJW1hU1leTr6EnkNQqVYmLmLU6H7pI870gbH5aQgnU"
                />
                <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 text-white text-[12px] font-bold rounded">14:22</div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 bg-primary-container rounded-full flex items-center justify-center shadow-2xl">
                    <span className="material-symbols-outlined text-on-primary-container text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 space-y-4 pt-2">
              <h2 className="font-headline-lg text-headline-lg text-on-surface hover:text-primary-container transition-colors cursor-pointer">
                Building the Ultimate $20,000 Quantum-Grade Workstation
              </h2>
              <div className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">2.4M views • 2 weeks ago</div>
              <p className="text-on-surface-variant font-body-md text-body-md leading-relaxed line-clamp-3 md:line-clamp-none">
                In this episode, we finally complete the Nexus Core project. We've pushed the limits of thermal engineering with a triple-loop cooling system and a custom-etched obsidian reservoir. See how we managed to overclock the latest architecture to stable world-record speeds...
              </p>
              <button className="text-on-surface font-bold hover:underline font-label-lg text-label-lg">READ MORE</button>
            </div>
          </section>

          {/* For You Section */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h3 className="font-headline-lg text-headline-lg text-on-surface">For you</h3>
                <button className="flex items-center gap-2 px-3 py-1 bg-surface-container-high rounded-full font-label-sm text-label-sm hover:bg-surface-variant transition-all">
                  <span className="material-symbols-outlined text-sm">play_arrow</span>
                  <span>Play all</span>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10">
              {forYouVideos.map((video) => (
                <div
                  key={video.id}
                  className="group cursor-pointer transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="aspect-video rounded-xl overflow-hidden relative mb-3">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      alt={video.title}
                      src={video.thumbnail}
                    />
                    <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 text-white text-[12px] font-bold rounded">{video.duration}</div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <h4 className="font-headline-md text-headline-md text-on-surface line-clamp-2 group-hover:text-primary-container transition-colors">{video.title}</h4>
                      <div className="text-on-surface-variant font-body-md text-body-md mt-1">{video.views}</div>
                    </div>
                    <button className="p-1 h-fit opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recent Uploads Section */}
          <section className="space-y-6">
            <div className="flex items-center justify-between border-t border-outline-variant pt-12">
              <div className="flex items-center gap-4">
                <h3 className="font-headline-lg text-headline-lg text-on-surface">Recent Uploads</h3>
              </div>
              <button className="text-primary font-bold font-label-lg text-label-lg hover:underline">View all</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10">
              {recentUploads.map((video) => (
                <div
                  key={video.id}
                  className="group cursor-pointer transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="aspect-video rounded-xl overflow-hidden relative mb-3">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      alt={video.title}
                      src={video.thumbnail}
                    />
                    <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 text-white text-[12px] font-bold rounded">{video.duration}</div>
                  </div>
                  <h4 className="font-headline-md text-headline-md text-on-surface line-clamp-2">{video.title}</h4>
                  <div className="text-on-surface-variant font-body-md text-body-md mt-1">{video.views}</div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>

      {/* Bottom Nav (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-12 bg-surface border-t border-outline-variant">
        <a className="flex flex-col items-center justify-center text-on-surface font-bold" href="#">
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
          <span className="font-label-sm text-label-sm">Home</span>
        </a>
        <a className="flex flex-col items-center justify-center text-on-surface-variant" href="#">
          <span className="material-symbols-outlined text-[20px]">play_circle</span>
          <span className="font-label-sm text-label-sm">Shorts</span>
        </a>
        <a className="flex flex-col items-center justify-center text-on-surface-variant" href="#">
          <span className="material-symbols-outlined text-[20px]">subscriptions</span>
          <span className="font-label-sm text-label-sm">Subscriptions</span>
        </a>
        <a className="flex flex-col items-center justify-center text-on-surface-variant" href="#">
          <span className="material-symbols-outlined text-[20px]">video_library</span>
          <span className="font-label-sm text-label-sm">Library</span>
        </a>
      </nav>

    </div>
  );
};

export default Channel;
