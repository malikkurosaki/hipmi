"use server";

import prisma from "@/app/lib/prisma";
import {
  MODEL_VOTING,
  MODEL_VOTING_DAFTAR_NAMA_VOTE,
} from "../../model/interface";
import { revalidatePath } from "next/cache";

export async function Vote_funEditById(
  data: MODEL_VOTING,
  listVoting: MODEL_VOTING_DAFTAR_NAMA_VOTE[]
) {
  // console.log(listVoting)
  const updtVoting = await prisma.voting.update({
    where: {
      id: data.id,
    },
    data: {
      title: data.title,
      deskripsi: data.deskripsi,
      awalVote: data.awalVote,
      akhirVote: data.akhirVote,
    },
  });

  if (!updtVoting) return { status: 400, message: "Gagal Update" };

  for (let e of listVoting) {
    const updtListVoting = await prisma.voting_DaftarNamaVote.updateMany({
      where: {
        id: e.id,
      },
      data: {
        value: e.value,
      },
    });

    if (!updtListVoting)
      return { status: 400, message: "Gagal Update Daftar Vote" };
  }

  revalidatePath("/dev/vote/detail/draft");
  return {
    status: 200,
    message: "Berhasil Update",
  };
}
