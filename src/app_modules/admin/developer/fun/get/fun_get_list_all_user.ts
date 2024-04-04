"use server";

import prisma from "@/app/lib/prisma";

export default async function adminDeveloper_funGetListAllUser() {
  const data = await prisma.user.findMany({
    orderBy: {
      updatedAt: "asc",
    },
    where: {
      masterUserRoleId: "1",
    },
  });
  return data;
}
