
import React, { useContext, useEffect } from "react"; 
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import axios from 'axios'; 

import StoreContextProvider from "../../shared/context/StoreContext.jsx"; 
import AdminAuthContextProvider, {
  AdminAuthContext,
} from "./context/AdminAuthContext"; 

import AdminLayout from "./layout/AdminLayout";

import Dashboard from "./pages/Dashboard/Dashboard";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import Login from "./pages/Login/login";

const AppContent = () => {
  const url = "http://localhost:4000"; 
  const { adminToken } = useContext(AdminAuthContext); 

  useEffect(() => {
    if (adminToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${adminToken}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [adminToken]); 

  return (
    <>
      <ToastContainer />
      <Routes>
        {!adminToken ? (
          <Route path="*" element={<Login />} /> 
        ) : (
          <Route path="/" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="add" element={<Add />} /> 
            <Route path="list" element={<List url={url} adminToken={adminToken} />} />
            <Route path="orders" element={<Orders url={url} />} />
          </Route>
        )}
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <StoreContextProvider> 
      <AdminAuthContextProvider>
        <AppContent />
      </AdminAuthContextProvider>
    </StoreContextProvider>
  );
};

export default App;