import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AdminAuthContext = createContext(null);

const AdminAuthContextProvider = ({ children }) => {
    const [adminToken, setAdminToken] = useState(localStorage.getItem("adminToken") || ""); 
    const [adminRole, setAdminRole] = useState(localStorage.getItem("adminRole") || "");
    
    const [isInitialLoading, setIsInitialLoading] = useState(true); 

    const url = "http://localhost:4000"; 
    
    const logoutAdmin = () => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminRole");
        setAdminToken("");
        setAdminRole("");
    };

    useEffect(() => {
        setIsInitialLoading(false);
    }, []);

    const loginAdmin = async (formData) => {
        try {
            const response = await axios.post(url + "/admin/login", formData);
            
            if (response.data.success) {
                localStorage.setItem("adminToken", response.data.token);
                localStorage.setItem("adminRole", response.data.role || "admin"); 
                
                setAdminToken(response.data.token);
                setAdminRole(response.data.role || "admin");
                
                return { success: true, message: "Admin Login successful" };
            } else {
                return { success: false, message: response.data.message };
            }
        } catch (error) {
            console.error("Admin Login API call failed:", error);
            return { success: false, message: "Login failed due to server error" };
        }
    };

    const contextValue = {
        url, 
        adminToken, 
        setAdminToken,
        adminRole,
        isLoading: isInitialLoading, 
        loginAdmin, 
        logoutAdmin,
    };

    return (
        <AdminAuthContext.Provider value={contextValue}>
            {children}
        </AdminAuthContext.Provider>
    );
};

export default AdminAuthContextProvider;