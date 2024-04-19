"use server";

import prisma from "@/app/lib/prisma";
import { MODEL_COLLABORATION } from "../../model/interface";
import { user_getOneUserId } from "@/app_modules/fun_global/get_user_token";
import { revalidatePath } from "next/cache";
import { RouterColab } from "@/app/lib/router_hipmi/router_colab";

export default async function colab_funCreateProyek(
  value: MODEL_COLLABORATION
) {
  const AuthorId = await user_getOneUserId();

  const create = await prisma.projectCollaboration.create({
    data: {
      title: value.title,
      lokasi: value.lokasi,
      purpose: value.purpose,
      benefit: value.benefit,
      projectCollaborationMaster_IndustriId:
        value.projectCollaborationMaster_IndustriId,
      userId: AuthorId
    },
  });

  if (!create) return { status: 400, message: "Gagal Membuat Proyek" };
  revalidatePath(RouterColab.beranda)
  return { status: 201, message: "Berhasil Membuar Proyek" };
}
