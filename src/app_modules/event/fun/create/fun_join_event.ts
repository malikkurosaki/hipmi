"use server";

import prisma from "@/app/lib/prisma";
import { MODEL_EVENT_PESERTA } from "../../model/interface";
import { revalidatePath } from "next/cache";

export async function Event_funJoinEvent(data: MODEL_EVENT_PESERTA) {
  const crt = await prisma.event_Peserta.create({
    data: {
      eventId: data.eventId,
      userId: data.userId,
    },
  });

  if (!crt) return { status: 400, message: "Gagal Join" };
  revalidatePath("/dev/event/detail/main");
  return {
    status: 200,
    message: "Berhasil Join",
  };
}
