"use server";

import prisma from "@/app/lib/prisma";
import { user_getOneUserId } from "@/app_modules/fun_global/get_user_token";
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
  });

  if (!updt) return { status: 400, message: "Gagal Update" };
  revalidatePath("/dev/vote/main/status");
  return {
    status: 200,
    message: "Update Berhasil",
  };
}
