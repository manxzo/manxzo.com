import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { adminAuthMiddleware } from "../auth/middleware";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    await adminAuthMiddleware(request);
    const postsCount = await prisma.post.count();
    const newMessagesCount = await prisma.message.count({where: {read: false}});
    const projectsCount = await prisma.project.count();
    const certificationsCount = await prisma.certification.count();
    const experiencesCount = await prisma.experience.count();
    const skillsCount = await prisma.skill.count();

    return NextResponse.json({
      postsCount,
      newMessagesCount,
      projectsCount,
      certificationsCount,
      experiencesCount,
      skillsCount,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error },
      { status: 500 }
    );
  }
}