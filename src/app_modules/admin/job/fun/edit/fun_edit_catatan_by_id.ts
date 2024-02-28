"use server";

import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export async function AdminJob_funEditCatatanById(
  jobId: string,
  catatan: string
) {
  const up = await prisma.job.update({
    where: {
      id: jobId,
    },
    data: {
      masterStatusId: "4",
      catatan: catatan,
    },
  });

  if (!up) return { status: 400, message: "Gagal reject" };
  revalidatePath("/dev/admin/job/child/table_review");
  return { status: 200, message: "Berhasil reject" };
}
