import React from 'react';
import { assets } from '../../assets/assets';

const About = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center py-20 px-4 overflow-hidden bg-gradient-to-br from-white via-pink-50 to-pink-100">
      
      
      <div className="absolute top-10 left-[-5%] w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-10 right-[-5%] w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-700"></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl w-full">
        
        {/* Animated Heading */}
        <div className="text-center mb-16">
          <h1 className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#db7093] to-[#ffb6c1] drop-shadow-2xl mb-4 tracking-tighter">
            Pink Flora
          </h1>
          <p className="text-gray-500 uppercase tracking-[0.5em] text-sm font-semibold">Premium Floral Experience</p>
        </div>

  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div className="group relative">
<div className="relative rounded-2xl overflow-hidden shadow-2xl transform group-hover:scale-[1.02] group-hover:-rotate-2 transition-all duration-500">
<img 
    src={assets.shop} 
    alt="Our Shop" 
    className="w-full h-[400px] object-cover" 
    onLoad={() => console.log("Image loaded successfully!")}
    onError={(e) => {
        console.log("Image failed to load:", assets.shop);
        e.target.src = "https://placehold.co/600x400?text=Shop+Image+Missing";
    }} 
/>
    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
</div>
             {/* Floating Badge */}
             <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl border border-pink-100 hidden md:block animate-bounce">
                <p className="text-[#db7093] font-bold text-xl text-center">100%<br/><span className="text-gray-400 text-xs uppercase">Fresh</span></p>
             </div>
          </div>

          <div className="backdrop-blur-md bg-white/60 p-10 rounded-3xl border border-white/20 shadow-xl">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Floral Journey</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Welcome to <span className="text-[#db7093] font-bold">Pink Flora</span>! 
              We are dedicated to bringing the freshest and most beautiful flowers to your doorstep. 
              Our passion for nature and elegance drives everything we do.
            </p>
            <button className="bg-[#db7093] text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-pink-200 hover:bg-[#c05678] transition-all">
              Learn More
            </button>
          </div>
        </div>

        {/* Image Gallery (3D Look) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { img: assets.front, label: "Elegance" },
            { img: assets.birt, label: "Celebration" },
            { img: assets.blue, label: "Unique" }
          ].map((item, index) => (
            <div key={index} className="relative h-64 rounded-2xl overflow-hidden group shadow-lg">
              <img 
                src={item.img} 
                alt={item.label} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-center justify-center">
                <span className="text-white font-bold text-2xl tracking-widest opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-500">
                  
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default About;