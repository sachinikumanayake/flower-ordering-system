import React, { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
// LoginPopup.jsx eke meka danna
import { StoreContext } from "../../../../shared/context/StoreContext";
import axios from "axios";

const Login = ({ setShowLogin }) => {
  // StoreContext eken loginUser function eka ganna
  const { url, setToken, loginUser } = useContext(StoreContext);
  
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  
  const [message, setMessage] = useState("");      
  const [loading, setLoading] = useState(false);   

  // Popup eka open/close wena wita data reset kirima
  useEffect(() => {
    setData({ name: "", email: "", password: "" });
    setCurrState("Login");
    setMessage("");
  }, [setShowLogin]);

  // Login/Sign Up state maru wena wita data reset kirima
  useEffect(() => {
    setData({ name: "", email: "", password: "" });
    setMessage("");
  }, [currState]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Main Login function eka
  const onLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    // Context eke thiyena loginUser function eka call kirima
    const result = await loginUser(data, currState);

    if (result.success) {
      setMessage("Success!");
      // Seconds 1.5 kin pasuwa popup eka close kirima
      setTimeout(() => {
        setShowLogin(false);
      }, 1500);
    } else {
      // Error message eka penwima
      setMessage(result.message);
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 grid min-h-screen">
      <form
        onSubmit={onLogin}
        autoComplete="off" 
        className="place-self-center w-full max-w-[330px] bg-white flex flex-col gap-6 px-[30px] py-[25px] border-gray-300 shadow-md rounded-lg text-sm animate-fadeIn"
      >
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-lg">{currState}</h2>
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
              className="border border-solid border-gray-300 px-4 py-2 rounded outline-pink-500"
            />
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your email"
            required
            className="border border-gray-300 px-4 py-2 rounded outline-pink-500"
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Your password"
            required
            autoComplete="new-password" 
            className="border border-solid border-gray-300 px-4 py-2 rounded outline-pink-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`cursor-pointer bg-[#130b0a] text-white text-[15px] px-4 py-2 rounded-full transition-all hover:bg-black ${
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
          <input type="checkbox" required className="mt-[5px] cursor-pointer" />
          <p className="text-xs text-gray-600">By Continuing, I agree to the terms of use & privacy policy.</p>
        </div>

        {message && (
          <p
            className={`text-center text-xs ${
              message === "Success!" ? "text-green-600" : "text-red-600"
            } font-medium`}
          >
            {message}
          </p>
        )}

        {currState === "Login" ? (
          <p className="text-xs text-gray-600">
            Create a new account?{" "}
            <span
              onClick={() => setCurrState("Sign Up")}
              className="text-pink-600 font-bold cursor-pointer hover:underline"
            >
              Click here
            </span>
          </p>
        ) : (
          <p className="text-xs text-gray-600">
            Already have an account?{" "}
            <span
              onClick={() => setCurrState("Login")}
              className="text-pink-600 font-bold cursor-pointer hover:underline"
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