"use server";

import _, { update } from "lodash";
import { MODEL_MAP } from "../../lib/interface";
import { v4 } from "uuid";
import prisma from "@/app/lib/prisma";
import fs from "fs";
import { revalidatePath } from "next/cache";
import { RouterPortofolio } from "@/app/lib/router_hipmi/router_katalog";

export async function map_funEditMap({
  data,
  file,

}: {
  data: MODEL_MAP;
  file: FormData;
}) {
  // console.log(data, file);

  const gambar: any = file.get("file");
  if (gambar !== "null") {
    const fileName = gambar.name;
    const fileExtension = _.lowerCase(gambar.name.split(".").pop());
    const fRandomName = v4(fileName) + "." + fileExtension;

    const uploadImage = await prisma.images.create({
      data: {
        url: fRandomName,
        label: "MAP_PHOTO",
      },
      select: {
        id: true,
        url: true,
      },
    });

    if (!uploadImage)
      return { status: 400, message: "Gagal upload foto lokasi" };
    const upload_Folder = Buffer.from(await gambar.arrayBuffer());
    fs.writeFileSync(`./public/map/foto/${uploadImage.url}`, upload_Folder);

    const updt = await prisma.businessMaps.update({
      where: {
        id: data.id,
      },
      data: {
        latitude: data.latitude,
        longitude: data.longitude,
        namePin: data.namePin,
        imageMapId: uploadImage.id,
      },
    });

    if (!updt) return { status: 400, message: "Gagal update data" };
  }

  const updt = await prisma.businessMaps.update({
    where: {
      id: data.id,
    },
    data: {
      latitude: data.latitude,
      longitude: data.longitude,
      namePin: data.namePin,
    },
  });
  if (!updt) return { status: 400, message: "Gagal update data" };

  revalidatePath(RouterPortofolio.main_detail);
  return { status: 200, message: "Berhasil update" };
}
