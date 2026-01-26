import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home/Home.jsx'; 
import Cart from './pages/Cart/Cart.jsx'; 
import Footer from './components/Footer/Footer.jsx'; 
import LoginPopup from './components/LoginPopup/LoginPopup.jsx'; 
import Navbar from './components/Navbar/Navbar.jsx';
import Checkout from './pages/Checkout/Checkout';
import Verify from './pages/Verify/Verify.jsx';
import MyOrders from './components/MyOrders/Myorders.jsx';
import About from './pages/About/About.jsx'; 

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// ... (imports thibba widiyatama)

const App = () => {
    const [showLogin, setShowLogin] = useState(false);
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');

    return (
        <>
            <ScrollToTop />
            {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
            {!isAdminRoute && <Navbar setShowLogin={setShowLogin} />}
            
            <div className={`w-full ${!isAdminRoute ? 'max-w-[1400px] mx-auto pt-24' : ''} min-h-screen`}>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/myorders' element={<MyOrders />} />                   
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/order' element={<Checkout />} />                   
                    <Route path='/verify' element={<Verify />} />
                </Routes>
            </div>
            {!isAdminRoute && <Footer />}
        </>
    );
};
export default App;