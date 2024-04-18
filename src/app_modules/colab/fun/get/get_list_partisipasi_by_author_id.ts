"use server";

import prisma from "@/app/lib/prisma";
import { User_getUserId } from "@/app_modules/fun_global/get_user_token";

export default async function colab_getListPartisipasiByAuthorId() {
  const AuthorId = await User_getUserId();

  const get = await prisma.projectCollaboration_Partisipasi.findMany({
    where: {
      userId: AuthorId,
      isActive: true,
    },
    select: {
      id: true,
      isActive: true,
      ProjectCollaboration: {
        select: {
          id: true,
          isActive: true,
          title: true,
          lokasi: true,
          purpose: true,
          benefit: true,
          Author: {
            select: {
              id: true,
              Profile: true,
            },
          },
          ProjectCollaborationMaster_Industri: true,
          ProjectCollaboration_Partisipasi: {
            where: {
              isActive: true,
            },
          },
        },
      },
    },
  });

  if (!get) return { status: 400, message: "Gagal mengambil data" };
  return { data: get, status: 200, message: "Berhasil mengambil data" };
}
