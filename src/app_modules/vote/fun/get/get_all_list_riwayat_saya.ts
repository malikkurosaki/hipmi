"use server";

import { user_getOneUserId } from "@/app_modules/fun_global/get_user_token";
import prisma from "@/app/lib/prisma";

export async function Vote_getAllListRiwayatSaya() {
  const authorId = await user_getOneUserId();
  const data = await prisma.voting.findMany({
    orderBy: {
      createdAt: "asc",
    },
    where: {
      voting_StatusId: "1",
      authorId: authorId,
      isActive: true,
      akhirVote: {
        lte: new Date(),
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
      Author: {
        select: {
          id: true,
          username: true,
          nomor: true,
          Profile: true,
        },
      },
    },
  });

  return data;
}
