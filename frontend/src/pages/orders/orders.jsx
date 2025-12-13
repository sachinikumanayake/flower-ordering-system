// src/pages/Orders/Orders.jsx
import React, { useContext, useState } from 'react';
import { StoreContext } from 'shared-context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const { getTotalCartAmount, token, boquet_list, cartItems, url, setCartItems } = useContext(StoreContext);
  const navigate = useNavigate();
  
  const deliveryFee = 450;
  const totalAmount = getTotalCartAmount() + deliveryFee;

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  }

  const placeOrder = async (event) => {
    event.preventDefault(); 

    let orderData = {
      address: data,
      items: boquet_list
        .filter(item => cartItems[item._id] > 0)
        .map(item => ({
          name: item.name,
          itemId: item._id,
          price: item.price,
          quantity: cartItems[item._id]
        })),
      amount: totalAmount,
    }

    let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });

    if (response.data.success) {
      setCartItems({}); 
      navigate('/payment-success'); 
      alert("oerder success.");
    } else {
      alert("Please try again!");
    }
  }

  return (
    <form onSubmit={placeOrder} className='flex items-start justify-between gap-[50px] mt-[100px] flex-col md:flex-row p-4'>
      <div className="w-full max-w-[500px] mx-auto md:mx-0">
        <p className='text-[30px] font-bold mb-[50px]'>Delivery Information</p>
        <div className='flex flex-col gap-3'>
          <div className="flex gap-4">
            <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' className='p-2 border border-[#c5c5c5] rounded-md outline-none w-full' />
            <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' className='p-2 border border-[#c5c5c5] rounded-md outline-none w-full' />
          </div>
          <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email Address' className='p-2 border border-[#c5c5c5] rounded-md outline-none w-full' />
          <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' className='p-2 border border-[#c5c5c5] rounded-md outline-none w-full' />
          <div className="flex gap-4">
            <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' className='p-2 border border-[#c5c5c5] rounded-md outline-none w-full' />
            <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' className='p-2 border border-[#c5c5c5] rounded-md outline-none w-full' />
          </div>
          <div className="flex gap-4">
            <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip Code' className='p-2 border border-[#c5c5c5] rounded-md outline-none w-full' />
            <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' className='p-2 border border-[#c5c5c5] rounded-md outline-none w-full' />
          </div>
          <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' className='p-2 border border-[#c5c5c5] rounded-md outline-none w-full' />
        </div>
      </div>

      {/* 💰 Cart Totals */}
      <div className="w-full max-w-[400px] mx-auto md:mx-0 mt-12 md:mt-0">
        <div className="flex-1">
          <h2 className="font-bold text-lg mb-4">Cart Totals</h2>
          <div className="space-y-4 text-slate-500">
            <div className="flex justify-between border-b pb-2">
              <p>Subtotal</p>
              <p>R{getTotalCartAmount()}</p>
            </div>
            <div className="flex justify-between border-b pb-2">
              <p>Delivery Fee</p>
              <p>R{deliveryFee}</p>
            </div>
            <div className="flex justify-between font-semibold text-slate-700 border-b pb-2">
              <p>Total</p>
              <p>R{totalAmount}</p>
            </div>
 </div>

          <button type='submit' className="mt-6 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded w-full">
            PLACE ORDER ({`R${totalAmount}`})
          </button>
        </div>
      </div>
    </form>
  );
}

export default Orders;