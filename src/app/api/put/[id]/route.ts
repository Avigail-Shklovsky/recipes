import connect from "@/app/lib/db/mongodb";
import Recipe from "@/app/lib/models/recipe";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connect();
    const { id } = params;
    const { name, category, imageUrl, ingredients, instructions, isFavorite } =
      await request.json();
    const updateRecipe = await Recipe.findById(id);
    if (!updateRecipe) {
      return NextResponse.json({ message: "Recipe not found", status: 404 });
    }
    updateRecipe.name = name || updateRecipe.name;
    updateRecipe.category = category || updateRecipe.category;
    updateRecipe.imageUrl = imageUrl || updateRecipe.imageUrl;
    updateRecipe.ingredients = ingredients || updateRecipe.ingredients;
    updateRecipe.instructions = instructions || updateRecipe.instructions;
    updateRecipe.isFavorite = isFavorite;
   
    await updateRecipe.save();
    return NextResponse.json({
      message: "Successfully updated",
      updateRecipe: updateRecipe,
      status: 200,
    });
  } catch (error) {
    console.log('error in api put');
    
    return NextResponse.json({ message: "Error updating recipe", error });
  }
}
