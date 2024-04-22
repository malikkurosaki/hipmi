"use server";

import prisma from "@/app/lib/prisma";

export async function UserSearch_getListUser() {
  const data = await prisma.user.findMany({
    where: {
      masterUserRoleId: "1"
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
