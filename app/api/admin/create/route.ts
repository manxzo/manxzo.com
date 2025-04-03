import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "@/utils/auth";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email, password, secretKey } = await request.json();

    // Verify the secret key matches the environment variable
    if (secretKey !== process.env.ADMIN_CREATE_SECRET) {
      return NextResponse.json(
        { error: "Invalid secret key" },
        { status: 401 }
      );
    }

    // Check if admin already exists
    const existingAdmin = await prisma.admin.findFirst();
    if (existingAdmin) {
      return NextResponse.json(
        { error: "Admin account already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create the admin account
    const admin = await prisma.admin.create({
      data: {
        id: uuidv4(),
        email,
        password: hashedPassword,
        updatedAt: new Date(),
      },
    });

    // Remove the password from the response
    const { password: _, ...adminWithoutPassword } = admin;

    return NextResponse.json(adminWithoutPassword, { status: 201 });
  } catch (error) {
    console.error("Error creating admin:", error);
    return NextResponse.json(
      { error: "Failed to create admin account" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
