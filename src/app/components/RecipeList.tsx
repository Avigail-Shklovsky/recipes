"use client";
import React, { useEffect, useState } from "react";
import { useRecipeStore } from "@/app/store/use-store/useRecipeStore";

import Card from "@/app/components/Card";
import RecipeModel from "./RecipeModel";
import { Recipe } from "../types/recipe";


 

interface RecipeListProps {
  recipeList: Recipe[];
}

const RecipeList: React.FC<RecipeListProps> = ({ recipeList }) => {
  const [isOpen, setIsOpen] = useState(false);
    const [isShowFavorite, setIsShowFavorite] = useState(false);

  const fetchRecipes = useRecipeStore((state) => state.fetchRecipes);
  const recipeListFromStore = useRecipeStore((state) => state.recipeList);
  const setCurrentRecipe = useRecipeStore((state) => state.setCurrentRecipe);

 
  useEffect(() => {
    fetchRecipes();
  }, []);

  const openOrCloseModel = (recipe: Recipe) => {
    setCurrentRecipe(recipe);
    setIsOpen((prev) => !prev);
  };

  const closeModal = () => {
    setIsOpen(false);
    setCurrentRecipe(null);
  };

  return (
    <div>
      <div className="flex  ml-6">
        <button
          onClick={() => setIsShowFavorite((prev) => !prev)}
          className={`px-6 py-2 text-xl font-semibold ${
            !isShowFavorite
              ? "bg-transparent text-[#7864EA] border-b-2 border-[#7864EA] font-bold"
              : "bg-transparent text-gray-400 border-b-2 border-gray-400"
          }`}
        >
          All recipes
        </button>
        <button
          onClick={() => setIsShowFavorite((prev) => !prev)}
          className={`px-6 py-2 text-xl font-semibold ${
            isShowFavorite
              ? "bg-transparent text-[#7864EA] border-b-2 border-[#7864EA] font-bold"
              : "bg-transparent text-gray-400 border-b-2 border-gray-400"
          }`}
        >
          Favorites
        </button>
      </div>

      <div className="mt-5 ml-3 mr-3">
  {recipeList && (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {recipeList
        .filter((r) => !isShowFavorite || r.isFavorite)
        .map((r) => (
          <div className="w-[250px] h-[350px]"  >
          <Card
            key={r._id}
            recipe={r}
            openCard={() => openOrCloseModel(r)}
           
          />
          </div>
        ))}
    </div>
  )}
</div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center"
          onClick={closeModal}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-70 bg-white shadow-lg z-50 p-4 transition-transform duration-40 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={closeModal}
          className="mb-4 text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>

        <RecipeModel close={closeModal}/>
      </div>
    </div>
  );
};

export default RecipeList;
