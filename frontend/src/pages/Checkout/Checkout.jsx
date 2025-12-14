import React, { useContext, useState } from 'react';
import axios from 'axios';
import { StoreContext } from "../../../../shared/context/StoreContext"; 

const Checkout = () => {
    const { getTotalCartAmount, token, boquet_list, cartItems, url } = useContext(StoreContext);
    
    const deliveryFee = 500; 
    const subTotal = getTotalCartAmount();
    const totalAmount = subTotal + deliveryFee;

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        street: "",
        city: "",
        country: "",
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    const placeOrder = async (event) => {
        event.preventDefault();

        let orderItems = [];
        
        if (!boquet_list) {
             alert("Flower list is not loaded. Please try again.");
             return; 
        }

        boquet_list.map((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = { ...item }; 
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo);
            }
        });

        let orderData = {
            address: data, 
            items: orderItems, 
            amount: totalAmount, 
        };

        let response = await axios.post(
            url + "/api/order/place-order", 
            orderData, 
            { headers: { token } }
        );

        if (response.data.success) {
            const { session_url } = response.data;
            window.location.replace(session_url) 
        } else {
            alert("Error placing order: " + response.data.message);
        }
    };


    return (
        <form onSubmit={placeOrder} className='max-w-[1200px] mx-auto my-16 p-8'> 
            <h2 className='text-4xl font-extrabold mb-10 text-pink-600'>
                Checkout
            </h2>

            <div className='grid grid-cols-1 lg:grid-cols-[2fr_1.2fr] gap-12'> 
                
                <div className='p-8 shadow-2xl bg-white rounded-xl'>
                    <h3 className='text-3xl font-bold mb-8 text-pink-500 border-b pb-3'>Delivery Information</h3>
                    
                    <div className='space-y-8'>
                        
                        <div>
                            <p className='text-xl font-bold mb-4 text-gray-700'>1. Contact Details</p>
                            
                            <div className="flex gap-4 mb-4">
                                <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' className='w-full p-3 border border-gray-300 rounded-lg focus:outline-pink-400' />
                                <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' className='w-full p-3 border border-gray-300 rounded-lg focus:outline-pink-400' />
                            </div>
                             <div className="flex gap-4">
                                <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email Address' className='w-full p-3 border border-gray-300 rounded-lg focus:outline-pink-400' />
                                <input required name='phone' onChange={onChangeHandler} value={data.phone} type="tel" placeholder='Phone Number' className='w-full p-3 border border-gray-300 rounded-lg focus:outline-pink-400' />
                            </div>
                        </div>

                        <div className='pt-4 border-t border-gray-200'>
                            <p className='text-xl font-bold mb-4 text-gray-700'>2. Shipping Address</p>
                            <div className='w-full mb-4'>
                                <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street Address (e.g., House No / Lane Name)' className='w-full p-3 border border-gray-300 rounded-lg focus:outline-pink-400' />
                            </div>
                            <div className="flex gap-4">
                                <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City / Town' className='w-full p-3 border border-gray-300 rounded-lg focus:outline-pink-400' />
                                <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' className='w-full p-3 border border-gray-300 rounded-lg focus:outline-pink-400' />
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className='p-8 shadow-xl bg-gray-50 rounded-xl h-fit lg:sticky lg:top-8'>
                    <h3 className='text-3xl font-bold mb-6 text-gray-800 border-b pb-3'>
                        Order Summary
                    </h3>
                    
                    <div className='max-h-[300px] overflow-y-auto space-y-4 pr-2'>
                        {boquet_list && boquet_list.map((item) => { 
                            if (cartItems[item._id] > 0) {
                                return (
                                    <div key={item._id} className="flex items-center gap-4 border-b pb-3">
                                        <img 
                                            src={url + "/images/" + item.image} 
                                            alt={item.name} 
                                            className='w-[60px] h-[60px] object-cover rounded-md border border-gray-200' 
                                        />
                                        <div className='flex-1'>
                                            <p className='font-semibold text-gray-800'>{item.name}</p>
                                            <p className='text-sm text-gray-600'>Qty: {cartItems[item._id]} x Rs.{item.price.toFixed(2)}</p>
                                        </div>
                                        <p className='font-bold text-pink-500'>Rs.{(item.price * cartItems[item._id]).toFixed(2)}</p>
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>
                    
                    {/* Totals Summary */}
                    <div className='mt-6 pt-6 border-t border-gray-300 space-y-3'>
                        <div className="flex justify-between text-gray-600">
                            <p>Subtotal</p>
                            <p>Rs.{subTotal.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <p>Delivery Fee</p>
                            <p>Rs.{deliveryFee.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between text-xl font-extrabold text-gray-800 pt-2 border-t border-gray-400">
                            <p>Total Amount</p>
                            <p>Rs.{totalAmount.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </div>

            <button 
                type='submit' 
                className='mt-10 w-full p-4 text-xl font-bold text-white bg-pink-500 rounded-lg hover:bg-pink-600 transition duration-300 shadow-md'
            >
                PROCEED TO PAYMENT
            </button>
        </form>
    );
};

export default Checkout;