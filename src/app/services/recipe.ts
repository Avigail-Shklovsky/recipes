import axios from "axios";
// import 

export const getRecipe=async()=>{
    try{
        const response=await axios.get("http://localhost:3000/api/recipe/get");
        return response.data;
    }catch(error){
        console.error("Error creating recipe:", error);
        throw error
    }}
    

    export const createRecipe= async()=>{

    }