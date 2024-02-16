"use server";

import prisma from "@/app/lib/prisma";
import { User_getUserId } from "@/app_modules/fun_global/get_user_token";

export async function Vote_getOnePilihanVotingByUserId(votingId: string) {
  const userId = await User_getUserId();
  const get = await prisma.voting_Kontributor.findFirst({
    where: {
      authorId: userId,
      votingId: votingId,
    },
    select: {
      Voting_DaftarNamaVote: {
        select: {
          value: true,
        },
      },
    },
  });

  return get;
}
