// src/components/ExploreMenu/ExploreMenu.jsx

import React from 'react';
import { menu_list, video, video1, video2 } from '../../assets/assets';

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="flex flex-col gap-8 sm:gap-10 pt-10" id='Explore'>
      
      <h1 
    className="text-center font-bold text-3xl sm:text-4xl md:text-5xl 
               text-transparent bg-clip-text 
               animate-pulse
               duration-1000" 
    style={{ 
        backgroundImage: 'linear-gradient(to right, #FF6B6B, #C874C6, #8E5AEC)' 
    }}
>
    -Pick the Perfect Flowers For...
</h1>

      <div className="flex gap-6 sm:gap-10 items-center overflow-x-auto no-scrollbar py-4">
        {menu_list.map((item, index) => (
          <div
            key={index}
            onClick={() =>
              setCategory(category === item.menu_name ? 'All' : item.menu_name)
            }
            className="cursor-pointer text-center flex-shrink-0 group"
          >
            <div className="w-40 sm:w-48 md:w-52 h-40 sm:h-48 md:h-52 overflow-hidden rounded-full shadow-lg transition duration-300 group-hover:shadow-xl">
              <img
                src={item.menu_image}
                alt={item.menu_name}
                className={`w-full h-full p-6 sm:p-8 object-cover rounded-full transition duration-300 transform group-hover:scale-105 ${
                  category === item.menu_name ? 'border-4 border-pink-600' : 'opacity-80'
                }`}
              />
            </div>
            <p className={`mt-3 font-serif font-semibold text-lg text-gray-800 transition ${
                 category === item.menu_name ? 'text-pink-600 font-extrabold' : 'text-gray-600'
            }`}>
              {item.menu_name}
            </p>
          </div>
        ))}
      </div>

      <hr className="mx-auto w-full h-1 bg-pink-100 border-none my-6" />

      <div className="flex flex-col lg:flex-row justify-center gap-8 mt-4">
        {[video, video1, video2].map((vid, i) => (
          <video
            key={i}
            className="rounded-xl shadow-2xl w-full sm:w-[400px] h-[250px] object-cover border-4 border-pink-200"
            src={vid}
            controls
            autoPlay
            muted
            loop
          />
        ))}
      </div>
    </div>
  );
};

export default ExploreMenu;