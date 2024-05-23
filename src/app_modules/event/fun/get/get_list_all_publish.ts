"use server";

import prisma from "@/app/lib/prisma";
import _ from "lodash";

export async function Event_getListAllPublish() {
  const data = await prisma.event.findMany({
    orderBy: {
      tanggal: "desc",
    },
    where: {
      active: true,
      eventMaster_StatusId: "1",
      tanggal: {
        gte: new Date(),
      },
    },
    select: {
      id: true,
      title: true,
      lokasi: true,
      tanggal: true,
      deskripsi: true,
      active: true,
      catatan: true,
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
