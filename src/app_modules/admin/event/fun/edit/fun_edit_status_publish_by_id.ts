"use server";

import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export async function AdminEvent_funEditStatusPublishById(
  eventId: string,
  statusId: string
) {
  console.log(eventId);
  const updt = await prisma.event.update({
    where: {
      id: eventId,
    },
    data: {
      eventMaster_StatusId: statusId,
    },
  });

  if (!updt) return { status: 400, message: "Update Gagal" };
  revalidatePath("/dev/admin/event/main");
  return {
    status: 200,
    message: "Berhasil Update Status",
  };
}
