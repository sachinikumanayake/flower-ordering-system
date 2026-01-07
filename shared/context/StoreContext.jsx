
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
            if (response.data.success) {
                setBoquetList(response.data.data);
            }
        } catch (error) {
            console.error("API error while fetching bouquets:", error);
        }
    };
    
    const loadCartData = async (token) => {
        try {
            const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
            if (response.data.success) {
                setCartItems(response.data.cartData);
            }
        } catch (error) {
            console.error("Could not load cart data:", error);
        }
    };

    // 3. Add Item to Cart
    const addToCart = (itemId) => {
        setCartItems((prev) => {
            if (!prev[itemId]) {
                return { ...prev, [itemId]: 1 };
            } else {
                return { ...prev, [itemId]: prev[itemId] + 1 };
            }
        });
    };

    // 4. Remove Item from Cart
    const removeCart = (itemId) => {
        setCartItems((prev) => {
            const newCart = { ...prev };
            newCart[itemId] -= 1;
            if (newCart[itemId] <= 0) {
                delete newCart[itemId];
            }
            return newCart;
        });
    };

    // 5. Calculate Total Cart Amount
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        if (!boquet_list) return 0; 
        
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
    
    // 6. User Login Function
    const loginUser = async (formData) => {
        try {
            const response = await axios.post(url + "/api/user/login", formData);
            
            if (response.data.success) {
                const userRole = response.data.role || 'user';
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("role", userRole); 
                setToken(response.data.token);
                setRole(userRole);
                await loadCartData(response.data.token); 
                return { success: true, message: "Login successful" };
            } else {
                return { success: false, message: response.data.message || "Login failed" };
            }
        } 
        catch (error) { 
            console.error("Login API call failed:", error);
            return { success: false, message: "Login failed due to server error or network issue" };
        }
    };

    // 7. User Logout Function
    const logoutUser = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role"); 
        setToken("");
        setRole("");
        setCartItems({});
    };

    // 8. Initial Load Effect
    useEffect(() => {
        fetchBoquetList();

        const storedToken = localStorage.getItem("token");
        const storedRole = localStorage.getItem("role") || ""; 
        
        if (storedToken) {
            setToken(storedToken);
            setRole(storedRole); 
            loadCartData(storedToken);
        }
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