"use server";

import prisma from "@/app/lib/prisma";
import { RouterColab } from "@/app/lib/router_hipmi/router_colab";
import { revalidatePath } from "next/cache";

export default async function colab_funCreatePartisipan(
  colabId: string,
  userId: string
) {
  const create = await prisma.projectCollaboration_Partisipasi.create({
    data: {
      projectCollaborationId: colabId,
      userId: userId,
    },
  });

  if (!create) return { status: 400, message: "Gagal menambahkan partisipan" };
  revalidatePath(RouterColab.main_detail + colabId);
  return { status: 201, message: "Berhasil menambahkan partisipan" };
}
