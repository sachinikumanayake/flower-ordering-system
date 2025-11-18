// src/context/StoreContext.jsx
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { boquet_list as localBoquets } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [boquet_list, setBoquetList] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
  const url = "http://localhost:4000";

  // 🟢 Add item to cart
  // StoreContext.jsx (Recommended changes)

// ... states
const [token, setToken] = useState(localStorage.getItem("token") || "");
// const [userId, setUserId] = useState(localStorage.getItem("userId") || ""); // ❌ මෙය ඉවත් කරන්න

// 🟢 Add item to cart
const addToCart = async (itemId) => {
    setCartItems((prev) => ({
        ...prev,
        [itemId]: (prev[itemId] || 0) + 1,
    }));
    if (token) {
        // flowerId සහ quantity පමණක් යවන්න.
        // User ID එක Back-end එකේදී token එකෙන් ගන්න.
        await axios.post(url + "/api/cart/add", { flowerId: itemId, quantity: 1 }, { headers: { token } });
    }
};

// ... removeCart එකේද එසේ කරන්න

// removeCart function එකේදී quantity 1 අඩු කිරීම සඳහා වෙනම API call එකක් යැවිය යුතුය.
const removeCart = async (itemId) => {
    setCartItems((prev) => {
        const updatedCart = { ...prev };
        if (updatedCart[itemId] > 1) {
            updatedCart[itemId] -= 1;
        } else {
            delete updatedCart[itemId];
        }
        return updatedCart;
    });

    if (token) {
        // flowerId පමණක් යවන්න
        await axios.post(url + "/api/cart/remove", { flowerId: itemId }, { headers: { token } });
    }
};;

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        const itemInfo = boquet_list.find((product) => product._id === itemId);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[itemId];
        }
      }
    }
    return totalAmount;
  };


  const fetchBoquetList = async () => {
    console.log("Fetching bouquets from:", `${url}/api/flower/list`);
    try {
      const response = await axios.get(`${url}/api/flower/list`);
      console.log("API Response:", response.data);

      const backendData = response.data?.data || [];
      setBoquetList([...localBoquets, ...backendData]);
    } catch (error) {
      console.error("API call failed:", error);
      // API fail → show only local data
      setBoquetList(localBoquets);
    }
  };

  useEffect(() => {
    fetchBoquetList();
  }, []);

  const contextValue = {
    boquet_list,
    cartItems,
    setCartItems,
    addToCart,
    removeCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
