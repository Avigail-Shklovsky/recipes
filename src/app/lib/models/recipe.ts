import { RecipeForSchema } from "@/app/types/recipeForSchema";
import mongoose, { Model, Schema } from "mongoose";

const RecipeSchema: Schema<RecipeForSchema>=new Schema({
    name: {type:String,required:true},
    category: {type:String,required:true},
    imageUrl: {type:String,required:true},
    ingredients: {type:[String],required:true},
    instructions: {type:String,required:true},
    isFavorite: {type:Boolean,required:true},       
})

const Recipe: Model<RecipeForSchema>=mongoose.models.Recipe||mongoose.model<RecipeForSchema>("Recipe",RecipeSchema)

export default Recipe;