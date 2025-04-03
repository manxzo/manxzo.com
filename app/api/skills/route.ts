import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const skills = await prisma.skill.findMany({
      include: {
        Certification: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    return NextResponse.json(skills);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
} 