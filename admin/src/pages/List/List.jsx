import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FiTrash2, FiLayers, FiDollarSign, FiTag } from "react-icons/fi";
import Swal from "sweetalert2";

const List = ({ url, adminToken }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/api/flower/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching flowers");
      }
    } catch (err) {
      toast.error("Something went wrong while fetching the list.");
    } finally {
      setLoading(false);
    }
  };

  const removeFlower = async (flowerId) => {
    if (!adminToken) {
      toast.error("Not logged in. Admin login required.");
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.post(
            `${url}/api/flower/remove`,
            { id: flowerId },
            { headers: { Authorization: `Bearer ${adminToken}` } }
          );

          if (response.data.success) {
            toast.success("Flower removed successfully");
            await fetchList();
          } else {
            toast.error(response.data.message || "Failed to remove item.");
          }
        } catch (err) {
          toast.error("Error removing item.");
        }
      }
    });
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-black text-gray-800 tracking-tight">
              Inventory <span className="text-pink-600">List</span>
            </h2>
            <p className="text-gray-500 font-medium">Manage your flower stock and pricing.</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-gray-100">
            <span className="text-gray-400 text-sm font-bold uppercase tracking-widest">Total Items: </span>
            <span className="text-pink-600 font-black text-xl">{list.length}</span>
          </div>
        </div>

        {/* Table Header - Desktop Only */}
        <div className="hidden md:grid grid-cols-[1fr_2.5fr_1.5fr_1.5fr_0.5fr] items-center bg-white border border-gray-100 rounded-2xl px-6 py-4 mb-4 shadow-sm text-gray-400 font-bold text-xs uppercase tracking-widest">
          <span>Product</span>
          <span>Name</span>
          <span className="flex items-center gap-2"><FiTag /> Category</span>
          <span className="flex items-center gap-2"><FiDollarSign /> Price</span>
          <span className="text-center">Action</span>
        </div>

        {/* List Display */}
        <div className="space-y-4">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-pink-200 border-t-pink-600 rounded-full animate-spin"></div>
            </div>
          ) : list.length > 0 ? (
            list.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-[1fr_2.5fr_1.5fr_1.5fr_0.5fr] items-center gap-4 md:gap-6 bg-white px-6 py-4 rounded-[2rem] border border-gray-50 shadow-sm hover:shadow-md transition-all group"
              >
                {/* Image */}
                <div className="flex justify-center md:justify-start">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden ring-4 ring-pink-50 group-hover:ring-pink-100 transition-all">
                    <img
                      src={`${url}/images/${item.image}`}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>

                {/* Name */}
                <div>
                  <p className="text-lg font-bold text-gray-800 group-hover:text-pink-600 transition-colors">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-400 md:hidden uppercase font-bold tracking-tighter mt-1">Flower Name</p>
                </div>

                {/* Category */}
                <div className="flex items-center gap-2">
                  <span className="bg-gray-50 text-gray-600 text-sm font-semibold px-4 py-1.5 rounded-full border border-gray-100">
                    {item.category}
                  </span>
                </div>

                {/* Price */}
                <div>
                  <p className="text-xl font-black text-gray-900">
                    <span className="text-sm font-medium text-gray-400 mr-1">Rs.</span>
                    {item.price.toLocaleString()}
                  </p>
                </div>

                {/* Action */}
                <div className="flex justify-center md:justify-end">
                  <button
                    onClick={() => removeFlower(item._id)}
                    className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300 shadow-sm hover:shadow-red-200"
                  >
                    <FiTrash2 size={20} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-gray-200 text-gray-400">
              <FiLayers className="mx-auto mb-4 text-4xl opacity-20" />
              <p className="font-bold">No flowers found in inventory.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default List;