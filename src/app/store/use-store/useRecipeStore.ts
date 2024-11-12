import { create } from 'zustand';
import { Store } from '@/app/types/store';
import axios from 'axios';

export const useRecipeStore = create<Store>((set) => ({
    currentRecipe: null,
    recipeList: [],
    setCurrentRecipe: (currentRecipe) => set({ currentRecipe }),
    addRecipe: (recipe) => set((state) => ({ recipeList: [...state.recipeList, recipe], })),
    updateRecipe: (id, recipe) => set((state) => ({
        recipeList: state.recipeList.map((r) =>
            r._id === id ? recipe : r
        )
    })),
    deleteRecipe: (id) => set((state) => ({ recipeList: state.recipeList.filter((r) => r._id !== id) })),
    setRecipeList: (recipeList) => set({ recipeList }),
    fetchRecipes: async () => {
        try {
            console.log("here");
            
            const response = await axios.get('http://localhost:3000/api/recipe/get');
            set({ recipeList: response.data });
        } catch (error) {
            console.error('Failed to fetch recipes:', error);
        }
    },
}))