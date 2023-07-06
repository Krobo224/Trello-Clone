import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const Card = ({ cardInfo, setState, state }) => {
  const listItem = useSelector((store) => store.listSlice.list);
  const [currCardInfo, setCardInfo] = useState(cardInfo);

  const updateTitle = (e) => {
    const columnIndex = state.findIndex(
      (item) => item.id === cardInfo.parent
    );
    const newArray = [...state];
    
    const childrens = Array.from(newArray[columnIndex].children);
    const childrenIndex = childrens.findIndex(
      (item) => item.id === cardInfo.id
    );
    childrens[childrenIndex].title = e.target.value;
    console.log("newarray ", newArray);
    
    setState(newArray);
    // setCardInfo({
    //   ...currCardInfo,
    //   title: e,
    // });

  };
  return (
    <div className="bg-white p-2 mt-2 shadow-md rounded-md">
      <input
        type="text"
        defaultValue={cardInfo.title}
        text={currCardInfo.title}
        onChange={updateTitle}
      />
    </div>
  );
};

export default Card;
