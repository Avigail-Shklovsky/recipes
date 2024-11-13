import connect from "@/app/lib/db/mongodb";
import Recipe from "@/app/lib/models/recipe";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connect();
    const data = await Recipe.find() || [];
    return NextResponse.json({ massage: "seccessfull", data: data });
  } catch (error) {
    return NextResponse.json(
      { message: "error to get", error,status: 500 });
  }
}
