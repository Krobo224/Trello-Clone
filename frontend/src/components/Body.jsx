import React, { useState } from "react";
// import Filter from "./Filter";
import List from "./List";



const Body = () => {
  return (
    <div className="p-3 w-full border">
      {/* <Filter /> */}
      <div className="flex flex-wrap ">
        <List />
      </div>
    </div>
  );
};

export default Body;
