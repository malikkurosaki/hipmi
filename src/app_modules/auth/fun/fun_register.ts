"use server";

import prisma from "@/app/lib/prisma";
import { sealData } from "iron-session";
import { cookies } from "next/headers";

import fs from "fs";
import yaml from "yaml";
const config = yaml.parse(fs.readFileSync("config.yaml").toString());

export async function Auth_funRegister(data: any) {
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

  const seal = await sealData(
    JSON.stringify({
      id: create.id,
      username: create.username,
    }),
    {
      password: await config.server.password,
    }
  );

  cookies().set({
    name: "ssn",
    value: seal,
    maxAge: 60 * 60 * 24 * 7,
  });

  return { status: 200, message: "Berhasil Mendaftar" };
}
