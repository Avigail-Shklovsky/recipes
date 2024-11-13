"use client";
import React, { useEffect } from "react";
import { useRecipeStore } from "@/app/store/use-store/useRecipeStore";

const Page = () => {
  console.log("in");

  const fetchRecipes = useRecipeStore((state) => state.fetchRecipes);
  const recipeList = useRecipeStore((state) => state.recipeList);

  useEffect(() => {
    fetchRecipes();
  });

  return (
    <>{recipeList && recipeList.map((r) => <h1 key={r._id}>{r.name}</h1>)}</>
  );
};

export default Page;
