import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { StoreContext } from "../../../../shared/context/StoreContext";
import { assets } from '../../assets/assets.js';

const MyOrders = () => {
    // Access global state from StoreContext
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Function to fetch order history from the backend
    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await axios.post(url + "/api/order/userorders", {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setData(response.data.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };

    // Trigger fetch on component mount or when token changes
    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    return (
       
        <div className='bg-[#f8f9fa] min-h-screen pt-28 pb-20'>
            <div className='max-w-[1200px] mx-auto p-5 font-sans'>
                
                {/* HEADER SECTION */}
                <div className='flex items-center justify-between mb-10'>
                    <div>
                        <h2 className='text-3xl font-extrabold text-gray-900 tracking-tight'>My Orders</h2>
                        <p className='text-gray-500 mt-1 italic'>Track and manage your floral deliveries</p>
                    </div>
                    <button 
                        onClick={fetchOrders}
                        className='text-sm bg-white border border-gray-200 px-5 py-2 rounded-full shadow-sm hover:shadow-md hover:bg-pink-50 hover:text-pink-600 transition-all duration-300 font-semibold text-gray-700'
                    >
                        Refresh List
                    </button>
                </div>

                {loading ? (
                    <div className='flex justify-center py-20 italic text-gray-400'>Loading orders...</div>
                ) : data.length === 0 ? (
                    <div className='text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm'>
                        <img src={assets.bag} alt="empty" className='w-20 mx-auto opacity-10 mb-4' />
                        <p className='text-gray-400 font-medium'>Your order history is empty.</p>
                    </div>
                ) : (
                    <div className='flex flex-col gap-6'>
                        {data.map((order, index) => (
                            <div 
                                key={index} 
                                className='group relative grid grid-cols-1 md:grid-cols-[1.2fr_3fr_1.5fr_1fr_1.5fr] items-center gap-6 p-6 border border-gray-100 rounded-3xl bg-white shadow-sm hover:shadow-xl transition-all duration-500'
                            >
                                {/* 1. PRODUCT IMAGE */}
                                <div className='flex justify-center overflow-hidden rounded-2xl bg-[#f8f9fa] p-2'>
                                    <img 
                                        src={url + "/images/" + order.items[0].image} 
                                        alt="bouquet" 
                                        className='w-24 h-24 md:w-28 md:h-28 object-cover rounded-xl group-hover:scale-110 transition-transform duration-700' 
                                    />
                                </div>

                                {/* 2. ITEM DETAILS */}
                                <div className='flex flex-col gap-2'>
                                    <p className='font-bold text-gray-800 text-lg leading-snug'>
                                        {order.items.map((item, idx) => (
                                            <span key={idx}>
                                                {item.name} <span className='text-pink-500 font-medium text-sm'>x{item.quantity}</span>
                                                {idx === order.items.length - 1 ? "" : ", "}
                                            </span>
                                        ))}
                                    </p>
                                </div>

                                {/* 3. PRICING */}
                                <div>
                                    <p className='text-[10px] text-gray-400 mb-1 uppercase font-bold tracking-widest'>Total Paid</p>
                                    <p className='font-black text-gray-900 text-xl'>Rs.{order.amount.toFixed(2)}</p>
                                </div>

                                {/* 4. COUNT */}
                                <div className='hidden md:block text-center'>
                                    <p className='text-[10px] text-gray-400 mb-1 uppercase font-bold tracking-widest'>Quantity</p>
                                    <p className='font-bold text-gray-600'>{order.items.length} {order.items.length > 1 ? 'Units' : 'Unit'}</p>
                                </div>

                                {/* 5. STATUS BADGE */}
                                <div className='flex justify-center md:justify-end'>
                                    <div className={`px-6 py-3 rounded-2xl flex items-center gap-3 border transition-all duration-300 ${
                                        order.status === "Order Processing" 
                                        ? " border-pink-100 text-pink-600 shadow-sm" 
                                        : " border-green-100 text-green-600 shadow-sm" 
                                    }`}>
                                        <span className='relative flex h-3 w-3'>
                                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${order.status === "Order Processing" ? "bg-pink-400" : "bg-green-400"}`}></span>
                                            <span className={`relative inline-flex rounded-full h-3 w-3 ${order.status === "Order Processing" ? "bg-pink-500" : "bg-green-500"}`}></span>
                                        </span>
                                        <b className='font-extrabold text-xs uppercase tracking-widest'>{order.status}</b>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrders;