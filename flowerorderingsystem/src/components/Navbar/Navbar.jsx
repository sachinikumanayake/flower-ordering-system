// src/components/Navbar/Navbar.jsx
import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    setIsDropdownOpen(false);
    navigate("/");
  };

  return (
    <div className='p-1 flex justify-between items-center'>
      {/* Logo */}
      <Link to='/'>
        <img
          src={assets.flowers}
          alt="Logo"
          className="w-[160px] md:w-[120px] lg:w-[140px] h-[80px]"
        />
      </Link>

      {/* Menu Links */}
      <ul className="flex text-black font-semibold gap-8 lg:gap-5 md:gap-4 text-[18px] lg:text-[17px] md:text-[16px]">
        <Link
          to='/'
          onClick={() => setMenu("home")}
          className={`pb-[2px] border-b-2 ${
            menu === "home" ? "border-black font-black" : "border-transparent cursor-pointer"
          } hover:border-black`}
        >
          Home
        </Link>
        <a
          href='#Explore'
          onClick={() => setMenu("menu")}
          className={`pb-[2px] border-b-2 ${
            menu === "menu" ? "border-black font-black" : "border-transparent cursor-pointer"
          } hover:border-black`}
        >
          Menu
        </a>
        <a
          href='#app-Download'
          onClick={() => setMenu("mobile-app")}
          className={`pb-[2px] border-b-2 ${
            menu === "mobile-app" ? "border-black font-black" : "border-transparent cursor-pointer"
          } hover:border-black`}
        >
          Mobile-App
        </a>
        <a
          href='#footer'
          onClick={() => setMenu("contact-us")}
          className={`pb-[2px] border-b-2 ${
            menu === "contact-us" ? "border-black font-black" : "border-transparent cursor-pointer"
          } hover:border-black`}
        >
          Contact-Us
        </a>
      </ul>

      {/* Right Section */}
      <div className="flex items-center gap-4 lg:gap-6 md:gap-5">
        {/* Search Icon */}
        <img
          src={assets.serch}
          alt="Search"
          className="w-[20px] md:w-[50px] h-10 object-contain"
        />

        {/* Cart Icon */}
        <div className='relative'>
          <Link to='/cart'>
            <img
              src={assets.cart}
              alt="Cart"
              className="w-[28px] md:w-[50px] h-10 object-contain"
            />
          </Link>
          {getTotalCartAmount() > 0 && (
            <div className="absolute min-w-5 min-h-5 bg-red-700 rounded-full top-0 right-0"></div>
          )}
        </div>

        {/* Profile Dropdown if logged in */}
        {token ? (
          <div className="relative flex flex-col">
            <img
              className="p-1 w-10 h-10 cursor-pointer"
              src={assets.profile}
              alt="Profile"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            />

            <ul
              className={`flex-col gap-2 absolute top-full right-0 bg-white shadow-lg rounded-lg mt-2 z-10 transition-all duration-200 ${
                isDropdownOpen ? "flex" : "hidden"
              }`}
            >
              <li
                className="flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => setIsDropdownOpen(false)}
              >
                <img className="w-15 h-10" src={assets.bag} alt="Orders" />
                <p>Orders</p>
              </li>
              <hr className="my-1" />
              <li
                onClick={logout}
                className="flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer"
              >
                <img className="w-15 h-10" src={assets.logout} alt="Logout" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        ) : (
          // Sign In Button if not logged in
          <button
            onClick={() => setShowLogin(true)}
            className="px-2 py-1 text-white text-sm font-semibold bg-purple-700 rounded-2xl hover:bg-purple-950"
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
