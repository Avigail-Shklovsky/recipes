import { Recipe } from "./recipe";

export interface Store {
    currentRecipe: Recipe | null;
    recipeList: Recipe[];
    categoryList: string[];
    setCurrentRecipe: (recipe: Recipe|null) => void;
    addRecipe: (recipe: Recipe) => void;
    updateRecipe: (id: string, recipe: Recipe) => void;
    deleteRecipe: (id: string) => void;
    setRecipeList: (recipes: Recipe[]) => void;
    fetchRecipes: () => void;
}