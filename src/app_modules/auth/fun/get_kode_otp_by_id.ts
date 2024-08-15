"use server";

import prisma from "@/app/lib/prisma";

export async function auth_getKodeOtpById(otpId: string) {
  const data = await prisma.kodeOtp.findFirst({
    where: {
      id: otpId,
    },
  });

  return data;
}
