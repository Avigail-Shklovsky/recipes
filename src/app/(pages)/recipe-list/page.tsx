"use client";
import React, { useEffect } from "react";
import { useRecipeStore } from "@/app/store/use-store/useRecipeStore";
import Card from "@/app/components/Card";

const Page = () => {
  const fetchRecipes = useRecipeStore((state) => state.fetchRecipes);
  // const recipeList = useRecipeStore((state) => state.recipeList);
  const recipeList = [
    {
      _id: "1",
      ingredients: ["ghjkl"],
      name: "recipe",
      category: "category",
      imageUrl: "https://tinyurl.com/bddvtauz",
      instructions: "instructions sdfghjkl;;jklkjhgbn",
      isFavorite: false,
    },
    {
      _id: "2",
      ingredients: ["ghjkl"],
      name: "recipe",
      category: "category",
      imageUrl: "https://tinyurl.com/bddvtauz",
      instructions: "instructions sdfghjkl;;jklkjhgbn",
      isFavorite: false,
    },
    {
      _id: "3",
      ingredients: ["ghjkl"],
      name: "recipe",
      category: "category",
      imageUrl: "https://tinyurl.com/bddvtauz",
      instructions: "instructions sdfghjkl;;jklkjhgbn",
      isFavorite: false,
    },
    {
      _id: "4",
      ingredients: ["ghjkl"],
      name: "recipe",
      category: "category",
      imageUrl: "https://tinyurl.com/bddvtauz",
      instructions: "instructions sdfghjkl;;jklkjhgbn",
      isFavorite: false,
    },
    {
      _id: "5",
      ingredients: ["ghjkl"],
      name: "recipe",
      category: "category",
      imageUrl: "https://tinyurl.com/bddvtauz",
      instructions: "instructions sdfghjkl;;jklkjhgbn",
      isFavorite: false,
    },
    {
      _id: "6",
      ingredients: ["ghjkl"],
      name: "recipe",
      category: "category",
      imageUrl: "https://tinyurl.com/bddvtauz",
      instructions: "instructions sdfghjkl;;jklkjhgbn",
      isFavorite: false,
    },
  ];

  useEffect(() => {
    fetchRecipes();
  });

  return (
    <div className="mt-5 ml-5">
      <p className="text-black font-bold text-4xl">Recipes</p>
      {recipeList && (
        <div className="grid-cols-5">
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

export default Page;
