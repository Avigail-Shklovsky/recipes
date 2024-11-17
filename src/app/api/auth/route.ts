import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    // Retrieving the token from cookies
    const token = request.cookies.get("token");

    // Checking if the token exists
    if (token) {
        // If the token exists - return a response with protected information
        return NextResponse.json({ message: "Protected data", user: token }, { status: 200 });
    }
    else {
        // If the token does not exist - return an Unauthenticated error response
        return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
    }
}