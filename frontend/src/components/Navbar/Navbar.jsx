import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets.js'; 
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from 'shared-context';
import { AdminAuthContext } from '../../../../admin/src/context/AdminAuthContext.jsx';

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("home");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    // User Context
    const { getTotalCartAmount, token, setToken, role } = useContext(StoreContext); 

    // 💡 Admin Context
    const { adminToken, isLoading, adminRole } = useContext(AdminAuthContext);
    
    const navigate = useNavigate();

    // User Logout
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role"); 
        setToken("");
        setIsDropdownOpen(false);
        navigate("/");
    };

    return (
        <div className='p-4 md:p-6 flex justify-between items-center w-full max-w-[1400px] mx-auto z-50 bg-white backdrop-blur-sm sticky top-0 border-b border-gray-100'>
            
            <div className='flex items-center gap-4'>
                <button className="md:hidden text-gray-700">
                    &#9776; 
                </button>
                <Link to='/'>
                    <h1 className='text-2xl font-serif font-bold text-pink-500 tracking-wider bg-white'>pink blossom</h1>
                </Link>
            </div>
    
            <ul className="flex bg-white text-gray-700 font-semibold gap-8 text-[16px] hidden md:flex ">
                <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "bg-white font-bold text-red-400 border-b-2 border-purple-600 pb-1" : "hover:text-purple-600 transition"}>Home</Link>
                <a href='#explore' onClick={() => setMenu("menu")} className={menu === "menu" ? "bg-white font-bold text-red-400 border-b-2 border-purple-600 pb-1" : "hover:text-purple-600 transition"}>Menu</a>
                <a href='#app-Download' onClick={() => setMenu("app")} className={menu === "app" ? "font-bold bg-white text-red-400 border-b-2 border-purple-600 pb-1" : "hover:text-purple-600 transition"}>Mobile-App</a>
                <a href='#footer' onClick={() => setMenu("contact")} className={menu === "contact" ? "font-bold bg-white text-red-400 border-b-2 border-purple-600 pb-1" : "hover:text-purple-600 transition"}>Contact</a>
            </ul>

            <div className="flex items-center gap-4">

            
 
                
                <img src={assets.serch} alt="Search" className="w-10 h-10 cursor-pointer hidden sm:block" />

                <div className="relative">
                    <Link to='/cart'>
                    <img src={assets.cart} alt="Cart" className="w-10 h-10 cursor-pointer" />
                    </Link>
                    {getTotalCartAmount() > 0 && <div className="absolute w-2 h-2 bg-purple-600 rounded-full -top-1 -right-1"></div>}
                </div>

                {token ? (
                    // User Profile Dropdown
                    <div className="relative">
                        <img 
                            src={assets.profile} 
                            alt="Profile" 
                            className="w-10 h-10 rounded-full cursor-pointer ring-2 ring-purple-300 object-cover" 
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                        />
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-3 w-40 bg-red-300 border-gray-200 rounded-lg shadow-xl py-2 z-50">
                                <button 
                                    onClick={() => {navigate('/orders'); setIsDropdownOpen(false);}}
                                    className="w-full bg-white text-left font-semibold px-4 py-2 text-gray-700 hover:bg-gray-100 block transition flex items-center gap-2"
                                >
                                    <img src={assets.bag} alt="My Orders" className="w-20 h-10" />
                                    Orders
                                </button>
                                <button 
                                    onClick={logout}
                                    className="w-full bg-white font-semibold text-left px-4 py-2 text-gray-700 hover:bg-gray-100 block transition border-t border-gray-100 flex items-center gap-2"
                                >
                                    <img src={assets.logout} alt="Logout" className=" h-10" />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    // Sign In Button (User)
                    <button 
                        onClick={() => setShowLogin(true)} 
                        className="text-white bg-purple-600 px-4 py-2 rounded-full hover:bg-purple-700 transition duration-150 shadow-md"
                    >
                    Sign In
                    </button>
                )}
            </div>
        </div>
    );
};

export default Navbar;