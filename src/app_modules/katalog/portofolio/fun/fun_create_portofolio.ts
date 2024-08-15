"use server";

import prisma from "@/app/lib/prisma";
import { MODEL_PORTOFOLIO_OLD } from "@/app_modules/model_global/portofolio";
import { revalidatePath } from "next/cache";
import { MODEL_PORTOFOLIO, MODEL_PORTOFOLIO_MEDSOS } from "../model/interface";
import _ from "lodash";
import { v4 } from "uuid";
import fs from "fs";

export default async function funCreatePortofolio(
  profileId: string,
  data: MODEL_PORTOFOLIO,
  file: FormData,
  medsos: MODEL_PORTOFOLIO_MEDSOS
) {
  const gambar: any = file.get("file");
  const fileName = gambar.name;
  const fileExtension = _.lowerCase(gambar.name.split(".").pop());
  const fRandomName = v4(fileName) + "." + fileExtension;

  const upload = await prisma.images.create({
    data: {
      url: fRandomName,
      label: "PORTOFOLIO_LOGO",
    },
    select: {
      id: true,
      url: true,
    },
  });

  if (!upload) return { status: 400, message: "Gagal upload logo portofolio" };
  const upload_Folder = Buffer.from(await gambar.arrayBuffer());
  fs.writeFileSync(`./public/portofolio/logo/${upload.url}`, upload_Folder);

  const createPortofolio = await prisma.portofolio.create({
    data: {
      profileId: profileId,
      id_Portofolio: "Porto" + Date.now().toString(),
      namaBisnis: data.namaBisnis,
      deskripsi: data.deskripsi,
      tlpn: data.tlpn,
      alamatKantor: data.alamatKantor,
      masterBidangBisnisId: data.masterBidangBisnisId,
      logoId: upload.id,
    },
  });

  if (!createPortofolio) return { status: 400, message: "Gagal membuat portofolio" };

  const createMedsos = await prisma.portofolio_MediaSosial.create({
    data: {
      portofolioId: createPortofolio.id,
      facebook: medsos.facebook,
      instagram: medsos.instagram,
      tiktok: medsos.tiktok,
      twitter: medsos.twitter,
      youtube: medsos.youtube,
    },
  });

  if (!createMedsos)
    return { status: 400, message: "Gagal menambahkan medsos" };

  revalidatePath(`/dev/katalog`);
  return {
    id: createPortofolio.id,
    status: 201,
    message: "Berhasil menambahakan portofolio",
  };
}
