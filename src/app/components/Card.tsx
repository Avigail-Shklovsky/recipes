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
      <div className="max-w-fit p-2 max-h-fit bg-white border border-black rounded-lg shadow dark:bg-gray-200 ">
        <Image
          className="rounded-t-xl"
          src={imageUrl}
          width={200}
          height={200}
          alt={`${name} picture`}
        />
        <div className="p-5">
          <div className="flex justify-between">
            <p className="font-bold text-xl">{name}</p>

            {!favorite ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6"
                onClick={toggleFavorite}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6"
                onClick={toggleFavorite}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            )}
          </div>
          <p className="font-semibold text-lg">{category}</p>
          <p className="">{instructions.slice(0, 20)}...</p>
          <button className="p-1 bg-[#7864EA] rounded-lg text-white my-1">
            Read more
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;

