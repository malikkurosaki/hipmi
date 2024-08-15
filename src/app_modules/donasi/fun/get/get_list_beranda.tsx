"use server";

import prisma from "@/app/lib/prisma";
import { tree } from "next/dist/build/templates/app-page";

export async function donasi_funGetAllPublish({ page }: { page: number }) {
  const takeData = 5;
  const skipData = page * takeData - takeData;

  const data = await prisma.donasi.findMany({
    take: takeData,
    skip: skipData,
    orderBy: {
      publishTime: "desc",
    },
    where: {
      donasiMaster_StatusDonasiId: "1",
      active: true,
    },
    select: {
      id: true,
      title: true,
      target: true,
      active: true,
      createdAt: true,
      updatedAt: true,
      publishTime: true,
      catatan: true,
      progres: true,
      terkumpul: true,
      authorId: true,
      imagesId: true,
      donasiMaster_KategoriId: true,
      donasiMaster_DurasiId: true,
      donasiMaster_StatusDonasiId: true,
      Author: true,
      imageDonasi: true,
      CeritaDonasi: true,
      DonasiMaster_Ketegori: true,
      DonasiMaster_Durasi: true,
      DonasiMaster_Status: true,
    },
  });

  return data;
}
