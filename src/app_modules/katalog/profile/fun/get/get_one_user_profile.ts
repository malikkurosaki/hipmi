"use server";

import prisma from "@/app/lib/prisma";

export async function Profile_getOneProfileAndUserById(profileId: string) {
  const data = await prisma.profile.findFirst({
    where: {
      id: profileId,
    },
    select: {
        userId: true,
        User: true,
        id: true,
        name: true,
        email: true,
        alamat: true,
        jenisKelamin: true,
        imagesId: true,
        imagesBackgroundId: true,
        ImageProfile: true,
        ImagesBackground: true
        


    }
  });
  // console.log(data)
  return data;
}
