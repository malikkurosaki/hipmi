"use server";

"use server";

import { prisma } from "@/app/lib";

export async function notifikasi_funJobCheckStatus({ id }: { id: string }) {
  const data = await prisma.job.findUnique({
    where: {
      id: id,
    },
    select: {
      masterStatusId: true
    },
  });

  if (!data)
    return { status: 400, message: "Job tidak ditemukan", statusId: "" };
  return {
    status: 200,
    message: "Berhasil di cek",
    statusId: data.masterStatusId,
  };

}
