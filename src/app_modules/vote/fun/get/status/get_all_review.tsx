"use server";

import prisma from "@/app/lib/prisma";
import { RouterAuth } from "@/app/lib/router_hipmi/router_auth";
import { user_funGetOneUserId } from "@/app_modules/fun_global/get_user_token";
import { redirect } from "next/navigation";

export async function vote_getAllReview({ page }: { page: number }) {
  const authorId = await user_funGetOneUserId();
   if (!authorId) {
     redirect(RouterAuth.login);
     // return { status: 400, message: "Gagal mendapatkan authorId" };
   }

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
