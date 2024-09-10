"use server";

import prisma from "@/app/lib/prisma";
import { user_funGetOneUserId } from "@/app_modules/fun_global/get_user_token";

export async function vote_getAllListKontribusiByAuthorId({
  page,
}: {
  page: number;
}) {
  const takeData = 5;
  const skipData = page * takeData - takeData;

  const authorId = await user_funGetOneUserId();
  const data = await prisma.voting_Kontributor.findMany({
    take: takeData,
    skip: skipData,
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
