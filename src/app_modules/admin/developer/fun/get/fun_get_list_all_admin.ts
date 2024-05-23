"use server"

import prisma from "@/app/lib/prisma"

export default async function adminDeveloper_funGetListAllAdmin() {
    const data = await prisma.user.findMany({
      orderBy: {
        updatedAt: "asc",
      },
      where: {
        masterUserRoleId: "2",
      },
    });
    return data;
}