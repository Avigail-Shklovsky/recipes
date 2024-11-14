"use client";
import React, { useEffect, useState } from "react";
import { useRecipeStore } from "../store/use-store/useRecipeStore";
import RecipeList from "./RecipeList";

export const Filtering = () => {
  const [categoryFilter, setCategoryFilter] = useState("All");
  const recipeList = useRecipeStore((state) => state.recipeList);
  const [filteredRecipeList, setFilteredRecipeList] = useState(recipeList);
  const categoryList = useRecipeStore((state) => state.categoryList);

  const handleCategoryFilter = (e: { target: { value: any } }) => {
    const categorySelected = e.target.value;
    setCategoryFilter(categorySelected);
  };

  const filteredRecipeListToSend = recipeList.filter((recipe) => {
    if (recipe.category === categoryFilter || categoryFilter === "All") {
      return recipe;
    }
  });

  return (
    <>
      <div className="mt-3 ml-6">
        <div className="flex flex-col py-6">
          <select
            className="bg-transparent text-gray-700 border-2 border-gray-400 py-2 w-32  focus:outline-none  "
            onChange={handleCategoryFilter}
          >
            <option value="All">All</option>
            {categoryList.map((category) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      <RecipeList recipeList={filteredRecipeListToSend}></RecipeList>
    </>
  );
};
