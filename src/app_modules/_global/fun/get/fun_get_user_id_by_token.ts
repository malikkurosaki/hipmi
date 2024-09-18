"use server";

import { cookies } from "next/headers";
import prisma from "@/app/lib/prisma";
import { redirect } from "next/navigation";
import { RouterAuth } from "@/app/lib/router_hipmi/router_auth";

export async function funGetUserIdByToken() {
  const c = cookies().get("ssn");
  const cekToken = await prisma.userSession.findFirst({
    where: {
      token: c?.value,
    },
  });

  if (cekToken === null) return redirect(RouterAuth.login);
  return cekToken.userId;
}
