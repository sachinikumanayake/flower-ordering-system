import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import BoquetItem from "../BoquetItem/BoquetItem";

const BoquetDisplay = ({ category }) => {
  const { boquet_list } = useContext(StoreContext);

  if (!Array.isArray(boquet_list) || boquet_list.length === 0) {
    return <p>Loading bouquets...</p>;
  }

  return (
    <div className="grid [grid-template-columns:repeat(auto-fill,minmax(240px,1fr))] mt-[30px] gap-[30px] gap-y-[50px]">

      {boquet_list.map((item) => {
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
