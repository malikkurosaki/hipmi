"use server";

import prisma from "@/app/lib/prisma";

export async function AdminVote_getHasilById(voteId: string) {
  const data = await prisma.voting_DaftarNamaVote.findMany({
    where: {
      votingId: voteId,
    },
  });

  return data;

}
