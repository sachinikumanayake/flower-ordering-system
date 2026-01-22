import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "shared-context"; 

const BoquetItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeCart, url } = useContext(StoreContext); 

  const isBackendImage = typeof image === 'string' && !image.startsWith('data:');
  const fullImageUrl = isBackendImage ? `${url}/images/${image}` : image; 

  return (
    <div className="w-[220px] bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col p-4 border border-gray-100">
      
      <div className="relative overflow-hidden rounded-lg">
          <img
            src={fullImageUrl} 
            alt={name}
            className="w-full h-[200px] object-cover hover:scale-110 transition duration-500"
          />
          
          <div className=" bottom-2 mt-2 right-2">
              {!cartItems[id] ? (
                <img
                className="w-8 h-8 cursor-pointer hover:scale-110 transition rounded-full border-2 border-gray-300 bg-transparent object-contain"                 
                onClick={() => addToCart(id)}
                  src={assets.add}
                  alt="Add"
                />
              ) : (
                <div className="flex items-center gap-1 bg-transparent rounded-full p-1">
                  <img
                    className="w-8 h-8 cursor-pointer object-contain "
                    onClick={() => removeCart(id)}
                    src={assets.remove}
                    alt="Remove"
                  />
                  <p className="text-xs font-bold px-1 text-gray-800">{cartItems[id]}</p>
                  <img
                    className="w-8 h-8 cursor-pointer object-contain"
                    onClick={() => addToCart(id)}
                    src={assets.add1}
                    alt="Add more"
                  />
                </div>
              )}
          </div>
      </div>

      <div className="mt-3">
          <p className="text-sm font-bold text-gray-800 line-clamp-1">{name || "Flower Bouquet"}</p>
          <p className="text-xs text-gray-500 mt-1 line-clamp-1 italic">{description}</p>
          <img src={assets.raiting1} alt="Rating" className="w-20 mt-2" />
          <div className="flex justify-between items-center mt-2">
              <p className="text-pink-600 text-base font-bold">R{price}</p>
          </div>
      </div>
    </div>
  );
};

export default BoquetItem;