import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("menu");
  const { getTotalCartAmount } = useContext(StoreContext);

  return (
    <div className='p-1 flex justify-between items-center'>
      <Link to='/'>
        <img src={assets.flowers} alt="Logo" className="w-[160px] md:w-[120px] lg:w-[140px] h-[80px]" />
      </Link>

      <ul className="flex text-black font-semibold gap-8 lg:gap-5 md:gap-4 text-[18px] lg:text-[17px] md:text-[16px]">
        <Link to='/' onClick={() => setMenu("home")}
          className={`pb-[2px] border-b-2 ${
            menu === "home" ? "border-black font-black" : "border-transparent cursor-pointer"
          } hover:border-black`}>
          Home
        </Link>

        <a href='#Explore' onClick={() => setMenu("menu")}
          className={`pb-[2px] border-b-2 ${
            menu === "menu" ? "border-black font-black" : "border-transparent cursor-pointer"
          } hover:border-black`}>
          Menu
        </a>

        <a href='#app-Download' onClick={() => setMenu("mobile-app")}
          className={`pb-[2px] border-b-2 ${
            menu === "mobile-app" ? "border-black font-black" : "border-transparent cursor-pointer"
          } hover:border-black`}>
          Mobile-App
        </a>

        <a href='#footer' onClick={() => setMenu("contact-us")}
          className={`pb-[2px] border-b-2 ${
            menu === "contact-us" ? "border-black font-black" : "border-transparent cursor-pointer"
          } hover:border-black`}>
          Contact-Us
        </a>
      </ul>

      <div className="flex items-center gap-4 lg:gap-6 md:gap-5">
        <img src={assets.serch} alt="Search" className="w-[20px] md:w-[50px] h-10 object-contain" />

        <div className='relative'>
          <Link to='/cart'>
            <img src={assets.cart} alt="Cart" className="w-[28px] md:w-[50px] h-10 object-contain" />
          </Link>
          {getTotalCartAmount() > 0 && (
            <div className="absolute min-w-5 min-h-5 bg-red-700 rounded-full top-0 right-0"></div>
          )}
        </div>

        <button
          onClick={() => setShowLogin(true)}
          className="px-[30px] py-[10px] lg:px-[25px] lg:py-[8px] md:px-[20px] md:py-[7px] text-white text-xl md:text-[15px] font-bold bg-purple-700 rounded-3xl hover:bg-purple-950">
          Sign In
        </button>
      </div>
    </div>
  );
}

export default Navbar;

