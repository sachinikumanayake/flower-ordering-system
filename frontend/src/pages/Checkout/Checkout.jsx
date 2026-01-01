import React, { useContext, useState } from 'react';
import axios from 'axios';
import { StoreContext } from "../../../../shared/context/StoreContext";
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const { getTotalCartAmount, token, boquet_list, cartItems, url, setCartItems } = useContext(StoreContext);
    const navigate = useNavigate();
    
    const deliveryFee = 450; 
    const subTotal = getTotalCartAmount();
    const totalAmount = subTotal + deliveryFee;

    const [data, setData] = useState({
        fullName: "",
        phone: "",
        address: "",
        country: "",
        city: "",
    });

    const [cardData, setCardData] = useState({
        cardNumber: "",
        expiry: "",
        cvv: ""
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const onCardChangeHandler = (event) => {
        const { name, value } = event.target;
        setCardData(prev => ({ ...prev, [name]: value }));
    };

 // ... කලින් තිබූ imports ඒ ආකාරයෙන්ම තබන්න

const placeOrder = async (event) => {
    event.preventDefault();
    
    let orderItems = [];
    boquet_list.forEach((item) => {
        if (cartItems[item._id] > 0) {
            let itemInfo = { ...item, quantity: cartItems[item._id] };
            orderItems.push(itemInfo);
        }
    });

    // මෙහිදී cardData (cardNumber, expiry, cvv) එකතු කර යවන්න
    let orderData = {
        address: data,
        items: orderItems,
        amount: totalAmount,
        cardInfo: cardData 
    };

    try {
        let response = await axios.post(url + "/api/order/place", orderData, {
            headers: { Authorization: `Bearer ${token}` } 
        });

        if (response.data.success) {
            alert("✅ Order Placed Successfully!");
            setCartItems({}); 
            navigate('/myorders'); 
        } else {
            alert("❌ " + response.data.message);
        }
    } catch (error) {
        alert("Something went wrong. Make sure backend is running.");
    }
};

    return (
        <form onSubmit={placeOrder} className='max-w-[1100px] mx-auto my-10 p-5 font-sans bg-gray-50 rounded-lg'>
            <div className='grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8'>
                <div className='space-y-6'>
                    <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100'>
                        <h3 className='text-xl font-bold mb-5'>Delivery Address</h3>
                        <div className='space-y-4'>
                            <input required name='fullName' onChange={onChangeHandler} value={data.fullName} type="text" placeholder='Full Name' className='w-full p-2 border rounded-md outline-green-400' />
                            <div className='grid grid-cols-2 gap-4'>
                                <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone Number' className='w-full p-2 border rounded-md outline-green-400' />
                                <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' className='w-full p-2 border rounded-md outline-green-400' />
                            </div>
                            <input required name='address' onChange={onChangeHandler} value={data.address} type="text" placeholder='Address' className='w-full p-2 border rounded-md outline-green-400' />
                            <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' className='w-full p-2 border rounded-md outline-green-400' />
                        </div>
                    </div>

                    <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100'>
                        <h3 className='text-xl font-bold mb-5'>Payment Card Details</h3>
                        <div className='space-y-4 p-4 bg-blue-50 rounded-lg'>
                            <input required type="text" name="cardNumber" onChange={onCardChangeHandler} value={cardData.cardNumber} placeholder='Card Number' className='w-full p-2 border rounded outline-blue-400' />
                            <div className='grid grid-cols-2 gap-4'>
                                <input required type="text" name="expiry" onChange={onCardChangeHandler} value={cardData.expiry} placeholder='MM/YY' className='p-2 border rounded outline-blue-400' />
                                <input required type="text" name="cvv" onChange={onCardChangeHandler} value={cardData.cvv} placeholder='CVV' className='p-2 border rounded outline-blue-400' />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit'>
                    <h3 className='text-xl font-bold mb-5'>Your Order Summary</h3>
                    <div className='space-y-3 border-t pt-4'>
                        <div className='flex justify-between'><p>Subtotal</p><p>Rs.{subTotal.toFixed(2)}</p></div>
                        <div className='flex justify-between'><p>Delivery</p><p>Rs.{deliveryFee.toFixed(2)}</p></div>
                        <div className='flex justify-between text-lg font-bold border-t pt-3'><p>Total</p><p>Rs.{totalAmount.toFixed(2)}</p></div>
                    </div>
                    <button type='submit' className='w-full mt-6 bg-green-700 text-white py-3 rounded-full font-bold hover:bg-green-800 transition-all'>
                        CONFIRM & PLACE ORDER
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Checkout;