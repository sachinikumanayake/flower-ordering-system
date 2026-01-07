import React, { useContext, useState, useEffect } from 'react';
import { assets } from '../../assets/assets.js'; 
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from 'shared-context';
import { AdminAuthContext } from '../../../../admin/src/context/AdminAuthContext.jsx';

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("home");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    
    const { getTotalCartAmount, token, setToken, search, setSearch } = useContext(StoreContext); 
    const { adminToken } = useContext(AdminAuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role"); 
        setToken("");
        setIsDropdownOpen(false);
        navigate("/");
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim()) {
            setIsSearchOpen(false);
            const exploreSection = document.getElementById('explore');
            if (exploreSection) {
                exploreSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const navLinkStyles = (item) => `
        relative cursor-pointer transition-all duration-300 font-medium
        ${menu === item ? "text-pink-600" : "text-gray-600 hover:text-pink-500"}
        after:content-[''] after:absolute after:left-0 after:bottom-[-4px] 
        after:w-full after:h-[2px] after:bg-pink-500 after:transition-transform 
        after:duration-300 ${menu === item ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}
    `;

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
            scrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-3" : "bg-white py-5"
        }`}>
            <div className='max-w-[1400px] mx-auto px-6 flex justify-between items-center'>
                <Link to='/' className='flex items-center group'>
                    <h1 className='text-2xl md:text-3xl font-serif font-extrabold tracking-tighter'>
                        <span className='text-pink-500 group-hover:text-pink-600 transition-colors'>pink</span>
                        <span className='text-gray-800 ml-1 italic'>Flora</span>
                    </h1>
                </Link>
        
                <ul className={`hidden md:flex items-center gap-10 text-[15px] ${isSearchOpen ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100'} transition-all duration-300`}>
                    <li><Link to='/' onClick={() => setMenu("home")} className={navLinkStyles("home")}>Home</Link></li>
                    <li><a href='/#explore' onClick={() => setMenu("menu")} className={navLinkStyles("menu")}>Menu</a></li>
                    <li><a href='#app-Download' onClick={() => setMenu("app")} className={navLinkStyles("app")}>Mobile App</a></li>
                    <li><a href='#footer' onClick={() => setMenu("contact")} className={navLinkStyles("contact")}>Contact</a></li>
                </ul>

                <div className="flex items-center gap-4 md:gap-6">
                    <div className="relative flex items-center">
                        <form 
                            onSubmit={handleSearch}
                            className={`flex items-center bg-gray-100 rounded-full transition-all duration-500 overflow-hidden relative ${
                                isSearchOpen ? "w-40 sm:w-64 px-4 py-1.5 opacity-100" : "w-0 opacity-0 px-0"
                            }`}
                        >
                            <input 
                                type="text" 
                                placeholder="Search flowers..."
                                className="bg-transparent border-none outline-none text-sm w-full text-gray-700 pr-7" 
                                value={search} 
                                onChange={(e) => setSearch(e.target.value)} 
                                autoFocus={isSearchOpen}
                            />
                            
                            {search && isSearchOpen && (
                                <span 
                                    onClick={() => setSearch("")} 
                                    className="absolute right-2 cursor-pointer text-slate-200  font-bold text-base rounded-xl bg-red-700"
                                    title="Clear search"
                                >
                                    x
                                </span>
                            )}
                        </form>
                        
                        <div 
                            className="p-2 hover:scale-110 transition-transform cursor-pointer"
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                        >
                            <img 
                                src={isSearchOpen ? assets.cross_icon : assets.serch} 
                                alt="Search" 
                                className={`${isSearchOpen ? 'w-5 h-5' : 'w-8 h-8'} opacity-70 hover:opacity-100 transition-all`} 
                            />
                        </div>
                    </div>

                    <div className="relative group hover:scale-110 transition-transform">
                        <Link to='/cart'>
                            <img src={assets.cart} alt="Cart" className="w-9 h-9 md:w-10 md:h-10" />
                        </Link>
                        {getTotalCartAmount() > 0 && (
                            <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pink-500 border border-white"></span>
                            </span>
                        )}
                    </div>

                    {token ? (
                        <div className="relative">
                            <img 
                                src={assets.profile} 
                                alt="Profile" 
                                className="w-9 h-9 md:w-10 md:h-10 rounded-full cursor-pointer border-2 border-pink-100 hover:border-pink-500 transition-all object-cover shadow-sm" 
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                            />
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-4 w-48 bg-white border border-gray-100 rounded-xl shadow-2xl py-2 overflow-hidden">
                                    <button 
                                        onClick={() => {navigate('/orders'); setIsDropdownOpen(false);}}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                                    >
                                        <img src={assets.bag} alt="Orders" className="w-5 h-5" />
                                        <span className='font-medium text-sm'>My Orders</span>
                                    </button>
                                    <div className='h-[1px] bg-gray-100 w-full'></div>
                                    <button 
                                        onClick={logout}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                                    >
                                        <img src={assets.logout} alt="Logout" className="w-5 h-5" />
                                        <span className='font-medium text-sm'>Sign Out</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button 
                            onClick={() => setShowLogin(true)} 
                            className="bg-gray-900 text-white px-5 md:px-7 py-2 md:py-2.5 rounded-full text-sm md:text-base font-medium hover:bg-pink-600 transform hover:-translate-y-0.5 transition-all shadow-md active:scale-95"
                        >
                            Sign In
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;