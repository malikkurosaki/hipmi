"use server";

import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

/**
 * 
 * @param statusid | Review: 2, Draft: 3, Reject: 4
 * @param eventId 
 * @type string
 * @returns Update status id dari setiap event
 */
export async function Event_funEditStatusById(statusid: string, eventId: string) {
  const updt = await prisma.event.update({
    where: {
      id: eventId,
    },
    data: {
      eventMaster_StatusId: statusid,
    },
  });

  if (!updt) return { status: 400, message: "Gagal Update Status" };
  revalidatePath("/dev/event/main/status_page");
  return {
    status: 200,
    message: "Berhasil Update Status",
  };
}
