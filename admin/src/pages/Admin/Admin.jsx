// admin/src/pages/Admin/Admin.jsx

import React, { useContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
// Components import කරන්න
import Add from '../components/Add/Add.jsx';
import List from '../components/List/List.jsx'; 
import Orders from '../components/Orders/Orders.jsx'; 
// Context import කරන්න
import { AdminAuthContext } from "../../context/AdminAuthContext.jsx"; 


const Admin = () => {
    const navigate = useNavigate();
    
    // ✅ 1. Context වෙතින් Token, Role, සහ Loading State එක ලබා ගන්න
    const { adminToken, adminRole, isLoading } = useContext(AdminAuthContext); 
    
    // ----------------------------------------------------
    // 💡 2. Authentication පරීක්ෂාව සහ Redirect කිරීම
    // ----------------------------------------------------
    useEffect(() => {
        // Loading අවසන් වූ පසු (isLoading === false) පමණක් පරීක්ෂා කරන්න.
        if (!isLoading) {
            // Token එක හිස් නම් හෝ Role එක 'admin' නොවේ නම් redirect කරන්න.
            if (!adminToken || adminRole !== 'admin') {
                console.error("Access denied. Please log in as an Admin.");
                // ඔබගේ root route එකට redirect කරන්න. 
                // ඔබගේ App.jsx හි admin route එක සකසා ඇති ආකාරය අනුව, මෙය '/' හෝ '/login' විය හැකියි.
                navigate('/');
            }
        }
    }, [isLoading, adminToken, adminRole, navigate]); 


    
    if (isLoading) {
        return <div className="p-10 text-center">Loading Admin Dashboard...</div>; 
    }


    if (!adminToken || adminRole !== 'admin') {
         return null; 
    }
    

    return (
        <div className='admin-dashboard flex'>
            {/* Sidebar component එක මෙතන තිබිය යුතුයි (ඔබේ App.jsx එකේ Sidebar එක වෙනම තියෙන්න ඇති)
            <Sidebar /> 
            */}
            
            <div className="admin-content w-full p-4">
                
                <Routes>
                    <Route path='add' element={<Add />} /> 
                    <Route path='list' element={<List />} />
                    <Route path='orders' element={<Orders />} />
                    
                    <Route index element={<Add />} /> 
                </Routes>
            </div>
        </div>
    );
};

export default Admin;