import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const url = "http://localhost:4000";
    const [cartItems, setCartItems] = useState({}); // මුලින්ම හිස් object එකක් ලෙස තබා ගැනීම
    const [boquet_list, setBoquetList] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [role, setRole] = useState(localStorage.getItem("role") || "");
    const [search, setSearch] = useState("");

    // සියලුම මල් වර්ග (bouquets) list එක fetch කිරීම
    const fetchBoquetList = async () => {
        try {
            const response = await axios.get(url + "/api/flower/list");
            if (response.data.success) setBoquetList(response.data.data);
        } catch (error) {
            console.error("API error while fetching bouquets:", error);
        }
    };

    // ලොගින් වූ පසු Cart data backend එකෙන් ලබා ගැනීම
    const loadCartData = async (token) => {
        try {
            const response = await axios.post(url + "/api/cart/get", {}, { 
                headers: { Authorization: `Bearer ${token}` } 
            });
            if (response.data.success) {
                // Backend එකෙන් එවන්නේ cartItems නම් එය ලබා ගැනීම
                setCartItems(response.data.cartItems || {}); 
            }
        } catch (error) {
            console.log("Cart Load Error:", error.message);
        }
    };

    // Cart එකට අලුත් item එකක් එකතු කිරීම
    const addToCart = async (itemId) => {
        setCartItems((prev) => {
            // prev undefined වීම වැලැක්වීමට safe check එකක්
            const currentCart = prev ? { ...prev } : {}; 
            return { ...currentCart, [itemId]: (currentCart[itemId] || 0) + 1 };
        });

        if (token) {
            try {
                // Backend එකේ බලාපොරොත්තු වන විදියට itemId යැවීම
                await axios.post(url + "/api/cart/add", { itemId }, { 
                    headers: { Authorization: `Bearer ${token}` } 
                });
            } catch (error) {
                console.error("Error adding to cart backend:", error);
            }
        }
    };

    // Cart එකෙන් item එකක් අඩු කිරීම හෝ ඉවත් කිරීම
    const removeCart = async (itemId) => {
        setCartItems((prev) => {
            const currentCart = prev ? { ...prev } : {};
            if (!currentCart[itemId]) return currentCart;

            const newCart = { ...currentCart };
            newCart[itemId] -= 1;
            if (newCart[itemId] <= 0) delete newCart[itemId];
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

    // Cart එකේ මුළු එකතුව (Total) සෙවීම
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = boquet_list.find((product) => product._id === item);
                if (itemInfo) totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    };

    // Login සහ Register කිරීමේ function එක
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

    // Logout කිරීම
    const logoutUser = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setToken("");
        setRole("");
        setCartItems({});
    };

    // App එක මුලින්ම load වන විට දත්ත fetch කිරීම
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

    // මෙහි setCartItems එක ඇතුළත් කර ඇති බව තහවුරු කරගන්න
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
        role, 
        loginUser, 
        logoutUser, 
        search, 
        setSearch 
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;