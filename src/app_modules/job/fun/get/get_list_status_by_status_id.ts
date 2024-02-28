"use server";

import prisma from "@/app/lib/prisma";
import { User_getUserId } from "@/app_modules/fun_global/get_user_token";

export async function Job_getListStatusByStatusId(statusId: string) {
  const authorId = await User_getUserId();
  if (statusId === "1") {
    const data = await prisma.job.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      where: {
        masterStatusId: "1",
        authorId: authorId,
        isActive: true,
        isArsip: false
      },
    });

    return data;
  }

  if (statusId === "2") {
    const data = await prisma.job.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      where: {
        masterStatusId: "2",
        authorId: authorId,
        isActive: true,
      },
    });

    return data;
  }

  if (statusId === "3") {
    const data = await prisma.job.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      where: {
        masterStatusId: "3",
        authorId: authorId,
        isActive: true,
      },
    });

    return data;
  }

  if (statusId === "4") {
    const data = await prisma.job.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      where: {
        masterStatusId: "4",
        authorId: authorId,
        isActive: true,
      },
    });

    return data;
  }
}
