"use server";

import prisma from "@/app/lib/prisma";
import _ from "lodash";
import { v4 } from "uuid";
import fs from "fs";

export async function Donasi_funUploadBuktiTransferById(
  invoiceId: string,
  file: FormData
) {
  // console.log(file);
  const gambar: any = file.get("file");
  const fileName = gambar.name;
  const fileExtension = _.lowerCase(gambar.name.split(".").pop());
  const fileRandomName = v4(fileName) + "." + fileExtension;

  const upload = await prisma.images.create({
    data: {
      url: fileRandomName,
      label: "DONASI_INVOICE"
    },
    select: {
      id: true,
      url: true,
    },
  });

  if (!upload) return { status: 400, message: "Gagal upload gambar" };
  const uploadFolder = Buffer.from(await gambar.arrayBuffer());
  fs.writeFileSync(`./public/donasi/invoice/${upload.url}`, uploadFolder);

  const updateFile = await prisma.donasi_Invoice.update({
    where: {
      id: invoiceId,
    },
    data: {
      imagesId: upload.id,
    },
  });

  if (!updateFile) return { status: 400, message: "Gagal update gambar" };
  return {
    status: 200,
    message: "Berhasil upload",
  };
}
