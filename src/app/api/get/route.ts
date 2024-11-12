import connect from "@/app/lib/db/mongodb";
import Recipe from "@/app/lib/models/recipe";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await Recipe.find() || [];
    return NextResponse.json({ massage: "seccessfull", data: data });
  } catch (error) {
    return NextResponse.json(
      { message: "error to get", error },
      { status: 500 }
    );
  }
  await connect();
  console.log("check");
  return NextResponse.json({ message: "success" });
}
