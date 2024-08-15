"use server";

import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function auth_Logout(kodeId: string) {
  cookies().set({
    name: "ssn",
    value: "",
    maxAge: 0,
  });
  
  const c = cookies().get("ssn");
  if (c?.value !== "") return { status: 400, message: "Gagal Logout" };

  // const del = await prisma.kodeOtp.delete({
  //   where: {
  //     id: kodeId,
  //   },
  // });
  // if (!del) return { status: 400, message: "Gagal Hapus Kode OTP Id"};
  // revalidatePath("/dev/katalog")
  return { status: 200, message: "Logout Berhasil" };
}
