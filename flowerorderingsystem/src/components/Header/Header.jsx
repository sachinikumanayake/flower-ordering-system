import React from 'react';

const Header = () => {
  return (
    <>
      {/* Main Heading */}
      <h2 className="px-4 sm:px-10 md:px-20 bg-transparent flex flex-wrap font-extrabold font-mono text-lime-500 text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 animate-pulse duration-150">
        Welcome to Pink Blossom -
        <span className="pl-2 text-lime-700">
          Where Every Petal Tells a Story..!
        </span>
      </h2>

      {/* Image Section */}
      <div className="flex flex-wrap justify-center gap-4 mt-8 px-4">
  <div className="rounded-lg w-72 h-72 bg-center bg-cover bg-[url('/logo.jpg')]"></div>
  <div className="rounded-lg w-72 h-72 bg-center bg-cover bg-[url('/sop.jpg')]"></div>
  <div className="rounded-lg w-72 h-72 bg-center bg-cover bg-[url('/cover.jpg')]"></div>

      {/* Call to Action */}
      <div className="pl-4 sm:pl-10 mt-6 sm:mt-8 z-10 bg-white/70 p-4 rounded-md w-fit max-w-full shadow-md">
        <h2 className="animate-bounce text-xl sm:text-2xl md:text-3xl bg-gradient-to-t from-red-600 via-violet-700 bg-clip-text text-transparent font-bold">
          Place Your Order...
        </h2>
        <button className="mt-4 font-extrabold cursor-pointer rounded-full bg-black hover:bg-fuchsia-600 text-white text-base sm:text-lg px-4 sm:px-6 py-2 transition duration-300">
          View
        </button>
      </div>
      </div>
    </>
  );
};

export default Header;

