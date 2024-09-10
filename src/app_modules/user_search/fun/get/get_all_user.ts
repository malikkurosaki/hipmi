"use server";

import prisma from "@/app/lib/prisma";
import { user_funGetOneUserId } from "@/app_modules/fun_global/get_user_token";

export async function userSearch_getAllUser({
  page,
  search,
}: {
  page: number;
  search?: string;
}) {
  const userLoginId = await user_funGetOneUserId();
  const takeData = 20;
  const skipData = page * takeData - takeData;

  const data = await prisma.user.findMany({
    take: takeData,
    skip: skipData,
    orderBy: {
      username: "asc",
    },
    where: {
      active: true,
      masterUserRoleId: "1",
      username: {
        contains: search,
        mode: "insensitive",
      },
      NOT: {
        Profile: null,
      },
      OR: [
        {
          NOT: {
            id: userLoginId,
          },
        },
      ],
    },
    select: {
      id: true,
      username: true,
      nomor: true,
      active: true,
      masterUserRoleId: true,
      Profile: {
        select: {
          id: true,
          name: true,
          imagesId: true,
        },
      },
    },
  });

  return data;
}
