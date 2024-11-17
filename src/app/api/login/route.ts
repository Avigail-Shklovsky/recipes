import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

export async function POST(request: NextRequest){
    const {email ,password}=await request.json();

    if(email==="user@example.com" && password ==="123456789"){

        //creat token with jwt
        const token=jwt.sign(
            {email,password},
            process.env.JWT_SECRET!,
            {expiresIn:'1h'}
        );

        //creat cookie with token
        const headers=new Headers();//It is an object that represents the headers of an HTTP request or response
        headers.append(
            "Set-Cookie",
            `token=${token}; path=/; secure; HttpOnly; SameSite=Strict`
        )

        //return response with token
        return NextResponse.json(
            {message:"Login successful",token},
            {headers}
        )
    }else{
        return NextResponse.json(
            {message:"Invalid credentials"},
            {status:401}
        )
    }
}