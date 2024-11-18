export const dynamic = 'force-dynamic';

import connect from "@/app/lib/db/mongodb";
import Recipe from "@/app/lib/models/recipe";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token");
  if(token){
    try {   
      await connect();
      const data = await Recipe.find() || [];
      return NextResponse.json({ massage: "seccessfull", data: data ,token:token});
    } catch (error) {
      return NextResponse.json(
        { message: "error to get", error,status: 500 });
    }
  }else{
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
