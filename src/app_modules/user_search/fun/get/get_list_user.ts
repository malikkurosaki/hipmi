"use server";

import prisma from "@/app/lib/prisma";
import { user_getOneUserId } from "@/app_modules/fun_global/get_user_token";

export async function UserSearch_getListUser({ name }: { name: string }) {
  const userLoginId = await user_getOneUserId();

  if (name === "") {
    const data = await prisma.user.findMany({
      where: {
        masterUserRoleId: "1",
        NOT: {
          id: userLoginId,
        },
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

  const getDataCari = await prisma.user.findMany({
    where: {
      masterUserRoleId: "1",
      Profile: {
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
      NOT: {
        id: userLoginId,
      },
    },
    select: {
      id: true,
      username: true,
      nomor: true,
      active: true,
      masterUserRoleId: true,
      Profile: true,
    },
  });

  return getDataCari;
}
