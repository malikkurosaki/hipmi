"use server";

import prisma from "@/app/lib/prisma";
import _ from "lodash";

export async function AdminEvent_getListAllRiwayat() {
  const data = await prisma.event.findMany({
    orderBy: {
      tanggal: "desc",
    },
    where: {
      eventMaster_StatusId: "1",
      tanggal: {
        lte: new Date(),
      },
    },
    select: {
        id: true,
        title: true,
        lokasi: true,
        tanggal: true,
        deskripsi: true,
        Author: {
          select: {
            id: true,
            username: true,
            Profile: {
              select: {
                name: true,
              },
            },
          },
        },
        EventMaster_TipeAcara: {
          select: {
            id: true,
            name: true,
          },
        },
      },

  });

  return data;
}
