"use server";

import prisma from "@/app/lib/prisma";
import _ from "lodash";
import { v4 } from "uuid";
import fs from "fs";
import { MODEL_DONASI_KABAR } from "../../model/interface";
import { revalidatePath } from "next/cache";
import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";

export async function Donasi_funCreateKabar(
  req: MODEL_DONASI_KABAR | any,
  file: FormData
) {
  const dataImage: any = file.get("file");
  if (dataImage !== "null") {
    const fileName = dataImage.name;
    const fileExtension = _.lowerCase(dataImage.name.split(".").pop());
    const fRandomName = v4(fileName) + "." + fileExtension;

    const upload = await prisma.images.create({
      data: {
        url: fRandomName,
        label: "DONASI_KABAR",
      },
      select: {
        id: true,
        url: true,
      },
    });

    if (!upload) return { status: 400, message: "Gagal upload gambar" };
    const uploadFolder = Buffer.from(await dataImage.arrayBuffer());
    fs.writeFileSync(`./public/donasi/kabar/${upload.url}`, uploadFolder);

    const createWithPhoto = await prisma.donasi_Kabar.create({
      data: {
        title: req.title,
        deskripsi: req.deskripsi,
        donasiId: req.donasiId,
        imagesId: upload.id,
      },
      select: {
        Donasi: {
          select: {
            id: true,
            title: true,
            authorId: true,
          },
        },
      },
    });

    if (!createWithPhoto) return { status: 400, message: "Gagal membuat data" };
    return {
      status: 200,
      message: "Berhasil disimpan",
      data: createWithPhoto,
    };
  }

  const create = await prisma.donasi_Kabar.create({
    data: {
      title: req.title,
      deskripsi: req.deskripsi,
      donasiId: req.donasiId,
    },
    select: {
      Donasi: {
        select: {
          id: true,
          title: true,
          authorId: true,
        },
      },
    },
  });

  revalidatePath("/dev/donasi/list_kabar");
  return {
    status: 200,
    message: "Berhasil disimpan",
    data: create,
  };
}
