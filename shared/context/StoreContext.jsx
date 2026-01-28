import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const url = "http://localhost:4000";
    const [cartItems, setCartItems] = useState({});
    const [boquet_list, setBoquetList] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [role, setRole] = useState(localStorage.getItem("role") || "");
    const [search, setSearch] = useState("");

    const fetchBoquetList = async () => {
        try {
            const response = await axios.get(url + "/api/flower/list");
            if (response.data.success) setBoquetList(response.data.data);
        } catch (error) {
            console.error("API error while fetching bouquets:", error);
        }
    };

    const loadCartData = async (userToken) => {
        try {
            const response = await axios.post(url + "/api/cart/get", {}, {
                headers: { Authorization: `Bearer ${userToken}` }
            });
            if (response.data.success) {
                setCartItems(response.data.cartData || {});
            }
        } catch (error) {
            console.log("Cart Load Error:", error.message);
        }
    };

    const addToCart = async (itemId) => {
        setCartItems((prev) => {
            const currentCart = prev ? { ...prev } : {};
            return { ...currentCart, [itemId]: (currentCart[itemId] || 0) + 1 };
        });

        if (token) {
            try {
                await axios.post(url + "/api/cart/add", { itemId }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } catch (error) {
                console.error("Add to cart backend error:", error);
            }
        }
    };

    const removeCart = async (itemId) => {
        setCartItems((prev) => {
            const currentCart = prev ? { ...prev } : {};
            if (!currentCart[itemId]) return currentCart;
            const newCart = { ...currentCart };
            if (newCart[itemId] > 1) {
                newCart[itemId] -= 1;
            } else {
                delete newCart[itemId];
            }
            return newCart;
        });

        if (token) {
            try {
                await axios.post(url + "/api/cart/remove", { itemId }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } catch (error) {
                console.error("Error removing from cart backend:", error);
            }
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = boquet_list.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    const loginUser = async (formData, currState) => {
        try {
            const endpoint = currState === "Login" ? "/api/user/login" : "/api/user/register";
            const response = await axios.post(url + endpoint, formData);
            if (response.data.success) {
                const userToken = response.data.token;
                const userRole = response.data.role || 'user';
                setToken(userToken);
                setRole(userRole);
                localStorage.setItem("token", userToken);
                localStorage.setItem("role", userRole);
                await loadCartData(userToken);
                return { success: true };
            }
            return { success: false, message: response.data.message };
        } catch (error) {
            return { success: false, message: "Server connection error" };
        }
    };

    const logoutUser = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setToken("");
        setRole("");
        setCartItems({});
    };

    useEffect(() => {
        async function loadData() {
            await fetchBoquetList();
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
                await loadCartData(storedToken);
            }
        }
        loadData();
    }, []);

    const contextValue = {
        boquet_list, cartItems, setCartItems, addToCart, removeCart,
        getTotalCartAmount, url, token, setToken, role, loginUser,
        logoutUser, search, setSearch
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;