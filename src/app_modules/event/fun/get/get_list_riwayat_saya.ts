"use server";

import prisma from "@/app/lib/prisma";
import { user_getOneUserId } from "@/app_modules/fun_global/get_user_token";
import _ from "lodash";

export async function event_getListRiwayatSaya({page}: {page: number}) {
  const authorId = await user_getOneUserId();

  const takeData = 10;
  const skipData = page * takeData - takeData;


  const data = await prisma.event.findMany({
    take: takeData,
    skip: skipData,
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
