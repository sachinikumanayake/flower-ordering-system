// client/src/components/BoquetItem/BoquetItem.jsx (FIXED: Image URL)

import React, { useContext } from "react";
import { assets } from "../../assets/assets";
// Note: StoreContext is imported from 'shared-context' via alias in the provided code. 
import { StoreContext } from "shared-context"; // Assuming the context path is shared-context

const BoquetItem = ({ id, name, price, description, image }) => {
  // 🟢 FIX: Access 'url' from StoreContext to construct the full image URL
  const { cartItems, addToCart, removeCart, url } = useContext(StoreContext); 

  // Construct the full image path
  const fullImageUrl = `${url}/images/${image}`; // Example: http://localhost:4000/images/my_flower.jpg

  return (
    <div className="w-[200px] bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex-col p-4">
      
      {/* Product Image */}
      <img
        // 🛑 FIX APPLIED HERE: Use the full image URL
        src={fullImageUrl} 
        alt={name}
        className="w-[200px] h-[200px] rounded-lg mb-3"
      />

      {/* Add/Remove Cart Button */}
      {!cartItems[id] ? (
        <img
          className="w-8 h-8 rounded-full border-2 border-purple-400 p-2 cursor-pointer hover:scale-110 transition"
          onClick={() => addToCart(id)}
          src={assets.add}
          alt="Add"
        />
      ) : (
        <div className="flex items-center gap-2">
          <img
            className="w-10 cursor-pointer"
            onClick={() => removeCart(id)}
            src={assets.remove}
            alt="Remove"
          />
          <p className="text-lg font-semibold">{cartItems[id]}</p>
          <img
            className="w-10 cursor-pointer"
            onClick={() => addToCart(id)}
            src={assets.add1}
            alt="Add more"
          />
        </div>
      )}

      {/* Product Details */}
      <p className="mt-3 text-center text-sm font-medium">{name}</p>
      <img src={assets.raiting1} alt="Rating" className="w-22 mt-1" />
      <p className="text-[tomato] text-lg font-bold mt-1">R{price}</p>
    </div>
  );
};

export default BoquetItem;