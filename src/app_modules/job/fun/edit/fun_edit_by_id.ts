"use server";

import prisma from "@/app/lib/prisma";
import _ from "lodash";
import { v4 } from "uuid";
import fs from "fs";
import { MODEL_JOB } from "../../model/interface";
import { revalidatePath } from "next/cache";
import { RouterJob } from "@/app/lib/router_hipmi/router_job";

export async function job_EditById({
  data,
  imageId,
}: {
  data: MODEL_JOB;
  imageId?: string;
}) {
  if (imageId == undefined) {
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
        imageId: imageId,
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
