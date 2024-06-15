"use server";

import _ from "lodash";
import { MODEL_CERITA_DONASI } from "../../model/interface";
import { v4 } from "uuid";
import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import fs from "fs";

export async function Donasi_funUpdateCerita(
  data: MODEL_CERITA_DONASI,
  file: FormData
) {


  const gambar: any = file.get("file");
  if (gambar !== "null") {
    const fileName = gambar.name;
    const fileExtension = _.lowerCase(gambar.name.split(".").pop());
    const fileRandomName = v4(fileName) + "." + fileExtension;


    const updateGambar = await prisma.images.update({
      where: {
        id: data.imagesId,
      },
      data: {
        url: fileRandomName,
      },
    });

    if (!updateGambar) return { status: 400, message: "Update gambat gagal" };
    revalidatePath("/dev/donasi/detail/detail_draft");

    const uploadFolder = Buffer.from(await gambar.arrayBuffer());
    fs.writeFileSync(
      `./public/donasi/image_cerita/${updateGambar.url}`,
      uploadFolder
    );
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
  revalidatePath("/dev/donasi/detail/detail_draft");

  return {
    status: 200,
    message: "Berhasil update cerita",
  };
}
