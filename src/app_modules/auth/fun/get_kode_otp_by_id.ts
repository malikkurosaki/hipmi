"use server";

import prisma from "@/app/lib/prisma";

export async function auth_getKodeOtpById({nomor}: {nomor: string}) {
  const data = await prisma.kodeOtp.findFirst({
    where: {
      nomor: nomor,
    },
  });

  return data;
}
