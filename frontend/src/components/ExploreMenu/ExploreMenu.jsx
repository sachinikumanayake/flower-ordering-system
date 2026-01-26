import React from 'react';
import { menu_list, video, video1, video2 } from '../../assets/assets';

const ExploreMenu = ({ category, setCategory }) => {
  const videos = [video, video1, video2];

  return (
    <div className="flex flex-col gap-10 py-12 px-4 sm:px-8 max-w-7xl mx-auto" id='explore'>
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
          Pick the <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600">Perfect Flowers</span> For...
        </h1>
      </div>

      {/* Categories */}
      <div className="flex gap-8 items-start overflow-x-auto pb-6 pt-4 no-scrollbar scroll-smooth">
        {menu_list.map((item, index) => (
          <div
            key={index}
            onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)}
            className="flex flex-col items-center cursor-pointer min-w-fit group"
          >
            <div className={`relative p-1 rounded-full transition-all duration-500 ${category === item.menu_name ? 'bg-pink-500' : 'bg-transparent'}`}>
              <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-full overflow-hidden p-1">
                <img src={item.menu_image} alt="" className="w-full h-full object-cover rounded-full" />
              </div>
            </div>
            <p className="mt-2 font-medium">{item.menu_name}</p>
          </div>
        ))}
      </div>

      {/* Video Section - Full Correct Implementation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((vidSrc, i) => (
          <div key={i} className="rounded-2xl overflow-hidden shadow-lg bg-black aspect-video">
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              controls
              preload="metadata"
            >
              <source src={vidSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreMenu;