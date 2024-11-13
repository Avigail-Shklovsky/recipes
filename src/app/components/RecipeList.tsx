"use client";
import React, { useEffect, useState } from "react";
import { useRecipeStore } from "@/app/store/use-store/useRecipeStore";

import Card from "@/app/components/Card";

const RecipeList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const fetchRecipes = useRecipeStore((state) => state.fetchRecipes);
  const recipeList = useRecipeStore((state) => state.recipeList);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const openCardPop = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-gray-100 shadow-lg p-4 transition-all duration-300 ${
          isOpen ? "right-0" : "-right-80"
        }`}
      >
        <h2 className="text-xl font-semibold mb-4">זו החלוית שלך</h2>
      </div>
      <div className="mt-5 ml-5">
        {recipeList && (
          <div className="grid grid-cols-6 gap-20">
            {recipeList.map((r) => (
              <>
                <Card key={r._id} recipe={r} openCard={openCardPop}></Card>
              </>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeList;
