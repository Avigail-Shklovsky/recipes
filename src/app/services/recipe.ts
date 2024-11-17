import axios from "axios";
import { Recipe } from "../types/recipe";

// CRUD  from server

// get all recipes 
export const getRecipes = async () => {
  try {
    const response = await axios.get("/api/get");
    return response.data.data;
  } catch (error) {
    console.error("Error getting recipe:", error);
    throw error;
  }
};

// create new recipe
export const createRecipe = async (recipe: Recipe) => {
  try {
    const response = await axios.post("/api/post", recipe);
    return response.data;
  } catch (error) {
    console.log("Error creating recipe:", error);
    throw error;
  }
};

// update a recipe by id
export const updateRecipeById = async (id: string, recipe: Recipe) => {
  try {
    const response = await axios.put(`/api/put/${id}`, recipe);
    return response.data;
  } catch (error) {
    console.log("Error updating recipe:", error);
    throw error;
  }
};

// delete a recipe by id
export const deleteRecipeById = async (id: string) => {
  try {
    const response = await axios.delete(`/api/delete/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error deleting recipe", error);
    throw error;
  }
};
