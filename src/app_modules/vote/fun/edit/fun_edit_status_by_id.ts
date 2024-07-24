"use server";

import prisma from "@/app/lib/prisma";
import { user_getOneUserId } from "@/app_modules/fun_global/get_user_token";
import { data } from "autoprefixer";
import { revalidatePath } from "next/cache";

export async function Vote_funEditStatusByStatusId(
  voteId: string,
  statusId: string
) {
  const updt = await prisma.voting.update({
    where: {
      id: voteId,
    },
    data: {
      voting_StatusId: statusId,
    },
    select: {
      id: true,
      title: true,
      authorId: true,
      Voting_Status: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!updt) return { status: 400, message: "Gagal Update" };
  revalidatePath("/dev/vote/main/status");
  return {
    data: updt,
    status: 200,
    message: "Update Berhasil",
  };
}
