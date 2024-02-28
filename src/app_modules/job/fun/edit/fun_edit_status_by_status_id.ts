"use server";

import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export async function Job_funEditStatusByStatusId(
  jobId: string,
  statusId: string
) {
  const updt = await prisma.job.update({
    where: {
      id: jobId,
    },
    data: {
      masterStatusId: statusId,
    },
  });

  if (!updt) return { status: 400, message: "Gagal ganti status" };
  revalidatePath("/dev/job/main/status");
  return { status: 200, message: "Berhasil  ganti status" };
}
