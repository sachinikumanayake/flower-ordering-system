import React, { useState } from "react";
import axios from "axios";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";

const Add = ({url}) => {
 
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSumbitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    try {
      const response = await axios.post(`${url}/api/flower/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
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
      console.error("🔥 Axios Error:", error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="p-6 sm:p-10 max-w-3xl mx-auto w-full">
      <form className="flex flex-col gap-6" onSubmit={onSumbitHandler}>
        {/* Image Upload */}
        <div className="text-black">
          <p className="mb-2">Upload Image</p>
          <label
            htmlFor="image"
            className="w-20 h-20 flex items-center justify-center border border-dashed border-gray-600 rounded cursor-pointer hover:border-red-400 transition"
          >
            <img
              src={image ? URL.createObjectURL(image) : assets.upload}
              key={image ? image.name : "default"}
              alt=""
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

        {/* Product Name */}
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

        {/* Product Description */}
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

        {/* Category & Price - responsive layout */}
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Category */}
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
              <option value="Birth day">Birth Day</option>
              <option value="Funeral">Funeral</option>
              <option value="Wedding">Wedding</option>
              <option value="Mothers day">Mother's Day</option>
              <option value="Lovers day">Lover's Day</option>
            </select>
          </div>

          {/* Price */}
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

        {/* Submit Button */}
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
