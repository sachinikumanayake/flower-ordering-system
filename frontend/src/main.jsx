import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import StoreContextProvider from 'shared-context/context/StoreContext.jsx'
import AdminAuthContextProvider from '../../admin/src/context/AdminAuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AdminAuthContextProvider>
        <StoreContextProvider>
            <App />
        </StoreContextProvider>
    </AdminAuthContextProvider>
  </BrowserRouter>
);