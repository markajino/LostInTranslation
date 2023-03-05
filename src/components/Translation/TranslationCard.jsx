import React from "react";

const TranslationCard = ({ name }) => {
  const nameArr = name
    ? name
        .toLowerCase()
        .replace(/[^A-Za-z]+/g, "_")
        .split("")
    : [];
  return (
    <div>
      {nameArr?.map((item) => {
        if (item !== "_") {
          return <img src={`/images/${item}.png`} alt={item} />;
        }
        return <></>;
      })}
    </div>
  );
};

export default TranslationCard;
