"use server";

import prisma from "@/app/lib/prisma";
import { RouterHome } from "@/app/lib/router_hipmi/router_home";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { revalidatePath } from "next/cache";

export default async function notifikasi_countUserNotifikasi() {
  const userLoginId = await funGetUserIdByToken();

  const count = await prisma.notifikasi.findMany({
    where: {
      userId: userLoginId,
      isRead: false,
      userRoleId: "1",
    },
  });

  revalidatePath(RouterHome.main_home);
  return count.length;
}
