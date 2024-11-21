"use server";

import prisma from "@/app/lib/prisma";
import { cookies } from "next/headers";

export async function funGetUserIdByToken() {
  const c = cookies().get("mySession");
  const token = c?.value
  const cekToken = await prisma.userSession.findFirst({
    where: {
      token: token,
    },
  });

  if (cekToken === null) return null
  return cekToken.userId;
}
