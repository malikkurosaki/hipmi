"use server";

import prisma from "@/app/lib/prisma";

export async function Event_getListKontibusiByUserId(userId: string) {
  const data = await prisma.event_Peserta.findMany({
    where: {
      userId: userId,
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
