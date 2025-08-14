import React, { useContext } from "react"
import { assets } from "../../assets/assets"
import { StoreContext } from "../../context/StoreContext"

const BoquetItem = ({id,name,price,description,image}) => {

const{ cartItems,addToCart,removeCart,url} = useContext(StoreContext);
    return(

        <div className=" w-full mx-auto rounded-[15px] shadow-[0_0_10px_rgba(0,0,0,0.1)] transition-all duration-300 animate-fadeIn p-4 bg-white ">
            <div className="relative  ">
                <img className=" w-full rounded-t-[15px] " src={url+"/images/"+image} alt="" />
               {!cartItems[id]
               ?<img className="rounded-full right-[25px] bottom-[15px]  absolute w-[40px]  cursor-pointer " onClick={()=>addToCart(id)} src={assets.add} alt=""  />
               :<div className=" absolute bottom-[15px] right-[25px] flex items-center gap-[1px] p-[4px] rounded-full bg-white">
                <img className=" w-10   cursor-pointer" onClick={()=>removeCart(id)} src={assets.remove} alt=""/>
                <p className="text-[16px] font-semibold">{cartItems[id]}</p>
                <img className="w-11  cursor-pointer " onClick={()=>addToCart(id)} src={assets.add1} alt=""/>
                </div>} 
            </div>
   <div className=" p-5">
    <div className=" flex justify-start items-start mb-[10px]">
  <p className=" text-[15px] font-medium">{name}</p>
  <img className=" w-[60px] " src={assets.raiting1} alt="" />

    </div>
    <p className="text-[12px] text-[#676767]
">{description}</p>
    <p className=" text-[22px] font-medium text-[tomato] my-2.5
">R{price}</p>
   </div>

        </div>
    )
}
export default BoquetItem