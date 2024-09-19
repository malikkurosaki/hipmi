"use server";

import { prisma } from "@/app/lib";
import _ from "lodash";
import { cookies } from "next/headers";

export async function funCheckToken() {
  const c = cookies().get("ssn");
  const cekToken = await prisma.userSession.findFirst({
    where: {
      token: c?.value,
    },
  });

  if (cekToken === null) return false;
  return true;
}
