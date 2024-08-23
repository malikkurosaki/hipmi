"use server";

import prisma from "@/app/lib/prisma";
import _ from "lodash";
import { v4 } from "uuid";
import fs from "fs";
import { revalidatePath } from "next/cache";
import { RouterPortofolio } from "@/app/lib/router_hipmi/router_katalog";

export async function map_funCustomPinMap({
  mapId,
  file,
}: {
  mapId: string;
  file: FormData;
}) {

  const newPin: any = file.get("file");
  const fileName = newPin.name;
  const fileExtension = _.lowerCase(newPin.name.split(".").pop());
  const fileRandomName = v4(fileName) + "." + fileExtension;

  const uploadPin = await prisma.images.create({
    data: {
      url: fileRandomName,
      label: "MAP_CUSTOM_PIN",
    },
    select: {
      id: true,
      url: true,
    },
  });

  if (!uploadPin) return { status: 400, message: "Gagal upload foto lokasi" };
  const upload_Folder = Buffer.from(await newPin.arrayBuffer());
  fs.writeFileSync(`./public/map/pin/${uploadPin.url}`, upload_Folder);

  const updt = await prisma.businessMaps.update({
    where: {
      id: mapId,
    },
    data: {
      imagePinId: uploadPin.id,
    },
  });

  if (!updt) return { status: 400, message: "Gagal update pin" };
  revalidatePath(RouterPortofolio.main_detail)
  return { status: 200, message: "Berhasil update pin" };
}
