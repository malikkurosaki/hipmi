"use server";

import prisma from "@/app/lib/prisma";

export async function Vote_getListKontributorById(votingId: string) {
  const data = await prisma.voting_Kontributor.findMany({
    orderBy:{
      createdAt: "desc"
    },
    where: {
      votingId: votingId,
    },
    include: {
      Author: {
        include: {
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
