"use server";

import prisma from "@/app/lib/prisma";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function auth_Logout(kodeId: string) {
  const userId = await funGetUserIdByToken();

  try {
    const delToken = await prisma.userSession.delete({
      where: {
        userId: userId,
      },
    });

    if (!delToken) return { status: 400, message: "Gagal Hapus User Session" };
    cookies().set({
      name: "ssn",
      value: "",
      maxAge: 0,
      expires: 0,
    });

    return { status: 200, message: "Logout Berhasil" };
  } catch (error) {
    console.log(error);
  }

  // const del = await prisma.kodeOtp.delete({
  //   where: {
  //     id: kodeId,
  //   },
  // });
  // if (!del) return { status: 400, message: "Gagal Hapus Kode OTP Id"};
  // revalidatePath("/dev/katalog")
  return { status: 200, message: "Logout Berhasil" };
}
