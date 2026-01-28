import React from "react";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-[#d6cef1] w-[40%] sm:w-[30%] md:w-[20%] lg:w-[18%] h-screen border-r border-[1.5px] border-[#a9a9a9] p-2 sm:p-3 md:p-4 flex flex-col gap-3 text-[10px] sm:text-sm">
      
      <NavLink
        to="/" 
        end 
        className={({ isActive }) =>
          `flex items-center px-2 py-1 sm:px-3 sm:py-2 rounded-md gap-2 cursor-pointer transition-all border border-gray-950 ${
            isActive
              ? 'bg-white border-2 border-[tomato]' 
              : 'hover:bg-pink-300'
          }`
        }
      >
        <img src={assets.add} alt="Dashboard" className="w-4 h-4 sm:w-5 sm:h-5" /> 
        <p>Dashboard</p>
      </NavLink>
      

      <NavLink
        to="/add"
        className={({ isActive }) =>
          `flex items-center px-2 py-1 sm:px-3 sm:py-2 rounded-md gap-2 cursor-pointer transition-all border border-gray-950 ${
            isActive
              ? 'bg-white border-2 border-[tomato]' 
              : 'hover:bg-pink-300'
          }`
        }
      >
        <img src={assets.add} alt="Add" className="w-4 h-4 sm:w-5 sm:h-5" />
        <p>Add Items</p>
      </NavLink>
      
      <NavLink
        to="/list" 
        className={({ isActive }) =>
          `flex items-center px-2 py-1 sm:px-3 sm:py-2 rounded-md gap-2 cursor-pointer transition-all border border-gray-950 ${
            isActive
              ? 'bg-white border-2 border-[tomato]' 
              : 'hover:bg-pink-300'
          }`
        }
      >
        <img src={assets.check} alt="List" className="w-4 h-4 sm:w-5 sm:h-5" />
        <p>List Items</p>
      </NavLink>

      {/* 4. Orders NavLink */}
      <NavLink to="/orders"
        className={({ isActive }) =>
          `flex items-center px-2 py-1 sm:px-3 sm:py-2 rounded-md gap-2 cursor-pointer transition-all border border-gray-950 ${
            isActive
              ? 'bg-white border-2 border-[tomato]'
              : 'hover:bg-pink-300'
          }`
        }
      >
        <img src={assets.boy} alt="Orders" className="w-4 h-4 sm:w-5 sm:h-5" />
        <p>Orders</p>
      </NavLink>
    </div>
  );
};

export default Sidebar;