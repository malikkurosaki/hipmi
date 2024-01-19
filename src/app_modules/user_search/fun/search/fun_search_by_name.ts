"use server";

import prisma from "@/app/lib/prisma";
import { useSearchParams } from "next/navigation";
import { NextRequest } from "next/server";

export async function UserSearch_searchByName(name: string) {
  const data = await prisma.user.findMany({
    where: {
      Profile: {
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
    },
    take: 10,
    select: {
      id: true,
      username: true,
      nomor: true,
      active: true,
      masterUserRoleId: true,
      Profile: true,
    },
  });

  return data;
}
