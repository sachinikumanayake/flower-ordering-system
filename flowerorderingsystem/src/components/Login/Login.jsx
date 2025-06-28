import React, { useState } from "react"
import { assets } from "../../assets/assets"

const Login = ({setShowLogin}) => {
 const [currState,setCurrState] = useState("Login")
    return (

        <div className="fixed inset-0 z-10 bg-black bg-opacity-60 grid">
  <form className=" place-self-center w-full max-w-[330px] text-[#000000090] bg-white flex flex-col gap-6 px-[30px] py-[25px] border-gray-300 shadow-md rounded-lg text-sm animate-fadeIn">
    <div className="flex justify-between items-center">
 <h2 className="font-bold">{currState}</h2>
<img onClick={ ()=>setShowLogin(false) } src={assets.close} alt=""  className="width-full cursor-pointer"  />
    </div>
    <div className="flex flex-col gap-10">
     
    {currState==="Login"?<></>:<input type="text" placeholder="Your name" required className= " border  border-solid border-gray-300 px-4 py-2 rounded" />}
<input type="email" placeholder="Your email" required  className= " border border-gray-300 px-4 py-2 rounded" />
<input type="password" placeholder="Your password" required className= " border  border-solid border-gray-300 px-4 py-2 rounded" />
    </div>
    <button className= " cursor-pointer bg-[tomato] text-white text-[15px] border  border-gray-300 px-4 py-2 rounded-full">{currState==="Sign Up"?"Create account":"Login"} </button>
  
  <div className="flex items-start gap-[8px] mt-[-15px]">
    <input type="checkbox" required className="mt-[5px]"/>
    <p>By Continuning, i agree to the terms of use & privacy policy.</p>
    </div>
    {currState==="Login"
    ?<p >Create a new account? <span onClick={()=>setCurrState("Sign Up")} className="text-teal-500 font-medium cursor-pointer">Click here</span></p>
 :<p>Already have an account? <span onClick={()=>setCurrState("Login")} className="text-teal-500 font-medium cursor-pointer">Login here</span></p>}
    
    </form>
</div>
    )
}
export default Login