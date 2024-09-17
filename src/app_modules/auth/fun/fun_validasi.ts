"use server";

import prisma from "@/app/lib/prisma";
import { sealData } from "iron-session";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { RouterHome } from "@/app/lib/router_hipmi/router_home";
import { PwdCookies } from "@/app/lib";


export async function auth_funValidasi(nomor: string) {
  const cek = await prisma.user.findUnique({
    where: {
      nomor: nomor,
    },
    select: {
      id: true,
      nomor: true,
      username: true,
      masterUserRoleId: true,
    },
  });

  if (cek === null) return { status: 400, message: "Nomor Belum Terdaftar" };
  if (cek) {
    const res = await sealData(
      JSON.stringify({
        id: cek.id,
        username: cek.username,
      }),
      {
        password: PwdCookies,
      }
    );

    cookies().set({
      name: "ssn",
      value: res,
      maxAge: 60 * 60 * 24 * 30,
    });

    revalidatePath(RouterHome.main_home);
  }

  return {
    status: 200,
    message: "Nomor Terverifikasi",
    role: cek.masterUserRoleId,
  };
}
