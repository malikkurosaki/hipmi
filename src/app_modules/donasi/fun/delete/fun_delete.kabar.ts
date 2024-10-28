"use server";

import prisma from "@/app/lib/prisma";
import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import { revalidatePath } from "next/cache";

export async function Donasi_funDeleteKabar(kabarId: string) {
  const del = await prisma.donasi_Kabar.delete({
    where: {
      id: kabarId,
    },
    select:{
      imageId: true
    }
  });
  if (!del) return { status: 400, message: "Gagal hapus data" };

  revalidatePath(RouterDonasi.list_kabar);
  return {
    status: 200,
    message: "Berhasl hapus",
    imageId: del.imageId
  };
}
