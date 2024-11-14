import axios from "axios";
import { Recipe } from "../types/recipe";

export const getRecipe = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/get");
    return response.data;
  } catch (error) {
    console.error("Error getting recipe:", error);
    throw error;
  }
};

export const createRecipe = async (recipe: Recipe) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/post",
      recipe
    );
    return response.data;
  } catch (error) {
    console.log("Error creating recipe:", error);
    throw error;
  }
};

export const updateRecipe = async (id: number) => {
  try {
    const response = await axios.put(`http://localhost:3000/api/put/${id}`);
    return response.data;
  }
  catch (error) {
    console.log("Error updating recipe:", error);
    throw error;
  }
}

export const deleteRecipe = async (id: number) => {
  try {
    const response = await axios.delete(`https://localhost:3000/api/delete/${id}`);
    return response.data;
  }
  catch (error) {
    console.log("Error deleting recipe", error);
    throw error;

  }
}