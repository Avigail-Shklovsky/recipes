"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecipeStore } from "../store/use-store/useRecipeStore";
import RecipeList from "./RecipeList";
import { Recipe } from "../types/recipe";


export const Homepage = () => {

    const router = useRouter();

    const [categoryFilter, setCategoryFilter] = useState("All");
    const [searchInput, setSearchInput] = useState("");
    const recipeList = useRecipeStore((state) => state.recipeList);
    const [filteredRecipeList, setFilteredRecipeList] = useState<Recipe[]>(recipeList);
    const categoryList = useRecipeStore((state) => state.categoryList);

    useEffect(() => {
        const filteredList = recipeList.filter((recipe) => {
            const matchesCategory = categoryFilter === "All" || recipe.category === categoryFilter;
            const matchesSearch = recipe.name.toLowerCase().includes(searchInput.toLowerCase());
            return matchesCategory && matchesSearch;
        });
        setFilteredRecipeList(filteredList);
    }, [categoryFilter, searchInput, recipeList]);

    const handleCategoryFilter = (e: { target: { value: string } }) => {
        setCategoryFilter(e.target.value);
    };

    const handleChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
    }

    return (
        <div className="p-[40px] overflow-hidden">
            <header className="flex flex-col w-[90%]">
                <h1 className="text-[4vh] pb-[6vh]">Recipes</h1>
                <div className="flex w-[90%] justify-between gap-8">
                    <div className="flex gap-5">
                        <select
                            className="bg-transparent text-gray-700 border-2 border-gray-400 w-[15vw] h-[5vh] py-2 focus:outline-none rounded-md text-sm leading-tight"
                            onChange={handleCategoryFilter}
                        >
                            <option value="All">All</option>
                            {categoryList.map((category) => (
                                <option value={category} key={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                        <div className="relative">
                            <input
                                type="search"
                                placeholder="Search"
                                value={searchInput}
                                onChange={handleChangeSearchInput}
                                className="bg-transparent text-gray-700 border-2 border-gray-400 w-[15vw] h-[5vh] py-2 pl-10 pr-4 focus:outline-none rounded-md text-sm leading-tight"
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5">
                                <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <button
                        className="self-end bg-[#7864EA] text-white rounded-sm p-[7px] w-[7vw] cursor-pointer justify-center"
                        onClick={() => router.push("/add-recipe")}
                        title="add recipe"
                    >
                        Add Recipe
                    </button>
                </div>
            </header>
            {/* <Pagination recipeList={filteredRecipeListToSend}></Pagination> */}
            <RecipeList recipeList={filteredRecipeList}></RecipeList>
        </div>
    );
};

export default Homepage;
