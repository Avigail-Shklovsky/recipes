import React, { useEffect, useState } from "react";
import { useRecipeStore } from "../store/use-store/useRecipeStore";
import Image from "next/image";
import { deleteRecipeById, updateRecipeById } from "../services/recipe";

interface recupeModelProps {
  close: () => void;
}

const RecipeModel: React.FC<recupeModelProps> = ({ close }) => {
  const currentRecipe = useRecipeStore((state) => state.currentRecipe);
  const updateRecipe = useRecipeStore((state) => state.updateRecipe);
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);
  const [favorite, setFavorite] = useState(false);

  // עדכון המצב של favorite
  useEffect(() => {
    if (currentRecipe) {
      setFavorite(currentRecipe.isFavorite);
    }
  }, [currentRecipe]);

  // פונקציה להחלפת מצב המועדף
  const toggleFavorite = async() => {
    setFavorite((prev) => !prev);
    if (currentRecipe) {
      const newRecipe = {
        ...currentRecipe,
        isFavorite: !currentRecipe.isFavorite,
      };
      updateRecipe(currentRecipe._id, newRecipe);
      await updateRecipeById(currentRecipe._id, newRecipe)
    }
  };

  const handleDeleteRecipe = async (id: string) => {
    await deleteRecipeById(id);
    deleteRecipe(id);
    close();
  };

  return (
    <div className="w-[90vw] sm:w-[400px] md:w-[500px] lg:w-[600px] h-auto max-h-[90vh] overflow-y-auto p-6">
      {!currentRecipe ? (
        <p className="text-center text-gray-500">No recipe selected</p>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row">
  {/* תמונה */}
  <div className="w-full sm:w-[300px] h-[300px] mb-4 sm:mb-0">
    <Image
      className="rounded-t-xl object-cover w-full h-full"
      src={currentRecipe?.imageUrl || ""}
      width={300}
      height={300}
      alt={`${currentRecipe?.name} picture`}
    />
  </div>

  {/* מידע על המתכון */}
  <div className="w-full sm:w-2/3 pl-0 sm:pl-6 flex flex-col justify-start">
    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-white">
      {currentRecipe?.name}
    </h2>
    <div className="flex items-center mt-2 gap-2">
      <p className="text-md sm:text-lg text-gray-500 dark:text-gray-300">
        {currentRecipe?.category}
      </p>

      <button onClick={toggleFavorite} className="flex items-center">
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

    {/* רשימת חומרים */}
    <div className="mt-4 sm:mt-6">
      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
        Ingredients:
      </h3>
      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mt-2">
        {currentRecipe?.ingredients?.map((ingredient, index) => (
          <li key={index} className="text-gray-600 dark:text-gray-300">
            {ingredient}
          </li>
        ))}
      </ul>
    </div>
  </div>
</div>

          {/* הוראות מתחת לתמונה ולמידע */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              Instructions
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mt-2 leading-relaxed whitespace-pre-wrap break-words">
              {currentRecipe?.instructions}
            </p>
          </div>
        </>
      )}
      {/* אייקון מחיקה */}
      <button
        onClick={() => {
          if (currentRecipe?._id) {
            handleDeleteRecipe(currentRecipe._id);
          } else {
            console.error('No recipe ID available');
          }
        }}
         
        className="absolute bottom-4 right-4 p-2 sm:p-3 bg-red-500 text-white rounded-full hover:bg-red-600"
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </button>
    </div>
  );
};

export default RecipeModel;
