"use server";

import { user_funGetOneUserId } from "@/app_modules/fun_global/get_user_token";
import prisma from "@/app/lib/prisma";

export async function Vote_getAllListRiwayatSaya({ page }: { page: number }) {
  const authorId = await user_funGetOneUserId();
   const takeData = 5;
   const skipData = page * takeData - takeData;


  const data = await prisma.voting.findMany({
    take: takeData,
    skip: skipData,
    
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
