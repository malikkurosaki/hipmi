"use server";

import prisma from "@/app/lib/prisma";
import { user_getOneUserId } from "@/app_modules/fun_global/get_user_token";

export async function investasi_funGetTransaksiByUserId({
  page,
}: {
  page: number;
}) {
  const authorId = await user_getOneUserId();
  const takeData = 10;
  const skipData = page * takeData - takeData;

  const data = await prisma.investasi_Invoice.findMany({
    take: takeData,
    skip: skipData,
    orderBy: {
      updatedAt: "desc",
    },
    where: {
      authorId: authorId,
    },
    include: {
      Investasi: true,
      MasterBank: true,
      StatusInvoice: true,
    },
  });

  return data;
}
