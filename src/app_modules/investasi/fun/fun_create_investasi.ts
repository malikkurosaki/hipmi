"use server";

import prisma from "@/app/lib/prisma";
import _ from "lodash";
import { v4 } from "uuid";
import fs from "fs";
import { revalidatePath } from "next/cache";
import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import { MODEL_Investasi } from "../model/model_investasi";

export async function funCreateInvestasi(
  gamabar: FormData,
  filePdf: FormData,
  data: MODEL_Investasi 
) {
  // Function upload gambar
  const file: any = gamabar.get("file");
  const fName = file.name;
  const fExt = _.lowerCase(file.name.split(".").pop());
  const fRandomName = v4(fName) + "." + fExt;

  const uploadImage = await prisma.images.create({
    data: {
      url: fRandomName,
    },
    select: {
      id: true,
      url: true,
    },
  });

  if (!uploadImage)
    return {
      status: 400,
      message: "Gambar Kosong",
    };

  const upFolder = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(`./public/investasi/${uploadImage.url}`, upFolder);

  const createInvest = await prisma.investasi.create({
    data: {
      authorId: data.authorId,
      title: data.title,
      targetDana: data.targetDana.toString(),
      hargaLembar: data.hargaLembar.toString(),
      totalLembar: data.totalLembar.toString(),
      sisaLembar: data.totalLembar.toString(),
      roi: data.roi.toString(),
      masterPembagianDevidenId: data.masterPeriodeDevidenId,
      masterPeriodeDevidenId: data.masterPembagianDevidenId,
      masterPencarianInvestorId: data.masterPencarianInvestorId,
      imagesId: uploadImage.id,
      masterStatusInvestasiId: "2",
    },
  });

  if (!createInvest)
    return {
      status: 400,
      message: "Gagal Disimpan",
    };

  // File upload function
  const dataPdf: any = filePdf.get("file");
  const pdfName = dataPdf.name;
  const pdfExt = _.lowerCase(dataPdf.name.split(".").pop());
  const pdfRandomName = v4(pdfName) + "." + pdfExt;

  const uploadFile = await prisma.prospektusInvestasi.create({
    data: {
      investasiId: createInvest.id,
      url: pdfRandomName,
    },
    select: {
      id: true,
      url: true,
    },
  });


  if (!uploadFile) return { status: 400, message: "File Kosong" };
  const upPdfFolder = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(`./public/file/${uploadFile.url}`, upPdfFolder);

  revalidatePath(RouterInvestasi.main_porto);

  return {
    status: 201,
    message: "Berhasil Disimpan",
  };
}
