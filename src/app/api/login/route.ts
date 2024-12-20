import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
    console.log("hi!", request);

    const { email, password } = await request.json();

    console.log("email", email);

    if (email === "user@example.com" && password === "123456789") {

        //create token with jwt
        const token = jwt.sign(
            { email, password },
            process.env.JWT_SECRET!,
            { expiresIn: '1h' }
        );

        //create cookie with token
        const headers = new Headers(); //It is an object that represents the headers of an HTTP request or response
        headers.append(
            "Set-Cookie",
            `token=${token}; path=/; HttpOnly; Secure; SameSite=None`
        )

        //return response with token
        return NextResponse.json(
            { message: "Login successful", token },
            { headers }
        )
    } else {
        return NextResponse.json(
            { message: "Invalid credentials" },
            { status: 401 }
        )
    }
}
