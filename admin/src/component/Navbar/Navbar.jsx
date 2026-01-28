import React, { useState, useContext } from "react";
import { assets } from "../../assets/assets";
import { AdminAuthContext } from "../../context/AdminAuthContext"; 
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { setAdminToken } = useContext(AdminAuthContext); 
  const navigate = useNavigate();

  const handleLogout = () => {
    setAdminToken(null);
    
    localStorage.removeItem("adminToken"); 
    
    navigate("/login");
    
    console.log("Logged out successfully");
  };

  return (
    <div className="flex flex-col bg-[#fcfcfc] justify-between items-center p-1 relative">
      <div className="flex justify-between w-full items-center">
        {/* Logo */}
        <img className="w-[50px] ml-5 mt-5" src={assets.admin} alt="Admin" />

        {/* Profile and Dropdown */}
        <div className="relative mr-5 mt-2">
          <img
            className="w-[30px] rounded-full cursor-pointer hover:opacity-80 transition-all border border-gray-200"
            src={assets.boy}
            alt="Profile"
            onClick={() => setShowLogout(!showLogout)}
          />

          {/* Logout Dropdown */}
          {showLogout && (
            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition-colors font-medium"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;