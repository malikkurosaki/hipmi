"use server";

import prisma from "@/app/lib/prisma";

export async function Profile_getOneById(profileId: string) {
  const data = await prisma.profile.findFirst({
    where: {
      id: profileId,
    },
  });

  
  return data;
}
