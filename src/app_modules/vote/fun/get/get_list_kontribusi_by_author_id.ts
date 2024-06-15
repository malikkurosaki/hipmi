"use server";

import prisma from "@/app/lib/prisma";
import { user_getOneUserId } from "@/app_modules/fun_global/get_user_token";

export async function Vote_getAllListKontribusiByAuthorId() {
  const authorId = await user_getOneUserId();
  const data = await prisma.voting_Kontributor.findMany({
    orderBy: {
      createdAt: "asc",
    },
    where: {
      authorId: authorId,
    },
    select: {
      id: true,
      Voting: {
        select: {
          id: true,
          title: true,
          isActive: true,
          awalVote: true,
          akhirVote: true,
          Voting_DaftarNamaVote: {
            orderBy: {
              createdAt: "asc",
            },
          },
          Author: {
            select: {
              Profile: true,
            },
          },
        },
      },
      Voting_DaftarNamaVote: true,
      Author: true,
    },
  });
  return data;
}
