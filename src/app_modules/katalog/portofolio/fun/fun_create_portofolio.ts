"use server";

import prisma from "@/app/lib/prisma";
import { MODEL_PORTOFOLIO } from "@/app_modules/models/portofolio";
import { revalidatePath } from "next/cache";

export default async function funCreatePortofolio(data: MODEL_PORTOFOLIO) {
  console.log(data);

  const res = await prisma.katalog.create({
    data: {
      profileId: data.profileId,
      namaBisnis: data.namaBisnis,
      deskripsi: data.deskripsi,
      tlpn: data.tlpn,
      alamatKantor: data.alamatKantor,
      masterBidangBisnisId: data.masterBidangBisnisId,
    },
  });

  if (!res)
    return {
      status: 401,
      success: false,
    };

  revalidatePath(`/dev/katalog/${data.profileId}`);
  return {
    status: 201,
    success: true,
  };
}
