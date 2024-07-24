"use server";

import { user_getOneUserId } from "@/app_modules/fun_global/get_user_token";
import { MODEL_VOTING } from "../../model/interface";
import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export async function Vote_funCreate(req: MODEL_VOTING, listVote: any[]) {
  const authorId = await user_getOneUserId();

  const create = await prisma.voting.create({
    data: {
      title: req.title,
      deskripsi: req.deskripsi,
      awalVote: req.awalVote,
      akhirVote: req.akhirVote,
      authorId: authorId,
    },
    select: {
      id: true,
      title: true,
      Voting_Status: {
        select: {
          name: true,
        },
      },
      authorId: true,
    },
  });

  if (!create) return { status: 400, message: "Gagal Membuat Vote" };

  for (let v of listVote) {
    const val = v.value;

    const namaVote = await prisma.voting_DaftarNamaVote.create({
      data: {
        value: val,
        votingId: create.id,
      },
    });

    if (!namaVote) return { status: 400, message: "Gagal Membuat List" };
  }
  revalidatePath("/dev/vote/main/status");

  return {
    data: create,
    status: 201,
    message: "Berhasil Membuat Vote",
  };
}
