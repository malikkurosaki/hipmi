"use server";

import prisma from "@/app/lib/prisma";
import _ from "lodash";
import { v4 } from "uuid";
import fs from "fs";
import { revalidatePath } from "next/cache";

export async function Portofolio_funEditLogoBisnisById(
  portoId: string,
  file: FormData
) {
  const gambar: any = file.get("file");
  const fileName = gambar.name;
  const fileExtension = _.lowerCase(gambar.name.split(".").pop());
  const randomNameFile = v4(fileName) + "." + fileExtension;

  const upload = await prisma.images.create({
    data: {
      url: randomNameFile,
      label: "PORTOFOLIO_LOGO",
    },
    select: {
      id: true,
      url: true,
    },
  });

  if (!upload) return { status: 400, message: "Gagal upload gambar" };
  const upload_toFolder = Buffer.from(await gambar.arrayBuffer());
  fs.writeFileSync(`./public/portofolio/logo/${upload.url}`, upload_toFolder);

  const updatePorto = await prisma.portofolio.update({
    where: {
      id: portoId,
    },
    data: {
      logoId: upload.id,
    },
  });

  if (!updatePorto) return { status: 200, message: "Update gagal" };
  revalidatePath("/dev/portofolio/edit/logo");
  revalidatePath("/dev/portofolio/main");
  return {
    status: 200,
    message: "Berhasil mengubah Logo Bisnis!",
  };
}
