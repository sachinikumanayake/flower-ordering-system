import React, { useContext } from 'react';
import { StoreContext } from "../../../../shared/context/StoreContext";
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets'; 

const Cart = () => {
    const { cartItems, boquet_list, removeCart, getTotalCartAmount, url } = useContext(StoreContext);
    const navigate = useNavigate();

    const deliveryFee = 450;
    const subTotal = getTotalCartAmount();
    const totalAmount = subTotal + deliveryFee;

    
    if (subTotal === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center pt-20 px-4 text-center">
                <div className="relative mb-6">
                    <img 
                        src={assets.shoping } 
                        alt="Empty Cart" 
                        className="w-40 h-40 object-contain opacity-20" 
                    />
                    <div className="absolute top-0 right-0 bg-pink-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl animate-bounce">
                        !
                    </div>
                </div>
                
                <h2 className="text-3xl font-extrabold text-gray-800 mb-2">Oops! Your cart is empty.</h2>
                <p className="text-gray-500 max-w-md mb-8">
                    Looks like you haven't added any beautiful bouquets yet. 
                    Start shopping now and brighten someone's day!
                </p>
                
                <button
                    className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold py-3 px-10 rounded-full shadow-lg transform transition hover:scale-105 active:scale-95 uppercase tracking-wider"
                    onClick={() => navigate('/')}
                >
                    Back to Shop
                </button>
                
                <div className="mt-12 flex gap-4 opacity-30">
                    <span className="text-4xl">🌸</span>
                    <span className="text-4xl">🌹</span>
                    <span className="text-4xl">🌻</span>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-24 px-4 md:px-10 max-w-[1200px] mx-auto min-h-screen">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                Your Floral Basket <span className="text-pink-500">🛒</span>
            </h2>

            {/* Header Row */}
            <div className="hidden md:grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center py-4 border-b-2 border-gray-100 text-sm font-bold text-gray-400 uppercase tracking-wider">
                <p>Items</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>

            {boquet_list.map((item) => {
                if (cartItems[item._id] > 0) {
                    const fullImageUrl = `${url}/images/${item.image}`; 
                    
                    return (
                        <div key={item._id} className="py-6 border-b border-gray-50 border-opacity-60 hover:bg-gray-50 transition-colors">
                            <div className="grid grid-cols-[1fr_2fr_0.5fr] md:grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center gap-4 text-sm">
                                <img src={fullImageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-2xl shadow-sm" /> 
                                <div className="flex flex-col">
                                    <p className="font-bold text-gray-800 text-base">{item.name}</p>
                                    <p className="md:hidden text-gray-500">Rs.{item.price}</p>
                                </div>
                                <p className="hidden md:block font-medium">Rs.{item.price}</p> 
                                <div className="hidden md:flex items-center justify-center">
                                    <span className="bg-pink-50 text-pink-600 px-3 py-1 rounded-lg font-bold">
                                        {cartItems[item._id]}
                                    </span>
                                </div>
                                <p className="hidden md:block font-bold text-gray-800">Rs.{item.price * cartItems[item._id]}</p>
                                <button 
                                    onClick={() => removeCart(item._id)} 
                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 font-bold"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    );
                }
                return null;
            })}

            {/* Bottom Section */}
            <div className="mt-12 flex flex-col lg:flex-row gap-12 mb-20">
                {/* Cart Totals */}
                <div className="flex-1 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                    <h2 className="font-black text-2xl text-gray-800 mb-6">Order Summary</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between text-gray-500">
                            <p>Subtotal</p>
                            <p className="font-semibold text-gray-800">Rs.{subTotal}.00</p> 
                        </div>

                        <div className="flex justify-between text-gray-500">
                            <p>Delivery Fee</p>
                            <p className="font-semibold text-gray-800">Rs.{deliveryFee}.00</p> 
                        </div>
                        <hr className="border-gray-50" />
                        <div className="flex justify-between font-black text-xl text-gray-900 pt-2">
                            <p>Total</p>
                            <p className="text-pink-600">Rs.{totalAmount}.00</p> 
                        </div>
                    </div>
                    <button
                        className="mt-10 bg-gray-900 hover:bg-black text-white font-bold py-4 px-4 rounded-2xl w-full transition-all duration-300 shadow-lg shadow-gray-200 uppercase tracking-widest text-sm"
                        onClick={() => navigate('/order')}
                    >
                        Proceed to Checkout
                    </button>
                </div>

                {/* Promo Code Section */}
                <div className="flex-1">
                    <p className="text-gray-500 mb-4 font-medium">If you have a promo code, enter it here:</p>
                    <div className="flex gap-2">
                        <input 
                            type="text" 
                            placeholder="Promo code" 
                            className="bg-gray-100 border-none outline-none p-4 rounded-2xl flex-1 text-sm"
                        />
                        <button className="bg-pink-100 text-pink-600 font-bold px-8 rounded-2xl hover:bg-pink-200 transition-colors">
                            Apply
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;