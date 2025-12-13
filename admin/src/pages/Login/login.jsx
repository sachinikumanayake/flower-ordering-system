// client/admin/pages/Login/Login.jsx (FIXED: TypeError: saveToken is not a function)

import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AdminAuthContext } from "../../context/AdminAuthContext"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentState, setCurrentState] = useState("Login"); 

  const navigate = useNavigate();
  
  // 🛑 FIX: saveToken is replaced by the correct function from context: loginAdmin
  const { loginAdmin, url } = useContext(AdminAuthContext); 

  const handleAuth = async (e) => {
    e.preventDefault();
    const formData = { email, password };

    if (currentState === "Login") {
        // 🔑 Use the Context Login function
        const result = await loginAdmin(formData); 

        if (result.success) {
            toast.success("Login Successful!");
            navigate("/"); // Redirect to Dashboard after successful login
        } else {
            toast.error(result.message || "Login Failed!");
        }

    } else {
        // 🟢 Register Logic 
        const registerUrl = `${url}/admin/register`; 
        try {
            const response = await axios.post(registerUrl, formData);

            if (response.data.success) {
                toast.success(response.data.message || "Registration Successful! You can now Login.");
                setCurrentState("Login"); 
                setEmail("");
                setPassword("");
            } else {
                toast.error(response.data.message || "Registration Failed!");
            }
        } catch (err) {
            console.error(err);
            toast.error("Server error during registration.");
        }
    }
  };

  return (
    // ... (JSX is unchanged) ...
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-96 p-6 bg-white rounded shadow">
        <h2 className="text-2xl mb-4 font-bold text-center">Admin {currentState}</h2>

        <form onSubmit={handleAuth}>
          <label>Email</label>
          <input
            type="email"
            className="border p-2 w-full mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            className="border p-2 w-full mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="bg-blue-600 text-white w-full p-2 rounded">
            {currentState} 
          </button>
        </form>

        {/* Register/Login Toggle Link */}
        <div className="mt-4 text-center">
          {currentState === "Login" ? (
            <p>
              New Admin?{" "}
              <span
                onClick={() => setCurrentState("Register")}
                className="text-blue-600 cursor-pointer font-bold"
              >
                Click here to Register
              </span>
            </p>
          ) : (
            <p>
              Already an Admin?{" "}
              <span
                onClick={() => setCurrentState("Login")}
                className="text-blue-600 cursor-pointer font-bold"
              >
                Login here
            </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;