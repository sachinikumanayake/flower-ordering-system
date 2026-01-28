import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AdminAuthContext } from "../../context/AdminAuthContext";
import { FiMail, FiLock, FiArrowRight, FiUserPlus, FiLogIn } from "react-icons/fi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentState, setCurrentState] = useState("Login");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { loginAdmin, url } = useContext(AdminAuthContext);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = { email, password };

    if (currentState === "Login") {
      const result = await loginAdmin(formData);
      if (result.success) {
        toast.success("Welcome back! Login Successful.");
        navigate("/");
      } else {
        toast.error(result.message || "Invalid credentials.");
      }
    } else {
      const registerUrl = `${url}/api/admin/register`;
      try {
        const response = await axios.post(registerUrl, formData);
        if (response.data.success) {
          toast.success("Account created! Please login.");
          setCurrentState("Login");
          setEmail("");
          setPassword("");
        } else {
          toast.error(response.data.message || "Registration failed.");
        }
      } catch (err) {
        toast.error("Server error. Please try again.");
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff5f7] relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-80 h-80 bg-rose-200 rounded-full blur-3xl opacity-50"></div>

      <div className="w-full max-w-md z-10 px-4">
        <div className="bg-white/80 backdrop-blur-lg border border-white shadow-2xl rounded-[2.5rem] p-10 mt-10">
          
          {/* Logo/Header Section */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-pink-500 to-rose-600 rounded-2xl shadow-lg shadow-pink-200 mb-4">
              <span className="text-white text-3xl font-bold">P</span>
            </div>
            <h2 className="text-3xl font-black text-gray-800 tracking-tight">
              Pink Flora <span className="text-pink-600">Admin</span>
            </h2>
            <p className="text-gray-500 mt-2 font-medium">
              {currentState === "Login" ? "Sign in to manage your store" : "Create a new admin account"}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
              <div className="relative group">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-pink-500 transition-colors" />
                <input
                  type="email"
                  required
                  placeholder="admin@pinkflora.com"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-pink-300 focus:bg-white transition-all text-gray-700"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Password</label>
              <div className="relative group">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-pink-500 transition-colors" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-pink-300 focus:bg-white transition-all text-gray-700"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-bold py-4 rounded-2xl shadow-xl shadow-pink-200 flex items-center justify-center gap-2 transform transition hover:scale-[1.02] active:scale-95 disabled:opacity-70"
            >
              {loading ? (
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  {currentState === "Login" ? <FiLogIn /> : <FiUserPlus />}
                  {currentState} Admin
                  <FiArrowRight className="ml-1" />
                </>
              )}
            </button>
          </form>

          {/* Switch State Section */}
          <div className="mt-8 text-center">
            <p className="text-gray-500 font-medium">
              {currentState === "Login" ? "Don't have an account?" : "Already have an admin account?"}
            </p>
            <button
              onClick={() => setCurrentState(currentState === "Login" ? "Register" : "Login")}
              className="mt-2 text-pink-600 font-extrabold hover:text-pink-700 transition-colors underline underline-offset-4"
            >
              {currentState === "Login" ? "Click here to Register" : "Back to Login"}
            </button>
          </div>
        </div>
        
        {/* Footer Note */}
        <p className="text-center text-gray-400 text-xs mt-8 uppercase tracking-widest font-bold">
          &copy; 2026 Pink Flora Flower Store
        </p>
      </div>
    </div>
  );
};

export default Login;