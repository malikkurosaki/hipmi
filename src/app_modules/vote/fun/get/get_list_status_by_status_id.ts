"use server";

import prisma from "@/app/lib/prisma";
import { User_getUserId } from "@/app_modules/fun_global/get_user_token";

export async function Vote_getListByStatusId(statusId: string) {
  const authorId = await User_getUserId();

  if (statusId === "1") {
    const data = await prisma.voting.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      where: {
        voting_StatusId: "1",
        authorId: authorId,
        isActive: true,
        akhirVote: {
          gte: new Date(),
        },
      },
      select: {
        id: true,
        title: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        deskripsi: true,
        awalVote: true,
        akhirVote: true,
        catatan: true,
        authorId: true,
        voting_StatusId: true,
        Voting_DaftarNamaVote: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    return data;
  }

  if (statusId === "2") {
    const data = await prisma.voting.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      where: {
        voting_StatusId: "2",
        authorId: authorId,
        isActive: true,
      },
    });

    return data;
  }

  if (statusId === "3") {
    const data = await prisma.voting.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      where: {
        voting_StatusId: "3",
        authorId: authorId,
        isActive: true,
      },
    });

    return data;
  }

  if (statusId === "4") {
    const data = await prisma.voting.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      where: {
        voting_StatusId: "4",
        authorId: authorId,
        isActive: true,
      },
    });

    return data;
  }
}
