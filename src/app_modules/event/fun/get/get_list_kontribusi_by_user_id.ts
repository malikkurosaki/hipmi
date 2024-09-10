"use server";

import prisma from "@/app/lib/prisma";
import { user_funGetOneUserId } from "@/app_modules/fun_global/get_user_token";

export async function event_getListKontibusiByUserId({page}: {page: number}) {
  const userLoginId = await user_funGetOneUserId();

  const takeData = 10;
  const skipData = page * takeData - takeData;

  const data = await prisma.event_Peserta.findMany({
    take: takeData,
    skip: skipData,
    orderBy: {
      createdAt: "desc",
    },
    where: {
      userId: userLoginId,
    },
    select: {
      id: true,
      Event: {
        select: {
          id: true,
          title: true,
          tanggal: true,
          deskripsi: true,
          Author: {
            select: {
              Profile: true,
            },
          },
          Event_Peserta: {
            take: 5,
            orderBy: {
              createdAt: "desc",
            },
            select: {
              id: true,
              userId: true,
              User: {
                select: {
                    Profile: true
                }
              },
            },
          },
        },
      },
    },
  });
//   console.log(data);

  return data;
}
