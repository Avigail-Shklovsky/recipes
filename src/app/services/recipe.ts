import axios from "axios";
import { Recipe } from "../types/recipe";

export const getRecipe = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/recipe/get");
    return response.data;
  } catch (error) {
    console.error("Error getting recipe:", error);
    throw error;
  }
};

export const createRecipe = async (recipe: Recipe) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/recipe/post",
      recipe
    );
    return response.data;
  } catch (error) {
    console.log("Error creating recipe:" ,error);
    throw error;
  }
};

export const updateRecipe = async (id:number)=>{
    try{
        const response =await axios.put(`http://localhost:3000/api/recipe/put/${id}`);
        return response.data;
    }
    catch(error){
        console.log("Error updating recipe:", error);
        throw error;
    }
}

export const deleteRecipe = async (id:number)=>{
    try{
        const response = await axios.delete(`https://localhost:3000/api/recipe/delete/${id}`);
        return response.data;
    }
    catch(error){
        console.log("Error deleting recipe",error);
        throw error;
        
    }
}