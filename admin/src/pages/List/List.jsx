import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

 const List =() =>{
    const url = "http://localhost:4000"
    const [list,setList] = useState([]);
    const fetchList = async () => {
        const response = await axios.get(`${url}/api/flower/list`);
        console.log(response.data);
        
        if (response.data.success){
            setList(response.data.data);

        }
        else{
            toast.error("Error")
        }
    }   
    useEffect(()=>{
        fetchList();
    },[])
    return (
        <div className="list ad fl">
            <p>All Flower List</p>
            <div className="lta">
            <div className="ltft">
                <b>Image</b>
                <b>Name</b>
                <b>Category</b>
                <b>Price</b>
                <b>Action</b>
            </div>
            {list.map((item,index)=>{
                return(
                 <div key ={index} className="grid grid-cols-[0.5fr_2fr_1fr_0.5fr] items-center gap-[10px] px-[15px] py-[12px] border border-[#cacaca]">
                    <img src={`${url}/images/`+item.image} alt=""  />
                    <p>{item.name}</p>
                    <p>{item.category}</p>
                    <p>R{item.price}</p>
                    <p>X</p>
                    
                    </div>
                )
            })}

           


        </div>
        </div>
    )
}
    export default List