"use server";

import prisma from "@/app/lib/prisma";
import { MODEL_COLLABORATION } from "../../model/interface";
import { User_getUserId } from "@/app_modules/fun_global/get_user_token";

export default async function colab_funCreateProyek(
  value: MODEL_COLLABORATION
) {
  const Author = await User_getUserId();
  console.log(Author);

  const create = await prisma.projectCollaboration.create({
    data: {
      title: value.title,
      lokasi: value.lokasi,
      purpose: value.purpose,
      benefit: value.benefit,
      projectCollaborationMaster_IndustriId:
        value.projectCollaborationMaster_IndustriId,
      userId: Author
    },
  });

  if (!create) return { status: 400, message: "Gagal Membuat Proyek" };
  return { status: 201, message: "Berhasil Membuar Proyek" };
}
