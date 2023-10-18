"use server";

import prisma from "@/app/lib/prisma";
import { USER_PROFILE } from "@/app_modules/models/user_profile";

export default async function funEditProfile(data: USER_PROFILE) {
  const res = await prisma.profile.update({
    where: {
      id: data.Profile?.id,
    },
    data: {
      name: data.Profile?.name,
      email: data.Profile?.email,
      alamat: data.Profile?.alamat,
      jenisKelamin: data.Profile?.jenisKelamin,
    },
  });

  if (!res) return { status: 400 };

  return {
    status: 200,
    success: true,
  };
}
