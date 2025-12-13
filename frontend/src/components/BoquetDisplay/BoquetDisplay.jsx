// client/src/pages/Home/BoquetDisplay.jsx (Cleaned Code)

import React, { useContext } from "react";
import { StoreContext } from "shared-context";
import BoquetItem from "../BoquetItem/BoquetItem";

const BoquetDisplay = ({ category }) => {
  const { boquet_list } = useContext(StoreContext);

  // Display a loading message if the list is empty or not yet an array
  if (!Array.isArray(boquet_list) || boquet_list.length === 0) {
    // 💡 If the list is empty, it might show "Loading bouquets..." or nothing if empty after load
    // If you see "Loading bouquets..." constantly, check your backend /api/flower/list route.
    return <p>Loading bouquets...</p>; 
  }

  return (
    <div className="grid [grid-template-columns:repeat(auto-fill,minmax(240px,1fr))] mt-[30px] gap-[30px] gap-y-[50px]">
      {/* Map through the list to display items */}
      {boquet_list.map((item) => {
        // Filter by category or display all if category is 'All'
        if (category === "All" || category === item.category) {
          return (
            <BoquetItem
              key={item._id}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          );
        }
        return null;
      })}
    </div>
  );
};

export default BoquetDisplay;