"use server";

import prisma from "@/app/lib/prisma";
import fs from "fs";
import { revalidatePath } from "next/cache";

export async function Donasi_funDeleteKabar(kabarId: string) {
  const dataKabar = await prisma.donasi_Kabar.findFirst({
    where: {
      id: kabarId,
    },
    select: {
      imagesId: true,
    },
  });

  if (dataKabar?.imagesId !== null) {
    const delImg = await prisma.images.delete({
      where: {
        id: dataKabar?.imagesId,
      },
      select: {
        url: true,
      },
    });

    if (!delImg) return { status: 400, message: "Gagal hapus gambar" };
    if (delImg) fs.unlinkSync(`./public/donasi/kabar/${delImg.url}`);
    revalidatePath("/dev/donasi/list_kabar");
  }

  const delNotif = await prisma.donasi_Notif.deleteMany({
    where: {
      donasi_KabarId: kabarId,
    },
  });
  if (!delNotif) return { status: 400, message: "Gagal hapus notif" };

  const del = await prisma.donasi_Kabar.delete({
    where: {
      id: kabarId,
    },
  });
  if (!del) return { status: 400, message: "Gagal hapus data" };

  revalidatePath("/dev/donasi/notif_page");
  return {
    status: 200,
    message: "Berhasl hapus",
  };
}
