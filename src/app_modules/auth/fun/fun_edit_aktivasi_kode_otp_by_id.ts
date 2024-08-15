"use server";

import prisma from "@/app/lib/prisma";

export async function auth_funDeleteAktivasiKodeOtpById(otpId: string) {
  // console.log(otpId);
  const updt = await prisma.kodeOtp.delete({
    where: {
      id: otpId,
    },
  });

  if (!updt) return { status: 400, message: "Gagal Update Aktivasi Kode OTP" };
  return { status: 200, message: "Berhasil Update Aktivasi Kode OTP" };
}
