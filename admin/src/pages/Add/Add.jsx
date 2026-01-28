import React, { useContext, useState } from "react"; 
import axios from "axios";
import { toast } from "react-toastify";

import { assets } from "../../assets/assets.js"; 
import { AdminAuthContext } from "../../context/AdminAuthContext.jsx"; 
import { StoreContext } from "../../../../shared/context/StoreContext.jsx"; 

const Add = () => {
    const { token: clientToken, url: storeUrl } = useContext(StoreContext); 
    const { adminToken } = useContext(AdminAuthContext);
    
    const finalUrl = storeUrl; 

    // 2. State Variables
    const [image, setImage] = useState(null); 
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Funeral", 
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };
    
    const onSumbitHandler = async (event) => {
        event.preventDefault();

        const tokenToSend = adminToken || clientToken; 
        
        if (!tokenToSend) { 
            console.error("Authentication Error: Token is missing.");
            toast.error("Authentication Error: Token is missing. Please log in again.");
            return;
        }

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        
        if (image) {
            formData.append("image", image); 
        } else {
            toast.error("Please select an image for the bouquet.");
            return;
        }

        try {
            const response = await axios.post(`${finalUrl}/api/flower/add`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${tokenToSend}`, 
                },
            });

            if (response.data.success) {
                setData({
                    name: "",
                    description: "",
                    price: "",
                    category: "Funeral",
                });
                setImage(null);
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            // 4.4. Detailed Error Handling
            console.error("🔥 Axios Error:", error);
            if (error.response) {
                if (error.response.status === 401 || error.response.status === 403) {
                    toast.error("Authentication Failed: Admin privileges required. Please re-login.");
                } else if (error.response.data && error.response.data.message) {
                    toast.error(`Error: ${error.response.data.message}`);
                } else {
                    toast.error("An unknown server error occurred.");
                }
            } else {
                toast.error("Network Error: Could not connect to server.");
            }
        }
    };

    // 5. JSX Return Block
    return (
        <div className="p-6 sm:p-10 max-w-3xl mx-auto w-full">
            <h2 className="text-xl font-bold mb-6 text-black">Add New Bouquet</h2>
            <form className="flex flex-col gap-6" onSubmit={onSumbitHandler}>
                
                {/* 1. Upload Image */}
                <div className="text-black">
                    <p className="mb-2">Upload Image</p>
                    <label
                        htmlFor="image"
                        className="w-20 h-20 flex items-center justify-center border border-dashed border-gray-600 rounded cursor-pointer hover:border-red-400 transition"
                    >
                        <img
                            src={image ? URL.createObjectURL(image) : assets.upload}
                            key={image ? image.name : "default"}
                            alt="Upload Icon"
                            className="w-10 h-10 opacity-60"
                        />
                    </label>
                    <input
                        onChange={(e) => setImage(e.target.files[0])}
                        type="file"
                        id="image"
                        hidden
                        required
                    />
                </div>

                {/* 2. Product Name */}
                <div className="text-black">
                    <p className="mb-2">Product Name</p>
                    <input
                        onChange={onChangeHandler}
                        value={data.name}
                        type="text"
                        name="name"
                        placeholder="Type here"
                        required
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-400"
                    />
                </div>

                {/* 3. Product Description */}
                <div className="text-black">
                    <p className="mb-2">Product Description</p>
                    <textarea
                        onChange={onChangeHandler}
                        value={data.description}
                        name="description"
                        rows="5"
                        placeholder="Write content here"
                        required
                        className="w-full p-3 border border-gray-300 rounded resize-none focus:outline-none focus:ring-1 focus:ring-red-400"
                    ></textarea>
                </div>

                {/* 4. Category and Price */}
                <div className="flex flex-col sm:flex-row gap-6">
                    <div className="flex-1 text-black">
                        <p className="mb-2">Product Category</p>
                        <select
                            name="category"
                            onChange={onChangeHandler}
                            value={data.category}
                            required
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-400"
                        >
                            <option value="">Select Category</option>
                            <option value="Anniversary">Anniversary</option>
                            <option value="Birthday">Birthday</option>
                            <option value="Funeral">Funeral</option>
                            <option value="Wedding">Wedding</option>
                            <option value="Mothers day">Mothers Day</option>
                            <option value="Lovers day">Lovers Day</option>
                        </select>
                    </div>

                    <div className="flex-1 text-black">
                        <p className="mb-2">Product Price</p>
                        <input
                            onChange={onChangeHandler}
                            value={data.price}
                            type="number"
                            name="price"
                            placeholder="Rs. 200"
                            required
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-400"
                        />
                    </div>
                </div>

                {/* 5. Submit Button */}
                <button
                    type="submit"
                    className="mt-6 px-6 py-3 w-full sm:w-auto bg-slate-700 text-white font-semibold rounded hover:bg-slate-800 transition"
                >
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default Add;