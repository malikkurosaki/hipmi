"use server";

import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export async function Event_funDeleteById(eventId: string) {
  const del = await prisma.event.delete({
    where: {
      id: eventId,
    },
  });

  if (!del) return { status: 400, message: "Gagal hapus data" };
  revalidatePath("/dev/event/main/status_page");
  return {
    status: 200,
    message: "Hapus data berhasil",
  };
}
