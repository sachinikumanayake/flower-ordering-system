import React, { useState } from 'react'
import Navbar from "./components/Navbar/Navbar.jsx";
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home.jsx';
import Cart from './pages/cart/Cart.jsx';
import Placeorder from './pages/placeorder/Placeorder.jsx';
import Footer from './components/Footer/Footer.jsx';
import Login from './components/Login/Login.jsx';




const App = () => {
 const [ showLogin, setShowLogin] = useState(false)



  return (
    <>
    {showLogin ? <Login setShowLogin={setShowLogin} /> : <></>}
    <div className='app'>
      
    <Navbar setShowLogin={setShowLogin} />
      
   <Routes>
    <Route path='/' element={<Home/> } />
    <Route path='/cart' element={<Cart/>} />
    <Route path='/order' element={<Placeorder/>} />
    </Routes>
  </div>
  <Footer/>
    </>
  )
}
export default App;
