import React, { useContext } from "react"
import { StoreContext } from "../../context/StoreContext"
import BoquetItem from "../BoquetItem/BoquetItem"


const BoquetDisplay = ({category}) => {

const { boquet_list} = useContext(StoreContext)

 return(
<div className=" mt-[30px] ">
    <h2 className="text-lg font-semibold ">Most-Loved Flowers Around You"</h2>
  <div className="grid gap-x-[30px] gap-y-[50px] mt-[30px]"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))"
        }} >
  {boquet_list.map((item,index)=>{
  if(category==="All" || category===item.category ){
    return <BoquetItem key={index} id={item._id} name={item.name} description = {item.description} price = {item.price} image = {item.image} />
  }

   
  })}
</div>
</div>
 )

}
export default BoquetDisplay