"use server";

import prisma from "@/app/lib/prisma";
import fs from "fs";
import { revalidatePath } from "next/cache";

export async function Donasi_funDeleteKabar(kabarId: string) {
  const del = await prisma.donasi_Kabar.delete({
    where: {
      id: kabarId,
    },
    select: {
      imagesId: true,
    },
  });
  if (!del) return { status: 400, message: "Gagal hapus data" };

  const delImg = await prisma.images.delete({
    where: {
      id: del.imagesId as any,
    },
    select: {
      url: true,
    },
  });

  if (!delImg) return { status: 400, message: "Gagal hapus gambar" };
  if (delImg) fs.unlinkSync(`./public/donasi/kabar/${delImg.url}`);
  revalidatePath("/dev/donasi/list_kabar");

  return {
    status: 200,
    message: "Berhasl hapus",
  };
}
