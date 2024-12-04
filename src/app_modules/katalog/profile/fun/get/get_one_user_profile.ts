"use server";

import prisma from "@/app/lib/prisma";

export async function Profile_getOneProfileAndUserById(profileId: string) {
  const data = await prisma.profile.findFirst({
    where: {
      id: profileId,
    },
    include: {
      User: true,
    },
  });
  // console.log(data)
  return data;
}
