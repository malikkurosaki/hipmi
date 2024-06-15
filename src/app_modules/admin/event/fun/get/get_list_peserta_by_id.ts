"use server";

import prisma from "@/app/lib/prisma";

export async function AdminEvent_getListPesertaById(eventId: string) {
  const data = await prisma.event_Peserta.findMany({
    where: {
      eventId: eventId,
    },
    select: {
      id: true,
      User: {
        select: {
          Profile: true,
        },
      },
    },
  });

  return data;
}
