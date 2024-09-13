"use server";

import { prisma } from "@/app/lib";
import { user_funGetOneUserId } from "@/app_modules/fun_global";
import { revalidatePath } from "next/cache";
import { MODEL_JOB } from "../../model/interface";

export async function job_funCreateNoFile({ data }: { data: MODEL_JOB }) {
  const authorId = await user_funGetOneUserId();

  const createNoImage = await prisma.job.create({
    data: {
      title: data.title,
      content: data.content,
      deskripsi: data.deskripsi,
      authorId: authorId,
    },
    select: {
      id: true,
      authorId: true,
      MasterStatus: {
        select: {
          name: true,
        },
      },
      title: true,
    },
  });

  if (!createNoImage) return { status: 400, message: "Gagal Disimpan" };
  revalidatePath("/dev/job/main/status");
  return {
    status: 201,
    message: "Berhasil Disimpan",
    data: createNoImage,
  };
}
