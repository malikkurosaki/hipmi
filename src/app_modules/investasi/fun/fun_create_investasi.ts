"use server";

import prisma from "@/app/lib/prisma";
import _ from "lodash";
import { v4 } from "uuid";
import fs from "fs";
import { INVESTASI } from "@/app_modules/models/investasi";
import { revalidatePath } from "next/cache";

export async function funCreateInvestasi(formData: FormData, data: INVESTASI) {
  const file: any = formData.get("file");
  // console.log(file)
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

  if (!upload)
    return {
      status: 400,
      message: "File Kosong",
    };

  //   if (upload) {
  //     await prisma.investasi.update({
  //       where: {
  //         authorId: data.authorId,
  //       },
  //       data: {
  //         imagesId: upload.id,
  //       },
  //     });
  //   }

  const upFolder = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(`./public/investasi/${upload.url}`, upFolder);

  const createInvest = await prisma.investasi.create({
    data: {
      authorId: data.authorId,
      title: data.title,
      targetDana: data.targetDana,
      hargaLembar: data.hargaLembar,
      totalLembar: data.totalLembar,
      roi: data.roi,
      masterPembagianDevidenId: data.masterPembagianDevidenId,
      masterPeriodeDevidenId: data.masterPeriodeDevidenId,
      masterPencarianInvestorId: data.masterPencarianInvestorId,
      imagesId: upload.id,
    },
  });

  if (!createInvest)
    return {
      status: 400,
      message: "Gagal Disimpan",
    };

  revalidatePath("/dev/investasi/main");

  return {
    status: 201,
    message: "Berhasil Disimpan",
  };
}
