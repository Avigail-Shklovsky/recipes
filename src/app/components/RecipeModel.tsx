import React, { useEffect, useState } from "react";
import { useRecipeStore } from "../store/use-store/useRecipeStore";
import Image from "next/image";

const RecipeModel = () => {
  const currentRecipe = useRecipeStore((state) => state.currentRecipe);
  const updateRecipe = useRecipeStore((state) => state.updateRecipe);
  const [favorite, setFavorite] = useState(false);

  // עדכון המצב של favorite
  useEffect(() => {
    if (currentRecipe) {
      setFavorite(currentRecipe.isFavorite);
    }
  }, [currentRecipe]);

  // פונקציה להחלפת מצב המועדף
  const toggleFavorite = () => {
    setFavorite((prev) => !prev);
    if (currentRecipe) {
      const newRecipe = {
        ...currentRecipe,
        isFavorite: !currentRecipe.isFavorite,
      };
      updateRecipe(currentRecipe._id, newRecipe);
    }
  };

  return (
    <div className=" w-100 h-auto max-h-[90vh] overflow-y-auto p-6 ">
      {!currentRecipe ? (
        <p className="text-center text-gray-500">No recipe selected</p>
      ) : (
        <>
          <div className="flex">
            <div className="w-1/3">
              <Image
                className="w-full h-48 object-cover rounded-lg shadow-md"
                src={currentRecipe.imageUrl}
                width={200}
                height={200}
                alt={`${currentRecipe.name} picture`}
              />
            </div>

            <div className="w-2/3 pl-6 flex flex-col justify-center">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                {currentRecipe.name}
              </h2>
              <p className="text-lg text-gray-500 dark:text-gray-300">
                {currentRecipe.category}
              </p>
              <button
                onClick={toggleFavorite}
                className="justify-self-center mt-0"
              >
                {favorite ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              Ingredients:
            </h3>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mt-2">
              {currentRecipe.ingredients.map((ingredient, index) => (
                <li key={index} className="text-gray-600 dark:text-gray-300">
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              Instructions
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mt-2 leading-relaxed whitespace-pre-wrap break-words">
              {currentRecipe.instructions}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default RecipeModel;
