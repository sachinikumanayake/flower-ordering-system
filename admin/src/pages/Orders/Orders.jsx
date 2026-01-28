import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FiTrash2, FiPackage, FiTruck, FiCheckCircle, FiClock, FiMapPin } from "react-icons/fi";
import Swal from "sweetalert2";

const Orders = ({ url, adminToken }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (err) {
      toast.error("Something went wrong while fetching orders.");
    } finally {
      setLoading(false);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: event.target.value,
      });
      if (response.data.success) {
        await fetchOrders();
        toast.success("Delivery Status Updated");
      }
    } catch (error) {
      toast.error("Status update failed");
    }
  };

  const removeOrder = async (orderId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This order will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.post(`${url}/api/order/remove`, { orderId });
          if (response.data.success) {
            toast.success("Order removed");
            await fetchOrders();
          }
        } catch (err) {
          toast.error("Error removing order");
        }
      }
    });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Order Placed": return "bg-blue-50 text-blue-600 border-blue-100";
      case "Processing": return "bg-amber-50 text-amber-600 border-amber-100";
      case "Out for delivery": return "bg-purple-50 text-purple-600 border-purple-100";
      case "Delivered": return "bg-emerald-50 text-emerald-600 border-emerald-100";
      default: return "bg-gray-50 text-gray-600";
    }
  };

  return (
    <div className="p-4 sm:p-8 bg-[#fcfcfd] min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">
              Delivery <span className="text-pink-600">Management</span>
            </h2>
            <p className="text-gray-500 font-medium mt-1">Track and update customer order status.</p>
          </div>
          <div className="flex gap-4">
             <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
                <FiPackage className="text-pink-500 text-xl" />
                <span className="text-gray-900 font-black text-xl">{orders.length} <span className="text-xs text-gray-400 font-bold uppercase ml-1 tracking-widest">Total Orders</span></span>
             </div>
          </div>
        </div>

        {/* List Display */}
        <div className="space-y-6">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-pink-100 border-t-pink-600 rounded-full animate-spin"></div>
            </div>
          ) : orders.length > 0 ? (
            orders.map((order, index) => (
              <div
                key={index}
                className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-[0.8fr_2.5fr_1.5fr_1.5fr] gap-8 items-start">
                  
                  {/* Order Icon/Image */}
                  <div className="flex flex-col items-center justify-center bg-gray-50 rounded-[2rem] p-6 group-hover:bg-pink-50 transition-colors">
                    <FiPackage className="text-4xl text-pink-600 mb-2" />
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Order ID</span>
                    <span className="text-xs font-bold text-gray-800">#{order._id.slice(-6)}</span>
                  </div>

                  {/* Order Details */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-black text-gray-900 mb-2">
                        {order.items.map((item, idx) => (
                          <span key={idx}>
                            {item.name} <span className="text-pink-500 text-sm">x{item.quantity}</span>
                            {idx !== order.items.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </h3>
                      <div className="flex items-start gap-2 text-gray-500 text-sm bg-gray-50 p-4 rounded-2xl border border-gray-100">
                        <FiMapPin className="mt-1 flex-shrink-0 text-pink-500" />
                        <p className="leading-relaxed">
                          <span className="font-bold text-gray-800">{order.address.fullName}</span><br />
                          {order.address.address}, {order.address.city}, {order.address.phone}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="flex flex-col justify-center h-full space-y-3">
                    <div className="flex items-center gap-2 text-gray-500 font-medium">
                      <FiClock /> <span>Items: {order.items.length}</span>
                    </div>
                    <div className="text-2xl font-black text-gray-900">
                      <span className="text-sm font-medium text-gray-400 mr-1">Total:</span>
                      Rs.{order.amount.toLocaleString()}
                    </div>
                  </div>

                  {/* Status Action */}
                  <div className="flex flex-col gap-3 self-center">
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-bold text-xs uppercase tracking-widest ${getStatusColor(order.status)}`}>
                       {order.status === "Delivered" ? <FiCheckCircle /> : <FiTruck className="animate-pulse" />}
                       {order.status}
                    </div>

                    <select
                      onChange={(e) => statusHandler(e, order._id)}
                      value={order.status}
                      className="w-full bg-gray-50 border border-gray-200 text-gray-700 font-bold text-sm p-3 rounded-xl outline-none focus:border-pink-300 transition-all cursor-pointer"
                    >
                      <option value="Order Placed">Order Placed</option>
                      <option value="Processing">Processing</option>
                      <option value="Out for delivery">Out for delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>

                    <button
                      onClick={() => removeOrder(order._id)}
                      className="flex items-center justify-center gap-2 text-xs font-bold text-red-400 hover:text-red-600 transition-colors mt-2"
                    >
                      <FiTrash2 /> Remove Order
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-gray-200">
              <FiPackage className="mx-auto text-5xl text-gray-200 mb-4" />
              <p className="text-gray-400 font-bold text-xl">No orders to display.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;