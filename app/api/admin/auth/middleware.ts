import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function adminAuthMiddleware(request: NextRequest) {
  const token = request.headers.get("Authorization")?.split(" ")[1];
  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized - No token provided" },
      { status: 401 }
    );
  }
  try {
    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
    const verified = await jwtVerify(token, secretKey);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json(
      { error: "Unauthorized - Invalid token" },
      { status: 401 }
    );
  }
}
