"use server";

import prisma from "@/app/lib/prisma";
import { sealData } from "iron-session";
import { cookies } from "next/headers";

export async function Auth_funRegister({
  data,
  HIPMI_PWD,
}: {
  data: any;
  HIPMI_PWD: string;
}) {
  const cekUsername = await prisma.user.findUnique({
    where: {
      username: data.username,
    },
  });

  if (cekUsername != null)
    return {
      status: 400,
      message: "Username sudah terdaftar",
    };

  const create = await prisma.user.create({
    data: {
      username: data.username,
      nomor: data.nomor,
    },
  });
  if (!create) return { status: 400, message: "Gagal Mendaftar" };

  const sealToken = await sealData(
    JSON.stringify({
      id: create.id,
      username: create.username,
    }),
    {
      password: HIPMI_PWD,
    }
  );

  cookies().set({
    name: "ssn",
    value: sealToken,
    // maxAge: 60 * 60 * 24 * 7,
  });

  const createUserSession = await prisma.userSession.create({
    data: {
      token: sealToken,
      userId: create.id,
    },
  });

  if (!createUserSession)
    return { status: 400, message: "Gagal Membuat User Session" };

  return { status: 200, message: "Berhasil Mendaftar" };
}
