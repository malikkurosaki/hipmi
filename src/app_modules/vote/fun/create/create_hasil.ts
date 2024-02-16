"use server";

import prisma from "@/app/lib/prisma";
import { User_getUserId } from "@/app_modules/fun_global/get_user_token";
import { revalidatePath } from "next/cache";

export async function Vote_funCreateHasil(
  pilihanVotingId: string,
  votingId: string
) {
  const authorId = await User_getUserId();

  const get = await prisma.voting_DaftarNamaVote.findFirst({
    where: {
      id: pilihanVotingId,
    },
    select: {
      jumlah: true,
    },
  });

  if (!get) return { status: 400, message: "Gagal Voting" };

  const updt = await prisma.voting_DaftarNamaVote.update({
    where: {
      id: pilihanVotingId,
    },
    data: {
      jumlah: get.jumlah + 1,
    },
  });
  if (!updt) return { status: 400, message: "Gagal Update" };

  const create = await prisma.voting_Kontributor.create({
    data: {
      voting_DaftarNamaVoteId: pilihanVotingId,
      votingId: votingId,
      authorId: authorId,
    },
  });
  if (!create) return { status: 400, message: "Gagal Menjadi Kontributor" };


  revalidatePath("/dev/vote/detail/main/");
  return { status: 201, message: "Berhasil Voting" };
}
