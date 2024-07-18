"use server";

import prisma from "@/app/lib/prisma";
import _ from "lodash";

export async function event_getListAllPublish({ page }: { page: number }) {
  const takeData = 10;
  const skipData = page * takeData - takeData;
  const data = await prisma.event.findMany({
    take: takeData,
    skip: skipData,
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
