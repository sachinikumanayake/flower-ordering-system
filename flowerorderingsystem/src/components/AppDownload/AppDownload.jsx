import React from "react"
import { assets } from "../../assets/assets"
const AppDownload = () => {
    return(
         <div className="m-auto mt-[100px] " id="app-Download">
            <p className="text-4xl text-center font-semibold">For Better Experience Download <br/> Pink App </p>
    <div className="flex justify-center gap-5 mt-[40px] cursor-pointer ">

        <img className="mb-4 transform hover:scale-105 shadow-[0_0_10px_rgba(0,0,0,0.1)] transition-all duration-300 animate-fadeIn  w-[200px] " src={assets.google} alt=""  />
        <img  className="mb-4 transform hover:scale-105 shadow-[0_0_10px_rgba(0,0,0,0.1)] transition-all duration-300 animate-fadeIn w-[200px]" src={assets.app} alt=""  />
    </div>

         </div>
    )
}
export default AppDownload