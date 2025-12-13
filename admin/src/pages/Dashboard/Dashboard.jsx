import React from "react";

const Dashboard = () => {
  return (
    <div className="w-full">

      {/* Background Section */}
      <div className="bg-gradient-to-r from-pink-200 via-red-300 to-pink-100 p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-gray-700">Welcome Admin 🌸</h1>
        <p className="text-gray-600 mt-2">
          Manage your flower store with ease.
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">

        <div className="bg-white bg-gradient-to-r from-amber-300 via-green-500 to-pink-100 shadow-lg p-6 rounded-xl border border-pink-100">
          <h2 className=" text-xl font-semibold text-gray-700">Total Products</h2>
          <p className="mt-3 text-3xl font-bold text-pink-600">128</p>
        </div>

        <div className="bg-white bg-white bg-gradient-to-r from-purple-600 via-cyan-400 to-pink-100  shadow-lg p-6 rounded-xl border border-pink-100">
          <h2 className="text-xl font-semibold text-gray-700">Pending Orders</h2>
          <p className="mt-3 text-3xl font-bold text-yellow-500">12</p>
        </div>

        <div className="bg-white bg-white bg-gradient-to-r from-amber-300 via- to-pink-100  shadow-lg p-6 rounded-xl border border-pink-100">
          <h2 className="text-xl font-semibold text-gray-700">Completed Orders</h2>
          <p className="mt-3 text-3xl font-bold text-green-600">87</p>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;
