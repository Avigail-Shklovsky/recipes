import { Document } from "mongoose";
// recipe type for database connection
export interface RecipeForSchema extends Document {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  ingredients: string[];
  instructions: string;
  isFavorite: boolean;
}
