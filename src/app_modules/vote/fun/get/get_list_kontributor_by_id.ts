"use server";

import prisma from "@/app/lib/prisma";

export async function Vote_getListKontributorById(votingId: string) {
  const data = await prisma.voting_Kontributor.findMany({
    where: {
      votingId: votingId,
    },
    select: {
      id: true,
      Author: {
        select: {
          Profile: true,
        },
      },
      Voting_DaftarNamaVote: {
        select: {
          value: true,
        },
      },
    },
  });

  return data;
}
