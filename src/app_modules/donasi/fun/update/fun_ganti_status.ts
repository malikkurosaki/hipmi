"use server";

import prisma from "@/app/lib/prisma";
import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import { revalidatePath } from "next/cache";

export async function Donasi_funGantiStatus(
  donasiId: string,
  statusId: string
) {
  const data = await prisma.donasi.update({
    where: {
      id: donasiId,
    },
    data: {
      donasiMaster_StatusDonasiId: statusId,
    },
  });


  if (!data) return { status: 400, message: "Data tidak ditemukan" };

  revalidatePath(RouterDonasi.main_galang_dana)
  return {
    status: 200,
    message: "Status berhasil diganti",
  };
}
