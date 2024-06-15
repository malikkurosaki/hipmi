"use server";

import prisma from "@/app/lib/prisma";
import { MODEL_VOTING } from "@/app_modules/vote/model/interface";
import { revalidatePath } from "next/cache";

export async function AdminEvent_funEditCatatanById(
  data: MODEL_VOTING,
) {
  const updt = await prisma.voting.update({
    where: {
      id: data.id,
    },
    data: {
      voting_StatusId: "4",
      catatan: data.catatan,
    },
  });

  if (!updt) return { status: 400, message: "Update Gagal" };
  revalidatePath("/dev/admin/event/main");
  return {
    status: 200,
    message: "Berhasil Update Status",
  };
}
