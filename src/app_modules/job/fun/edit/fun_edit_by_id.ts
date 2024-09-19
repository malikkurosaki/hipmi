"use server";

import prisma from "@/app/lib/prisma";
import { RouterJob } from "@/app/lib/router_hipmi/router_job";
import { revalidatePath } from "next/cache";
import { MODEL_JOB } from "../../model/interface";

export async function job_EditById({
  data,
  fileId,
}: {
  data: MODEL_JOB;
  fileId?: string;
}) {
  if (fileId == undefined) {
    const updt = await prisma.job.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        content: data.content,
        deskripsi: data.deskripsi,
      },
    });
    if (!updt) return { status: 400, message: "Gagal Update" };
    revalidatePath(RouterJob.status);

    return {
      status: 200,
      message: "Berhasil Update",
    };
  } else {
    const updtWithFile = await prisma.job.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        content: data.content,
        deskripsi: data.deskripsi,
        imageId: fileId,
      },
    });
    if (!updtWithFile) return { status: 400, message: "Gagal Update" };
    revalidatePath(RouterJob.status);

    return {
      status: 200,
      message: "Berhasil Update",
    };
  }
}
