import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({url}) => {
  
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/flower/list`)
      if (response.data.success) {
        setList(response.data.data)
      } else {
        toast.error("Error fetching flowers")
      }
    } catch (err) {
      console.error("List fetch error:", err)
      toast.error("Something went wrong.")
    }
  }
  const removeFlower = async(flowerId) =>{
const response = await axios.post(`${url}/api/flower/remove`,{id:flowerId})
await fetchList();
if(response.data.success){
    toast.success(response.data.message)

}  
else{
    toast.error("Error")
}}

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-[24px] font-bold text-gray-800 mb-6">All Flowers List</h2>
      <div className="w-full border border-gray-300 rounded-md overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-[1.5fr_2fr_1fr_1fr_0.5fr] bg-gray-100 px-4 py-3 font-semibold text-gray-700">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span>Action</span>
        </div>

        {list.map((item, index) => (
         <div
         key={index}
         className="flex flex-col sm:grid sm:grid-cols-[1.5fr_2fr_1fr_1fr_0.5fr] gap-4 px-4 py-3 border-t border-gray-200"
       >
         <img
           src={`${url}/images/${item.image}`}
           alt=""
           className="w-20 h-20 object-cover rounded self-center sm:self-auto"
         />
         <p className="text-gray-800">{item.name}</p>
         <p className="text-gray-600">{item.category}</p>
         <p className="text-gray-800">Rs {item.price}</p>
         <button onClick={()=>removeFlower(item._id)} className="text-red-500 font-bold hover:scale-110 transition self-end sm:self-auto">X</button>
       </div>
       
        ))}
      </div>
    </div>
  );
};

export default List;