import React, { useContext, useState, useEffect } from 'react';
import { assets } from '../../assets/assets.js'; 
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../../../shared/context/StoreContext'; // path එක නිවැරදි කරගන්න
import { AdminAuthContext } from '../../../../admin/src/context/AdminAuthContext.jsx';

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("home");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    
    // මෙතනට logoutUser එක එකතු කළා
    const { getTotalCartAmount, token, setToken, search, setSearch, logoutUser } = useContext(StoreContext); 
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
        logoutUser(); // දැන් මෙය StoreContext එකෙන් ලැබෙන නිසා error එක එන්නේ නැහැ
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
        relative cursor-pointer transition-all duration-300 font-semibold text-[15px] tracking-wide
        ${menu === item ? "text-pink-600" : "text-gray-700 hover:text-pink-500"}
        after:content-[''] after:absolute after:left-1/2 after:bottom-[-6px] 
        after:w-0 after:h-[2px] after:bg-pink-500 after:transition-all 
        after:duration-300 after:-translate-x-1/2
        ${menu === item ? "after:w-full" : "hover:after:w-full"}
    `;

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
            scrolled 
            ? "bg-white/90 backdrop-blur-lg shadow-sm py-4" 
            : "bg-gradient-to-b from-white/80 to-transparent backdrop-blur-sm py-6"
        }`}>
            <div className='max-w-[1400px] mx-auto px-8 flex justify-between items-center'>
                
                <Link to='/' className='flex items-center group transition-transform hover:scale-105' onClick={() => setMenu("home")}>
                    <h1 className='text-2xl md:text-3xl font-serif font-extrabold tracking-tight'>
                        <span className='text-pink-600'>pink</span>
                        <span className='text-gray-900 ml-1 italic'>Flora</span>
                    </h1>
                </Link>
        
                <ul className={`hidden lg:flex items-center gap-12 transition-all duration-300 ${isSearchOpen ? 'opacity-0 -translate-y-2 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
                    <li><Link to='/' onClick={() => setMenu("home")} className={navLinkStyles("home")}>Home</Link></li>
                    <li><a href='/#explore' onClick={() => setMenu("menu")} className={navLinkStyles("menu")}>Menu</a></li>
                    <li><a href='#app-Download' onClick={() => setMenu("app")} className={navLinkStyles("app")}>Mobile App</a></li>
                    <li><a href='#footer' onClick={() => setMenu("contact")} className={navLinkStyles("contact")}>Contact</a></li>
                </ul>

                <div className="flex items-center gap-6 md:gap-8">
                    
                    <div className="relative flex items-center">
                        <form 
                            onSubmit={handleSearch}
                            className={`flex items-center bg-white/50 border border-pink-100 rounded-full transition-all duration-500 overflow-hidden ${
                                isSearchOpen ? "w-48 sm:w-72 px-4 py-2 opacity-100 shadow-sm" : "w-0 opacity-0 px-0"
                            }`}
                        >
                            <input 
                                type="text" 
                                placeholder="Search bouquets..."
                                className="bg-transparent border-none outline-none text-sm w-full text-gray-700 placeholder-gray-400" 
                                value={search} 
                                onChange={(e) => setSearch(e.target.value)} 
                                autoFocus={isSearchOpen}
                            />
                        </form>
                        
                        <button 
                            className="p-2 hover:bg-white rounded-full transition-all"
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                        >
                            <img 
                                src={isSearchOpen ? assets.close : assets.serch} 
                                alt="Search" 
                                className={`${isSearchOpen ? 'w-6 h-6' : 'w-7 h-7' } opacity-70`} 
                            />
                        </button>
                    </div>

                    <div className="relative group">
                        <Link to='/cart' className="block p-1 bg-white/40 rounded-full hover:bg-white transition-colors shadow-sm">
                            <img src={assets.cart} alt="Cart" className="w-8 h-8 md:w-9 md:h-9" />
                        </Link>
                        {getTotalCartAmount() > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-5 w-5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-5 w-5 bg-pink-600 text-[10px] text-white items-center justify-center font-bold">
                                    !
                                </span>
                            </span>
                        )}
                    </div>

                    {token ? (
                        <div className="relative">
                            <img 
                                src={assets.profile} 
                                alt="Profile" 
                                className="w-10 h-10 md:w-11 md:h-11 rounded-full cursor-pointer border-2 border-white hover:border-pink-400 transition-all object-cover shadow-md" 
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                            />
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-4 w-56 bg-white/95 backdrop-blur-md border border-pink-50 rounded-2xl shadow-2xl py-2 z-[60] overflow-hidden">
                                    <button 
                                        onClick={() => {navigate('/myorders'); setIsDropdownOpen(false);}}
                                        className="w-full flex items-center gap-4 px-5 py-4 text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                                    >
                                        <img src={assets.bag} alt="" className="w-6 h-6 opacity-70" />
                                        <span className='font-semibold text-sm'>My Orders</span>
                                    </button>
                                    <button 
                                        onClick={logout}
                                        className="w-full flex items-center gap-4 px-5 py-4 text-red-500 hover:bg-red-50 transition-colors"
                                    >
                                        <img src={assets.logout} alt="" className="w-6 h-6 opacity-70" />
                                        <span className='font-semibold text-sm'>Sign Out</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button 
                            onClick={() => setShowLogin(true)} 
                            className="bg-gray-900 text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-pink-600 transition-all active:scale-95"
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