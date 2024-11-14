export interface Recipe {
  _id?: string;
  name: string;
  category: string;
  imageUrl: string;
  ingredients: string[];
  instructions: string;
  isFavorite: boolean;
}
