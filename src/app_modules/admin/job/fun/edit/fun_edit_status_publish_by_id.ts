"use server";

import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export async function AdminJob_funEditStatusPublishById(jobId: string) {
  const updt = await prisma.job.update({
    where: {
      id: jobId,
    },
    data: {
      masterStatusId: "1",
    },
  });


  if(!updt) return {status: 400, message: "Update Gagal"}
  revalidatePath("/dev/admin/job/child/table_review");
  return {status: 200, message: "Berhasil Update"}
}
