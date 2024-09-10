"use server";

import prisma from "@/app/lib/prisma";
import { user_funGetOneUserId } from "@/app_modules/fun_global/get_user_token";
import { revalidatePath } from "next/cache";

export async function Vote_funCreatePilihanVotingById(
  namaVotingId: string,
  votingId: string
) {
  const authorId = await user_funGetOneUserId();

  const create = await prisma.voting_Kontributor.create({
    data: {
      voting_DaftarNamaVoteId: namaVotingId,
      votingId: votingId,
      authorId: authorId,
    },
  });

  if(!create) return {status: 400, message: "Gagal Voting"}
  revalidatePath("/dev/vote/detail/main/");
  return {status: 201, message: "Berhasil Voting"}
}
