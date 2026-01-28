
import React, { useContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Add from '../components/Add/Add.jsx';
import List from '../components/List/List.jsx'; 
import Orders from '../components/Orders/Orders.jsx'; 
import { AdminAuthContext } from "../../context/AdminAuthContext.jsx"; 


const Admin = () => {
    const navigate = useNavigate();
    
    const { adminToken, adminRole, isLoading } = useContext(AdminAuthContext); 
    
 
    useEffect(() => {
        if (!isLoading) {
            if (!adminToken || adminRole !== 'admin') {
                console.error("Access denied. Please log in as an Admin.");
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