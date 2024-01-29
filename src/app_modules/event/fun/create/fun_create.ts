"use server";

import prisma from "@/app/lib/prisma";
import { MODEL_EVENT } from "../../model/interface";
import { revalidatePath } from "next/cache";

export async function Event_funCreate(req: MODEL_EVENT) {
  const res = await prisma.event.create({
    data: {
      title: req.title,
      lokasi: req.lokasi,
      deskripsi: req.deskripsi,
      eventMaster_TipeAcaraId: req.eventMaster_TipeAcaraId,
      tanggal: req.tanggal,
      authorId: req.authorId,
    },
  });

  if (!res) return { status: 400, message: "Gagal Disimpan" };
  revalidatePath("/dev/event/main/status_page");
  return {
    status: 201,
    message: "Berhasil Disimpan",
  };
}
