"use server";

import { myConsole } from "@/app/fun/my_console";
import prisma from "@/app/lib/prisma";
import { getToken } from "@/app_modules/home";
import { NextResponse } from "next/server";


/**
 * @function api get data profile by user id
 * @returns data profile 
 */
export async function getProfile() {
  const token = await getToken();

  const dataProfile = await prisma.profile.findUnique({
    where: {
      userId: token.id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      alamat: true,
      jenisKelamin: true,
      active: true,
      ImageProfile: {
        select: {
          id: true,
          url: true,
          active: true,
        },
      },
      User: {
        select : {
          username: true,
          nomor: true
        }
      }
    },
  });

  return dataProfile;
}
