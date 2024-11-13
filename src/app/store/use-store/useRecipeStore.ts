import { create } from "zustand";
import { Store } from "@/app/types/store";
import { getRecipes } from "@/app/services/recipe";
import { updateRecipe } from "@/app/services/recipe";

export const useRecipeStore = create<Store>((set) => ({
  currentRecipe: null,
  recipeList: [],
  setCurrentRecipe: (currentRecipe) => set({ currentRecipe }),
  addRecipe: (recipe) =>
    set((state) => ({ recipeList: [...state.recipeList, recipe] })),

  updateRecipe: async(id, recipe) =>{
    const data= await updateRecipe(id,recipe)
    console.log(data.updateRecipe);
    
    set((state) => ({
      recipeList: state.recipeList.map((r) => (r._id === id ? recipe : r)),
    }))
},

  deleteRecipe: (id) =>
    set((state) => ({
      recipeList: state.recipeList.filter((r) => r._id !== id),
    })),
  setRecipeList: (recipeList) => set({ recipeList }),
  fetchRecipes: async () => {
    const data = await getRecipes();
    set({ recipeList: data });
  },
}));
