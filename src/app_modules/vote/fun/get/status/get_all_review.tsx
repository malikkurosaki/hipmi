"use server";

import prisma from "@/app/lib/prisma";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";

export async function vote_getAllReview({ page }: { page: number }) {
  const userLoginId = await funGetUserIdByToken();

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
      authorId: userLoginId,
      isActive: true,
    },
  });

  return data;
}