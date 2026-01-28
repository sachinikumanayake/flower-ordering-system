import React from "react";
import { FiBox, FiTruck, FiCheckCircle, FiTrendingUp, FiUsers, FiDollarSign } from "react-icons/fi"; 

const Dashboard = () => {
  const stats = [
    {
      id: 1,
      title: "Total Products",
      value: "128",
      icon: <FiBox className="text-blue-600 text-2xl" />,
      bg: "bg-blue-50",
      border: "border-blue-100",
      trend: "+12% this month",
    },
    {
      id: 2,
      title: "Pending Orders",
      value: "12",
      icon: <FiTruck className="text-amber-600 text-2xl" />,
      bg: "bg-amber-50",
      border: "border-amber-100",
      trend: "5 urgently needed",
    },
    {
      id: 3,
      title: "Completed Orders",
      value: "87",
      icon: <FiCheckCircle className="text-emerald-600 text-2xl" />,
      bg: "bg-emerald-50",
      border: "border-emerald-100",
      trend: "98% success rate",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-8 font-sans animate-fade-in">
      
      {/* Header / Welcome Section */}
      <div className="relative overflow-hidden bg-white border border-gray-100 p-8 rounded-3xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="z-10">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Welcome back, Admin <span className="animate-bounce inline-block">🌸</span>
          </h1>
          <p className="text-gray-500 mt-2 text-lg">
            Here's what's happening with your <span className="text-pink-600 font-semibold">Pink Flora</span> store today.
          </p>
        </div>
        <div className="flex gap-3 z-10">
          <button className="bg-pink-600 hover:bg-pink-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-pink-200 text-sm">
            Generate Report
          </button>
        </div>
        {/* Background Decorative Element */}
        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-pink-50 rounded-full blur-3xl opacity-60"></div>
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((item) => (
          <div 
            key={item.id} 
            className="group bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex justify-between items-start">
              <div className={`p-4 rounded-2xl ${item.bg}`}>
                {item.icon}
              </div>
              <div className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                Active
              </div>
            </div>
            <div className="mt-5">
              <h2 className="text-gray-500 font-medium text-sm uppercase tracking-wider">{item.title}</h2>
              <div className="flex items-baseline gap-2 mt-1">
                <p className="text-4xl font-black text-gray-900">{item.value}</p>
                <FiTrendingUp className="text-emerald-500" />
              </div>
              <p className="text-xs text-gray-400 mt-3 flex items-center gap-1 italic">
                {item.trend}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions or Recent Activity Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Insights</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div className="flex items-center gap-3">
                <FiUsers className="text-purple-500" />
                <span className="font-medium text-gray-700">Total Customers</span>
              </div>
              <span className="font-bold">1,240</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div className="flex items-center gap-3">
                <FiDollarSign className="text-pink-500" />
                <span className="font-medium text-gray-700">Monthly Revenue</span>
              </div>
              <span className="font-bold">Rs. 45,200.00</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-pink-500 to-rose-600 p-8 rounded-3xl shadow-xl shadow-pink-100 text-white flex flex-col justify-center relative overflow-hidden">
          <h3 className="text-2xl font-bold z-10">Inventory Alert</h3>
          <p className="mt-2 opacity-90 z-10 text-pink-50">
            3 flower varieties are running low on stock. Restock them soon to avoid order delays.
          </p>
          <button className="mt-6 bg-white text-pink-600 px-6 py-2.5 rounded-xl font-extrabold w-fit z-10 hover:bg-pink-50 transition-colors">
            Manage Inventory
          </button>
          {/* Decorative Circles */}
          <div className="absolute bottom-[-20%] right-[-10%] w-40 h-40 bg-white opacity-10 rounded-full"></div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;