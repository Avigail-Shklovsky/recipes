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
  const setCurrentRecipe = useRecipeStore((state) => state.setCurrentRecipe);

  // pagination variables
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 5;
  const start = perPage * currentPage;
  const end = start + perPage;
  const totalPages = Math.ceil(recipeList.length / perPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const pagedRecipes = recipeList.slice(start, end);

  const handlePageChange = (page: number) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

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
    <>
      <div>
        <div className="flex ml-6 py-8">
          <button
            onClick={() => setIsShowFavorite((prev) => !prev)}
            className={`px-6 py-2 text-xl font-semibold ${!isShowFavorite
              ? "bg-transparent text-[#7864EA] border-b-2 border-[#7864EA] font-bold"
              : "bg-transparent text-gray-400 border-b-2 border-gray-400"
              }`}
          >
            All recipes
          </button>
          <button
            onClick={() => setIsShowFavorite((prev) => !prev)}
            className={`px-6 py-2 text-xl font-semibold ${isShowFavorite
              ? "bg-transparent text-[#7864EA] border-b-2 border-[#7864EA] font-bold"
              : "bg-transparent text-gray-400 border-b-2 border-gray-400"
              }`}
          >
            Favorites
          </button>
        </div>
        {pagedRecipes && (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {pagedRecipes
              //If isShowFavorite is true, it includes only recipes where r.isFavorite is true.
              //If isShowFavorite is false, it includes all recipes without filtering based on isFavorite.
              .filter((r) => !isShowFavorite || r.isFavorite)
              .map((r) => (
                <div className="w-[250px] h-[350px]" key={r._id}>
                  <Card
                    recipe={r}
                    openCard={() => openOrCloseModel(r)}
                  />
                </div>
              ))}
          </div>
        )}
      </div>
      {/* pagination numbers */}
      <div className="flex justify-evenly text-black text-lg w-44 mt-4">
        {/* arrow icon previous */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-5"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <path
            fill-rule="evenodd"
            d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
            clip-rule="evenodd"
          />
        </svg>
        {pageNumbers.map((number) => (
          <p
            key={number}
            onClick={() => handlePageChange(number - 1)}
            className={
              number - 1 === currentPage
                ? "font-bold cursor-pointer"
                : "cursor-pointer"
            }
          >
            {number}
          </p>
        ))}
        {/* arrow icon next */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-5"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <path
            fill-rule="evenodd"
            d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      {/* end of pagination numbers */}

      {/* recipe modal */}

      {
        isOpen && (
          <div
            className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center"
            onClick={closeModal}
          />
        )
      }
      <div
        className={`fixed top-0 right-0 h-full w-70 bg-white shadow-lg z-50 p-4 transition-transform duration-40 ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <button
          onClick={closeModal}
          className="mb-4 text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>

        <RecipeModel close={closeModal} />

      </div>
    </>
  );
};

export default RecipeList;
