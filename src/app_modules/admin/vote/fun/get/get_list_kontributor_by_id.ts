"use server";

import prisma from "@/app/lib/prisma";

export async function AdminVote_getListKontributorById(voteId: string) {
  const data = await prisma.voting_Kontributor.findMany({
    where: {
      votingId: voteId,
    },
    select: {
      Voting_DaftarNamaVote: true,
      Author: {
        select: {
          Profile: true,
        },
      },
    },
  });

  return data;
}
