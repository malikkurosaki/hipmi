"use server";

import prisma from "@/app/lib/prisma";
import { MODEL_EVENT } from "@/app_modules/event/model/interface";
import { revalidatePath } from "next/cache";

export async function AdminEvent_funEditCatatanById(
  data: MODEL_EVENT,
  statudId: string
) {
  const updt = await prisma.event.update({
    where: {
      id: data.id,
    },
    data: {
      eventMaster_StatusId: statudId,
      catatan: data.catatan
    },
  });

  if (!updt) return { status: 400, message: "Update Gagal" };
  revalidatePath("/dev/admin/event/main");
  return {
    status: 200,
    message: "Berhasil Update Status",
  };
}
