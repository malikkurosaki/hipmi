"use server";

import prisma from "@/app/lib/prisma";

export async function Donasi_getNotifByUserId(userId: string) {
  const dataInvoice = await prisma.donasi_Invoice.findFirst({
    where: {
      authorId: userId
    }
  })

  // console.log(dataInvoice)

  // return null
  const dataNotif = await prisma.donasi_Notif.findMany({
    orderBy: {
      createdAt: "desc"
    },
    where: {
      userId: userId,
    },
    select: {
      id: true,
      isRead: true,
      active: true,
      createdAt: true,
      donasi_KabarId: true,
      Donasi_Kabar: true,
    },
  });
  return dataNotif;
}
