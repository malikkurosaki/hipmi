"use server";

import prisma from "@/app/lib/prisma";
import { user_funGetOneUserId } from "@/app_modules/fun_global/get_user_token";
import _ from "lodash";

export default async function notifikasi_getByUserId({
  page,
  kategoriApp,
}: {
  page: number;
  kategoriApp?: string;
}) {
  const userId = await user_funGetOneUserId();
  const takeData = 10;
  const skipData = page * takeData - takeData;

  if (kategoriApp === "Semua") {
    const data = await prisma.notifikasi.findMany({
      take: takeData,
      skip: skipData,
      orderBy: [
        {
          isRead: "asc",
        },
        { createdAt: "desc" },
      ],
      where: {
        userId: userId,
        userRoleId: "1",
      },
    });

    return data;
  }

  const allData = await prisma.notifikasi.findMany({
    take: takeData,
    skip: skipData,
    orderBy: [
      {
        isRead: "asc",
      },
      { createdAt: "desc" },
    ],
    where: {
      userId: userId,
      userRoleId: "1",
      kategoriApp: _.upperCase(kategoriApp),
    },
  });

  return allData;
}
