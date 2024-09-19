"use server";

import prisma from "@/app/lib/prisma";
import { RouterMap } from "@/app/lib/router_hipmi/router_map";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import fs from "fs";
import _ from "lodash";
import { revalidatePath } from "next/cache";
import { v4 } from "uuid";

export async function map_funCreatePin({ data }: { data: any }) {
  const userLoginId = await funGetUserIdByToken();

  const gambar: any = data.gambar.get("file");
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

  if (!uploadImage) return { status: 400, message: "Gagal upload foto lokasi" };
  const upload_Folder = Buffer.from(await gambar.arrayBuffer());
  fs.writeFileSync(`./public/map/foto/${uploadImage.url}`, upload_Folder);

  const create = await prisma.businessMaps.create({
    data: {
      latitude: data.lat,
      longitude: data.long,
      namePin: data.namePin,
      portofolioId: data?.portofolioId,
      authorId: userLoginId,
      imageMapId: uploadImage.id,
    },
  });

  if (!create) return { status: 400, message: "Gagal menambahkan" };

  revalidatePath(RouterMap.main_view);
  return { status: 200, message: "Berhasil menambahkan" };
}
