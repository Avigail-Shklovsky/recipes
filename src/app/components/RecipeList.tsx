"use client";
import React, { useEffect } from "react";
import { useRecipeStore } from "@/app/store/use-store/useRecipeStore";

import Card from "@/app/components/Card";

const RecipeList = () => {
  const fetchRecipes = useRecipeStore((state) => state.fetchRecipes);
  const recipeList = useRecipeStore((state) => state.recipeList);

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="mt-5 ml-5">
  
      {recipeList && (
        <div className=" grid grid-cols-6 gap 2">
          {recipeList.map((r) => (
            <Card
              key={r._id}
              _id="1"
              ingredients={["ghjkl"]}
              name={"recipe"}
              category={"category"}
              imageUrl={"https://tinyurl.com/bddvtauz"}
              instructions={"instructions sdfghjkl;;jklkjhgbn"}
              isFavorite={false}
            ></Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList;
