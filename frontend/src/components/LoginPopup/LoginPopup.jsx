import React, { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from 'shared-context';
import axios from "axios";

const Login = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");      
  const [loading, setLoading] = useState(false);   

  
  useEffect(() => {
    setData({ name: "", email: "", password: "" });
    setCurrState("Login");
    setMessage("");
  }, [setShowLogin]);

  
  useEffect(() => {
    setData({ name: "", email: "", password: "" });
    setMessage("");
  }, [currState]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (!url) {
        console.error("Backend URL is undefined");
        alert("Backend URL is not configured properly.");
        setLoading(false);
        return;
      }

      const endpoint = currState === "Login" ? "/api/user/login" : "/api/user/register";
      const response = await axios.post(`${url}${endpoint}`, data);

      console.log("API Response:", response.data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);

        setMessage("Your details have been saved successfully!");  

       
        setTimeout(() => {
          setShowLogin(false);
          setMessage("");
        }, 2000);
      } else {
        setMessage(response.data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Login/Register Error:", error);
      setMessage("Something went wrong while connecting to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-60 grid min-h-screen">
      <form
        onSubmit={onLogin}
        autoComplete="off" 
        className="place-self-center w-full max-w-[330px] text-[#000000090] bg-white flex flex-col gap-6 px-[30px] py-[25px] border-gray-300 shadow-md rounded-lg text-sm animate-fadeIn"
      >
        <div className="flex justify-between items-center">
          <h2 className="font-bold">{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.close}
            alt="Close"
            className="w-4 h-4 cursor-pointer"
          />
        </div>

        <div className="flex flex-col gap-4">
          {currState === "Sign Up" && (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your name"
              required
              autoComplete="off"
              className="border border-solid border-gray-300 px-4 py-2 rounded"
            />
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your email"
            required
            autoComplete="off"
            className="border border-gray-300 px-4 py-2 rounded"
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Your password"
            required
            autoComplete="new-password" 
            className="border border-solid border-gray-300 px-4 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`cursor-pointer bg-[#130b0a] text-white text-[15px] border border-gray-300 px-4 py-2 rounded-full ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {loading
            ? currState === "Sign Up"
              ? "Creating..."
              : "Logging in..."
            : currState === "Sign Up"
            ? "Create account"
            : "Login"}
        </button>

        <div className="flex items-start gap-[8px] mt-[-10px]">
          <input type="checkbox" required className="mt-[5px]" />
          <p>By Continuing, I agree to the terms of use & privacy policy.</p>
        </div>

        {message && (
          <p
            className={`text-center ${
              message.includes("successfully") ? "text-green-600" : "text-red-600"
            } font-medium`}
          >
            {message}
          </p>
        )}

        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span
              onClick={() => setCurrState("Sign Up")}
              className="text-teal-500 font-medium cursor-pointer"
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => setCurrState("Login")}
              className="text-teal-500 font-medium cursor-pointer"
            >
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;