"use client";
import React, { useState } from "react";
import { Recipe } from "../types/recipe";
import Image from "next/image";

const Card: React.FC<Recipe> = ({
  name,
  category,
  imageUrl,
  instructions,
  isFavorite,
}) => {
  const [favorite, setFavorite] = useState(isFavorite);

  const toggleFavorite = () => setFavorite((prev) => !prev);

  return (
    <>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-200 dark:border-gray-200">
        <Image
          className="rounded-t-lg"
          src={imageUrl}
          width={100}
          height={200}
          alt={`${name} picture`}
        />
        <div className="p-5">
          <div className="flex justify-between">
            <p className="font-bold text-xl">{name}</p>
            <span
              className={
                isFavorite
                  ? "icon-[mdi-light--heart] border-black"
                  : "icon-[mdi--heart] bg-black"
              }
              onClick={toggleFavorite}
            ></span>
          </div>
          <p className="font-semibold text-lg">{category}</p>
          <p className="">{instructions.slice(0, 20)}...</p>
          <button className="p-2 bg-[#7864EA]">Read more</button>
        </div>
      </div>
    </>
  );
};

export default Card;
