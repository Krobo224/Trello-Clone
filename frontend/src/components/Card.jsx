import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateList } from "../store/listSlice";

const Card = ({ cardInfo, setState, state }) => {
  const listItem = useSelector((store) => store.listSlice.list);
  const [currCardInfo, setCardInfo] = useState(cardInfo);
  const dispatch = useDispatch();

  const updateTitle = (id, parentId, e) => {
    const updatedState = state.map((item) => {
      if (item.id === parentId) {
        console.log("lol here");
        return {
          ...item,
          children: item.children.map((child) => {
            console.log("meow");
            console.log(child, id);
            if (child.id === id) {
              console.log("comes here");
              return { ...child, title: e.target.value };
            } else {
              return child;
            }
          }),
        };
      } else {
        return item;
      }
    });

    dispatch(updateList(updatedState));
    setState(updatedState);
  };
  return (
    <div className="bg-white p-2 mt-2 shadow-md rounded-md">
      <input
        type="text"
        defaultValue={cardInfo.title}
        text={currCardInfo.title}
        onChange={(e) => updateTitle(cardInfo.id, cardInfo.parentId, e)}
      />
    </div>
  );
};

export default Card;
