"use server";

import prisma from "@/app/lib/prisma";
import { User_getUserId } from "@/app_modules/fun_global/get_user_token";

export default async function colab_funCekPartisipasiById(colabId: string) {
  const UserLoginId = await User_getUserId();

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
