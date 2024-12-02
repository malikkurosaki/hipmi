"use server";

import { prisma } from "@/app/lib";
import { ServerEnv } from "@/app/lib/server_env";
import { unsealData } from "iron-session";
import { cookies } from "next/headers";

export async function funGetUserIdByToken() {
   const c = cookies().get(process.env.NEXT_PUBLIC_BASE_SESSION_KEY!);

  //  const token = JSON.parse(
  //    await unsealData(c?.value as string, {
  //      password: process.env.WIBU_PWD as string,
  //    })
  //  );
  //  return token.id;

  const token = c?.value
  const cekToken = await prisma.userSession.findFirst({
    where: {
      token: token,
    },
  });

  // if (cekToken === null) return null
  return cekToken?.userId
}
