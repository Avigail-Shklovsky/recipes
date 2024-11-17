import { create } from "zustand";
import { Store } from "@/app/types/store";
import { getRecipes } from "@/app/services/recipe";

export const useRecipeStore = create<Store>((set) => ({
  currentRecipe: null,
  recipeList: [],
  categoryList: [
    "Main Dishes",
    "Pastries and Breads",
    "Cakes",
    "Desserts",
    "Drinks",
  ],

  // set current recipe
  setCurrentRecipe: (currentRecipe) => set({ currentRecipe }),
  addRecipe: (recipe) =>
    set((state) => ({ recipeList: [...state.recipeList, recipe] })),

  // update a recipe by id
  updateRecipe: async (id, recipe) => {
    set((state) => ({
      recipeList: state.recipeList.map((r) => (r._id === id ? recipe : r)),
    }));
  },

  //delete a recipe by id
  deleteRecipe: (id) =>
    set((state) => ({
      recipeList: state.recipeList.filter((r) => r._id !== id),
    })),

  // set reipe list by getting data from database
  setRecipeList: (recipeList) => set({ recipeList }),
  fetchRecipes: async () => {
    const data = await getRecipes();
    set({ recipeList: data });
  },
}));
