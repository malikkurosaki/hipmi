"use server";

import prisma from "@/app/lib/prisma";
import _ from "lodash";

export async function Event_getListRiwayatSaya(authorId: string) {
  const data = await prisma.event.findMany({
    orderBy: {
      tanggal: "desc",
    },
    where: {
      authorId: authorId,
      eventMaster_StatusId: "1",
      tanggal: {
        lte: new Date(),
      },
    },
    select: {
      id: true,
      title: true,
      tanggal: true,
      deskripsi: true,
      active: true,
      authorId: true,
      Author: {
        select: {
          Profile: true,
        },
      },
    },
  });

  return data;
}
