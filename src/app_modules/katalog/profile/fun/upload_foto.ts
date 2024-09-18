"use server";

import prisma from "@/app/lib/prisma";
import fs from "fs";
import _ from "lodash";
import { v4 } from "uuid";

/**
 *
 * @param formData
 * @returns upload gambar ke /public/img
 */
export async function funUploadFoto(formData: FormData, id: string) {
  const file: any = formData.get("file");
  const fName = file.name;
  const fExt = _.lowerCase(file.name.split(".").pop());
  const fRandomName = v4(fName) + "." + fExt;

  const upload = await prisma.images.create({
    data: {
      url: fRandomName,
    },
    select: {
      id: true,
      url: true,
    },
  });

  if (upload) {
    await prisma.profile.update({
      where: {
        id: id,
      },
      data: {
        imagesId: upload.id,
      },
    });
  }

  const upFolder = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(`./public/img/${upload.url}`, upFolder);

  return {
    success: true,
    data: upload,
  };
}
