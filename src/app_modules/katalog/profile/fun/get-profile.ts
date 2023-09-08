"use server";

import prisma from "@/app/lib/prisma";

export async function getDataProfile(id: string) {
  //   console.log(id);
  const data = await prisma.profile.findUnique({
    where: {
      userId: id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      alamat: true,
      jenisKelamin: true,
      active: true,
      Images: true,
      User: true,
    },
  });

  // console.log(data);

  return data;
}
