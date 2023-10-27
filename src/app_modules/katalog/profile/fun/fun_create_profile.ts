"use server";

import prisma from "@/app/lib/prisma";

export default async function funCreateNewProfile(data: any) {
  // console.log(data);
  const body = data;

  const res = await prisma.profile.create({
    data: {
      userId: body.userId,
      name: body.name,
      email: body.email,
      alamat: body.alamat,
      jenisKelamin: body.jenisKelamin,
    },
  });

  if (!res) return { status: 400 };

  return {
    status: 201,
    success: true,
  };
}
