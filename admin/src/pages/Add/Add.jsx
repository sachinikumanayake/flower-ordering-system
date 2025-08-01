// src/pages/Add/Add.js
import React, { useState } from "react";
import axios from "axios";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";

const Add = () => {
  const url = "http://localhost:4000";
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
    <div className="text-[16px] text-[#6d6d6d] ml-[max(5vw,25px)] mt-[50px] w-[70%]">
      <form className="flex flex-col gap-[20px]" onSubmit={onSumbitHandler}>
        <div className="w-[40px] text-black">
          <p>Upload Image</p>
          <label
            htmlFor="image"
            className="w-[50px] h-[50px] flex items-center justify-center border border-dashed border-gray-600 rounded cursor-pointer hover:border-red-400 transition"
          >
            <img
              src={image ? URL.createObjectURL(image) : assets.upload}
              key={image ? image.name : "default"}
              alt=""
              className="w-[40px] h-[40px] opacity-60"
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

        <div className="w-[max(40%,280px)]">
          <p className="text-black">Product Name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
            required
            className="p-[10px] border border-gray-300 rounded resize-none focus:outline-none focus:ring-1 focus:ring-red-400"
          />
        </div>

        <div className="w-[max(40%,280px)] text-black">
          <p>Product Description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write content here"
            required
            className="p-[10px] border border-gray-300 rounded resize-none focus:outline-none focus:ring-1 focus:ring-red-400"
          ></textarea>
        </div>

        <div className="flex gap-[20px]">
          <div className="p-[10px] border border-gray-300 rounded flex flex-col w-[max(40%,200px)] text-black">
            <p>Product Category</p>
            <select
              name="category"
              onChange={onChangeHandler}
              value={data.category}
              required
              className="ml-5"
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

          <div className="flex ml-20 p-2 border border-gray-300 rounded">
            <p className="text-black">Product Price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="R200"
              required
              className="ml-5 hover:border-red-400 focus:outline-none focus:ring-1 focus:ring-red-400"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 px-6 py-2 w-full max-w-[280px] bg-slate-600 text-black cursor-pointer border-none hover:bg-slate-700"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default Add;

