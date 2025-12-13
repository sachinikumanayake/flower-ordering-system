import React, { useContext } from 'react';
import { StoreContext } from 'shared-context';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
 // 🛑 FIX: StoreContext වෙතින් 'url' එක ලබා ගන්න
 const { cartItems, boquet_list, removeCart, getTotalCartAmount, url } = useContext(StoreContext);
 const navigate = useNavigate();

 
  const deliveryFee = 450;
  const subTotal = getTotalCartAmount();
  const totalAmount = subTotal + deliveryFee;

  if (subTotal === 0) {
    return (
      <div className="pt-8 px-4 md:px-10">
        <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
        <p className="text-gray-600">Your cart is empty. Please add some bouquets!</p>
        <button
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          onClick={() => navigate('/')}
        >
          GO TO SHOPPING
        </button>
      </div>
    );
  }

  return (
    <div className="pt-8 px-4 md:px-10">
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>

      {/* Header Row */}
      <div className="hidden md:grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center py-4 border-b-4 border-amber-500 text-sm font-medium">
        <p>Items</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>

      {/* Cart Items */}
      {boquet_list.map((item) => {
        if (cartItems[item._id] > 0) {
          // 🛑 FIX: සම්පූර්ණ URL එක මෙහිදී සාදා ගන්න
          const fullImageUrl = `${url}/images/${item.image}`; 
          
          return (
            <div key={item._id} className="py-4 border-b border-gray-200">
             {/* පෙර පිළිතුරේ දුන් Grid Fix එක ද මෙහි තිබේ. (Desktop & Mobile) */}
             <div className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr_0.5fr] md:grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center gap-2 text-sm">
               {/* 🛑 FIX: src එකට fullImageUrl එක භාවිතා කරන්න */}
                <img src={fullImageUrl} alt={item.name} className="w-[80px] h-[80px] object-cover" /> 
                <p>{item.name}</p>
                <p className="hidden md:block">R{item.price}</p> 
                <p className="hidden md:block">{cartItems[item._id]}</p>
                <p className="hidden md:block">R{item.price * cartItems[item._id]}</p>
                <p onClick={() => removeCart(item._id)} className="cursor-pointer text-red-500 font-bold">X</p>
              </div>
            </div>
          );
        }
        return null;
      })}

      {/* Bottom Section */}
      <div className="mt-10 flex flex-col md:flex-row gap-8">
        {/* Cart Totals */}
        <div className="flex-1">
          <h2 className="font-bold text-lg mb-4">Cart Totals</h2>
          <div className="space-y-4 text-slate-500">
          <div className="flex justify-between border-b pb-2">
              <p>Subtotal</p>
              <p>R{subTotal}</p> 
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
          <button
            className="mt-6 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded w-full sm:w-[200px]"
            onClick={() => navigate('/order')}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>

        {/* Promo Code */}
        <div className="flex-1">
          <p className="mb-4 text-gray-700">If you have a promo code, enter it here:</p>
          <div className="flex gap-2 items-center rounded bg-slate-100 p-2">
            <input
              type="text"
              placeholder="Promo Code"
              className="border border-gray-300 outline-none px-3 py-2 bg-transparent flex-1 rounded"
            />
            <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;