"use server";

import prisma from "@/app/lib/prisma";
import { user_funGetOneUserId } from "@/app_modules/fun_global/get_user_token";

export default async function colab_funCekPartisipasiById(colabId: string) {
  const UserLoginId = await user_funGetOneUserId();

  const cek = await prisma.projectCollaboration_Partisipasi.findFirst({
    where: {
      projectCollaborationId: colabId,
      userId: UserLoginId,
    },
  });


  if (cek === null) {
    return (false);
  } else {
    return (true);
  }
}
