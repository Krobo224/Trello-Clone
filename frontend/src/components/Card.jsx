import React from "react";
import { useState } from "react";

const Card = ({ cardInfo }) => {
  const [currCardInfo, setCardInfo] = useState(cardInfo);
  const updateTitle = (e) => {
    setCardInfo({
      ...currCardInfo,
      title: e,
    });
  };
  return (
    <div className="bg-white p-2 mt-2 shadow-md rounded-md">
      <input
        type="text"
        defaultValue={cardInfo.title}
        text={currCardInfo.title}
        onSubmit={updateTitle}
      />
    </div>
  );
};

export default Card;
