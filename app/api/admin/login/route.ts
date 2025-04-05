import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { verifyPassword } from "@/utils/auth";
import { SignJWT } from "jose";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isValid = await verifyPassword(password, admin.password);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Create a JWT token
    const token = await new SignJWT({ adminId: admin.id })
      .setProtectedHeader({ alg: "HS512" })
      .setIssuedAt()
      .setExpirationTime("12h")
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));


    // Return the token and admin data
    return NextResponse.json({
      token,
      user: admin.email,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    return NextResponse.json({ error: "Failed to log in" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
