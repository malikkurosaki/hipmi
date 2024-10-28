"use server";

import prisma from "@/app/lib/prisma";
import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import { revalidatePath } from "next/cache";
import { MODEL_CERITA_DONASI } from "../../model/interface";

export async function Donasi_funUpdateCerita({
  data,
  fileId,
}: {
  data: MODEL_CERITA_DONASI;
  fileId?: string;
}) {
  if (fileId !== undefined) {
    const updateFileId = await prisma.donasi_Cerita.update({
      where: {
        id: data.id,
      },
      data: {
        imageId: fileId,
      },
    });

    if (!updateFileId) return { status: 400, message: "Gagal update" };
  }

  const update = await prisma.donasi_Cerita.update({
    where: {
      id: data.id,
    },
    data: {
      pembukaan: data.pembukaan,
      cerita: data.cerita,
    },
  });

  if (!update) return { status: 400, message: "Gagal update cerita" };
  revalidatePath(RouterDonasi.detail_draft + data.id);

  return {
    status: 200,
    message: "Berhasil update cerita",
  };
}
