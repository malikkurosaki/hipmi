"use server";

import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

/**
 * @param voteId
 * @returns isActive berubah menjadi false
 */
export async function Vote_funDeleteById(voteId: string) {
  const del = await prisma.voting.update({
    where: {
      id: voteId,
    },
    data: {
      isActive: false,
    },
  });

  if (!del) return { status: 400, message: "Gagal Hapus Data" };
  revalidatePath("/dev/vote/main/status");
  return {
    status: 200,
    message: "Hapus Berhasil",
  };
}
