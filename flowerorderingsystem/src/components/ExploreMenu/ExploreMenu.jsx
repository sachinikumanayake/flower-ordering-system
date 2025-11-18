import React from 'react';
import { menu_list, video, video1, video2 } from '../../assets/assets';

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="flex flex-col gap-8 sm:gap-10 px-4 sm:px-6 md:px-10 lg:px-20" id='Explore'>
     
      <h1 className="mt-8 text-center bg-gradient-to-t from-red-600 via-red-700 bg-clip-text text-transparent font-semibold text-2xl sm:text-3xl md:text-4xl">
        -Pick the Perfect Flowers For...
      </h1>

      
      <div className="flex gap-6 sm:gap-10 items-center overflow-x-auto no-scrollbar py-2">
        {menu_list.map((item, index) => (
          <div
            key={index}
            onClick={() =>
              setCategory(category === item.menu_name ? 'All' : item.menu_name)
            }
            className="cursor-pointer text-center flex-shrink-0"
          >
            <div className="w-40 sm:w-48 md:w-60 h-40 sm:h-48 md:h-60 overflow-hidden rounded-lg shadow-md">
              <img
                src={item.menu_image}
                alt={item.menu_name}
                className={`w-full h-full p-6 sm:p-8 object-cover rounded-lg transition duration-300 ${
                  category === item.menu_name ? 'border-2 border-red-600' : ''
                }`}
              />
            </div>
            <p className="mt-2 font-mono font-semibold text-black text-sm sm:text-base">
              {item.menu_name}
            </p>
          </div>
        ))}
      </div>

      
      <hr className="mx-auto w-full h-1 bg-slate-500 border-none" />

   
      <div className="flex flex-col lg:flex-row justify-center gap-8 mt-4">
        {[video, video1, video2].map((vid, i) => (
          <video
            key={i}
            className="rounded-lg shadow-md w-full sm:w-[400px] h-[200px] sm:h-[250px] md:h-[300px] object-cover"
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

