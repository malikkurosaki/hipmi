"use server";

import prisma from "@/app/lib/prisma";
import { user_getOneUserId } from "@/app_modules/fun_global/get_user_token";

export async function vote_getAllReview({ page }: { page: number }) {
  const authorId = await user_getOneUserId();

  const takeData = 10;
  const skipData = page * takeData - takeData;

  const data = await prisma.voting.findMany({
    take: takeData,
    skip: skipData,
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
