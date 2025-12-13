import React from "react"
import { assets } from "../../assets/assets"; 

const Navbar = () => {
  return (
    <div className="flex flex-col bg-[#fcfcfc] justify-between items-center p-1">
      <div className="flex justify-between w-full items-center">
        <img className="w-[50px] ml-5 mt-5" src={assets.admin} alt="Admin" />
        <img className="w-[30px] mr-5 mt-2 rounded-full" src={assets.boy} alt="Boy" />
      </div> 
    </div>
  )
}

export default Navbar