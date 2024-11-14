"use client";
import React, { useEffect, useState } from "react";
import { useRecipeStore } from "@/app/store/use-store/useRecipeStore";

import Card from "@/app/components/Card";
import RecipeModel from "./RecipeModel";
import { Recipe } from "../types/recipe";

const RecipeList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const fetchRecipes = useRecipeStore((state) => state.fetchRecipes);
  const recipeList = useRecipeStore((state) => state.recipeList);
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
      <div className="mt-5 ml-5">
        {recipeList && (
          <div className=" grid grid-cols-6 gap-20">
            {recipeList.map((r) => (
              <Card
                key={r._id}
                recipe={r}
                openCard={() => openOrCloseModel(r)}
              ></Card>
            ))}
          </div>
        )}
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeModal}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 p-4 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={closeModal}
          className="mb-4 text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>

        <RecipeModel />
      </div>
    </div>
  );
};

export default RecipeList;
