import React from "react"
import Navbar from "./component/Navbar/Navbar"
import Sidebar from "./component/Sidebar/Sidebar"
import { Routes,Route } from "react-router-dom"
import List from "./pages/List/List"
import Orders from "./pages/Orders/Orders"
import Add from "./pages/Add/Add"
import { ToastContainer } from 'react-toastify'
const App = () => {
  return (
    <div>
      <ToastContainer/>
 <Navbar/>
 <hr className="border-t border-gray-800 " />

 <div className="flex">
  <Sidebar/>
 
<Routes>
  <Route path="/add" element={<Add/>}/>
   <Route path="/list" element={<List/>}/>
   <Route path="/orders" element={<Orders/>}/>
</Routes>
 </div>
    </div>
  )
}
export default App