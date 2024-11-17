export const dynamic = 'force-dynamic';

import connect from "@/app/lib/db/mongodb";
import Recipe from "@/app/lib/models/recipe";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request:NextRequest,{ params }: { params: { id: string } }) {
    try{
        await connect();
        const {id}=params;
        const deletedRecipe = await Recipe.findByIdAndDelete(id);
        if (!deletedRecipe) {
            return NextResponse.json({ message: "Recipe not found",status: 404 });
        }
        return NextResponse.json({ message: "Recipe deleted successfully", deletedRecipe ,status: 200 });
    }catch(error){
        return NextResponse.json({ message: "Failed to delete recipe", error: error ,status: 500 });
    }
}