import React from "react";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="flex flex-col items-center text-white bg-black pt-6 px-4 sm:px-6 md:px-10 lg:px-20" id="footer">
    
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 bg-black">

        
        <div className="flex flex-col gap-4 bg-black">
          <img className="w-20 bg-black" src={assets.flowers} alt="Pink Blossom" />
          <p className="text-sm font-light text-white bg-black">
            🌸 "Bringing joy, one bouquet at a time. Handcrafted with love, delivered with care. Thank you for letting us be part of your special moments. For questions or custom arrangements, contact our support. Stay connected on social media for floral trends and offers."
          </p>
          <div className="flex gap-4 mt-2 bg-black">
            <img className="w-10 bg-black hover:scale-110 transition" src={assets.facebook} alt="Facebook" />
            <img className="w-10 bg-black hover:scale-110 transition" src={assets.twitter} alt="Twitter" />
            <img className="w-10 bg-black hover:scale-110 transition" src={assets.linkedin} alt="LinkedIn" />
          </div>
        </div>

        
        <div className="flex flex-col gap-2 bg-black">
          <h2 className=" bg-black  font-bold text-lg mb-2">COMPANY</h2>
          <ul className="bg-black space-y-1 text-sm cursor-pointer">
            <li className="hover:text-pink-400 bg-black">Home</li>
            <li className="hover:text-pink-400 bg-black">About Us</li>
            <li className="hover:text-pink-400 bg-black">Delivery</li>
            <li className="hover:text-pink-400 bg-black">Privacy Policy</li>
          </ul>
        </div>

        <div className="flex flex-col gap-2 bg-black">
          <h2 className="font-bold text-lg mb-2 bg-black">GET IN TOUCH</h2>
          <ul className="space-y-1 text-sm bg-black text-white
          ">
            <li className=" bg-black">📞 0763434567</li>
            <li className=" bg-black">📧 contact@pink.com</li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <hr className="w-full my-6 border-gray-600" />

      {/* Footer Bottom */}
      <p className="text-sm bg-black text-white text-center font-extralight pb-4">
        © 2025 Pink.com - All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
