"use server";

import prisma from "@/app/lib/prisma";

export default async function adminUserAccess_getListUser() {
  const get = await prisma.user.findMany({
    where: {
      masterUserRoleId: "1",
    },
  });

  return get;
}
