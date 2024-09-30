"use server";

import prisma from "@/app/lib/prisma";

export async function event_getOneById(eventId: string) {
  const data = await prisma.event.findFirst({
    where: {
      id: eventId,
    },
    select: {
      id: true,
      title: true,
      lokasi: true,
      tanggal: true,
      deskripsi: true,
      active: true,
      createdAt: true,
      updatedAt: true,
      catatan: true,
      authorId: true,
      Author: {
        include: {
          Profile: true,
        },
      },
      eventMaster_StatusId: true,
      EventMaster_Status: true,
      eventMaster_TipeAcaraId: true,
      EventMaster_TipeAcara: true,
      // Event_Peserta: true,
    },
  });

  return data;
}
