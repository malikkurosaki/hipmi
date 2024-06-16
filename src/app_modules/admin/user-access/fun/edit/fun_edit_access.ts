"use server";

import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export default async function adminUserAccess_funEditAccess(
  userId: string,
  value: boolean
) {
  const updt = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      active: value,
    },
  });

  if (!updt) return { status: 400, message: "Update gagal" };
  revalidatePath("/dev/admin/user-access");
  return { status: 200, message: "Update berhasil" };
}
