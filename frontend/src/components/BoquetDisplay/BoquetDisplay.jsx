import React, { useContext } from "react";
import { StoreContext } from "shared-context";
import BoquetItem from "../BoquetItem/BoquetItem";

const BoquetDisplay = ({ category }) => {
  const { boquet_list, search } = useContext(StoreContext);

  if (!Array.isArray(boquet_list) || boquet_list.length === 0) {
    return <p className="text-center py-10">Loading bouquets...</p>; 
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] mt-[30px] gap-[30px] gap-y-[50px]">
      {boquet_list.map((item) => {
        const matchesCategory = category === "All" || category.toLowerCase().trim() === item.category.toLowerCase().trim();
        
        const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());

        if (matchesCategory && matchesSearch) {
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