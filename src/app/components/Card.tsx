"use client";
import React, { useState } from "react";
import { Recipe } from "../types/recipe";
import Image from "next/image";
import { useRecipeStore } from "../store/use-store/useRecipeStore";
import { updateRecipeById } from "../services/recipe";

interface cardProps {
  recipe: Recipe;
  openCard: (recipe: Recipe) => void;
}

const Card: React.FC<cardProps> = ({ recipe, openCard }) => {
  const [favorite, setFavorite] = useState(recipe.isFavorite);

  const updateRecipe = useRecipeStore((state) => state.updateRecipe);

  // Function to toggle the favorite status of a recipe
  const toggleFavorite = async () => {
    setFavorite((prev) => !prev);
    const newRecipe = {
      ...recipe,
      isFavorite: !recipe.isFavorite
    };
    updateRecipe(recipe._id ? recipe._id : "", newRecipe);
    await updateRecipeById(recipe._id ? recipe._id : "", newRecipe)
  };

  return (
    <>
      <div className="min-w-64 min-h-72 bg-white border border-black rounded-lg shadow">
        <Image
          className="rounded-t-xl object-cover w-[260px] h-[200px]"
          src={recipe.imageUrl}
          width={270}
          height={270}
          alt={`${recipe.name} picture`}
        />
        <div className="p-5 flex flex-col justify-around ">
          <div className="flex justify-between">
            <p className="font-bold text-lg">{recipe.name}</p>
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

          <p className="font-semibold text-md">{recipe.category}</p>
          <p className="">{recipe.instructions.slice(0, 20)}...</p>
          <button
            className="p-1 bg-[#7864EA] rounded-lg text-white my-1"
            onClick={() => openCard(recipe)}
          >
            Read more
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;