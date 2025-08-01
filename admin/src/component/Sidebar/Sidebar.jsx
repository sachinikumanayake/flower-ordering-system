import React from "react";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-[40%] sm:w-[30%] md:w-[20%] lg:w-[18%] h-screen border-r border-[1.5px] border-[#a9a9a9] p-2 sm:p-3 md:p-4 flex flex-col gap-3 text-[10px] sm:text-sm">
      
      <NavLink
        to="/add"
        className={({ isActive }) =>
          `flex items-center px-2 py-1 sm:px-3 sm:py-2 rounded-md gap-2 cursor-pointer transition-all ${
            isActive
              ? 'bg-[#fff0ed] border-[tomato]'
              : 'border border-gray-400 hover:bg-pink-300'
          }`
        }
      >
        <img src={assets.add} alt="Add" className="w-4 h-4 sm:w-5 sm:h-5" />
        <p>Add Items</p>
      </NavLink>

      <NavLink
        to="/list"
        className={({ isActive }) =>
          `flex items-center px-2 py-1 sm:px-3 sm:py-2 rounded-md gap-2 cursor-pointer transition-all ${
            isActive
              ? 'bg-[#fff0ed] border-[tomato]'
              : 'border border-gray-400 hover:bg-pink-300'
          }`
        }
      >
        <img src={assets.check} alt="List" className="w-4 h-4 sm:w-5 sm:h-5" />
        <p>List Items</p>
      </NavLink>

      <NavLink to="/orders"
        className={({ isActive }) =>
          `flex items-center px-2 py-1 sm:px-3 sm:py-2 rounded-md gap-2 cursor-pointer transition-all ${
            isActive
              ? 'bg-[#fff0ed] border-[#eb2907]'
              : 'border border-gray-400 hover:bg-pink-300'
          }`
        }
      >
        <img src={assets.check} alt="Orders" className="w-4 h-4 sm:w-5 sm:h-5" />
        <p>Orders</p>
      </NavLink>
    </div>
  );
};

export default Sidebar;




