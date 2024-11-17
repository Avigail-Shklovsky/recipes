import connect from "@/app/lib/db/mongodb";
import Recipe from "@/app/lib/models/recipe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connect();
    const { name, category, imageUrl, ingredients, instructions, isFavorite } =
      await request.json();
    const newRecipe = new Recipe({
      name,
      category,
      imageUrl,
      ingredients,
      instructions,
      isFavorite,
    });
    await newRecipe.save();
    return NextResponse.json({
      message: "seccessfull",
      Recipe: newRecipe,
      status: 201,
    });
  } catch (error) {
    return NextResponse.json({
      message: "error to add new recipe",
      error,
      status: 500,
    });
  }
}
