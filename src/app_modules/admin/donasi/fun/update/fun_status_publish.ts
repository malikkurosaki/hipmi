"use server";

import prisma from "@/app/lib/prisma";
import { RouterAdminDonasi } from "@/app/lib/router_hipmi/router_admin";
import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import { revalidatePath } from "next/cache";

export async function AdminDonasi_funUpdateStatusPublish(
  donasiId: string,
  statusId: string
) {
  const publishTime = Date.now();

  const data = await prisma.donasi.update({
    where: {
      id: donasiId,
    },
    data: {
      donasiMaster_StatusDonasiId: statusId,
      publishTime: new Date(publishTime),
    },
  });

  if (!data) return { status: 400, message: "Data tidak ditemukan" };
  revalidatePath("/dev/admin/donasi/table/review");
  return {
    status: 200,
    message: "Status berhasil diganti",
  };
}
