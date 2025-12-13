import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home.jsx'; 
import Cart from './pages/Cart/Cart.jsx'; 
import PlaceOrder from './pages/PlaceOrder/PlaceOrder.jsx';
import Footer from './components/Footer/Footer.jsx'; 
import LoginPopup from './components/LoginPopup/LoginPopup.jsx'; 
import Orders from './pages/Orders/Orders.jsx'; 
import Navbar from './components/Navbar/Navbar.jsx';

const App = () => {
    
    const [showLogin, setShowLogin] = useState(false);
      const isAdminRoute = window.location.pathname.startsWith('/admin');

    return (
        <>
            {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
            
            {!isAdminRoute && <Navbar setShowLogin={setShowLogin} />}
            
            <div className={`w-full ${!isAdminRoute ? 'max-w-[1400px] mx-auto' : ''} min-h-screen`}>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/order' element={<PlaceOrder />} />
                    <Route path='/orders' element={<Orders />} />
                    
                </Routes>
            </div>
            {!isAdminRoute && <Footer />}
        </>
    );
};

export default App;