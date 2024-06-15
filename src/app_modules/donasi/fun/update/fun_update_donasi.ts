"use server";

import prisma from "@/app/lib/prisma";
import { MODEL_DONASI } from "../../model/interface";
import _ from "lodash";
import { v4 } from "uuid";
import fs from "fs";
import { revalidatePath, revalidateTag } from "next/cache";
import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";

export async function Donasi_funUpdateDonasi(
  data: MODEL_DONASI,
  file: FormData
) {
  //   console.log(data);

  const gambar: any = file.get("file");
  if (gambar !== "null") {
    const fileName = gambar.name;
    const fileExtension = _.lowerCase(gambar.name.split(".").pop());
    const fileRandomName = v4(fileName) + "." + fileExtension;

    const cariGambar = await prisma.images.findFirst({
      where: {
        id: data.imagesId,
      },
      select: {
        url: true,
      },
    });

    if (!cariGambar) return { status: 400, message: "Gambar tidak ditemukan" };
    revalidatePath("/dev/donasi/detail/detail_draft");
    fs.unlinkSync(`./public/donasi/image/${cariGambar.url}`);

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
    fs.writeFileSync(`./public/donasi/image/${updateGambar.url}`, uploadFolder);
  }

  const update = await prisma.donasi.update({
    where: {
      id: data.id,
    },
    data: {
      donasiMaster_KategoriId: data.donasiMaster_KategoriId,
      donasiMaster_DurasiId: data.donasiMaster_DurasiId,
      title: data.title,
      target: data.target,
    },
  });

  if (!update) return { status: 400, message: "Gagal update" };
  revalidatePath("/dev/donasi/detail/detail_draft");

  return {
    status: 200,
    message: "Berhasil update",
  };
}
