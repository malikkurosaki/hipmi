"use server";

import prisma from "@/app/lib/prisma";
import _ from "lodash";
import { v4 } from "uuid";
import fs from "fs";
import { revalidatePath } from "next/cache";
import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import { MODEL_Investasi } from "../model/model_investasi";
import funUploadProspektusInvestasi from "./fun_upload_prospek";

export async function funCreateInvestasi(
  fileGambar: FormData,
  filePdf: FormData,
  data: MODEL_Investasi
) {
  // Function upload gambar
  const gambar: any = fileGambar.get("file");
  const gambarName = gambar.name;
  const gambarExtention = _.lowerCase(gambar.name.split(".").pop());
  const gambarRandomName = v4(gambarName) + "." + gambarExtention;

  const uploadImage = await prisma.images.create({
    data: {
      url: gambarRandomName,
      label: "INVESTASI",
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

  const upFolder = Buffer.from(await gambar.arrayBuffer());
  fs.writeFileSync(`./public/investasi/${uploadImage.url}`, upFolder);

  const createInvest = await prisma.investasi.create({
    data: {
      authorId: data.authorId,
      title: _.startCase(data.title),
      targetDana: data.targetDana.toString(),
      hargaLembar: data.hargaLembar.toString(),
      totalLembar: data.totalLembar.toString(),
      sisaLembar: data.totalLembar.toString(),
      roi: data.roi.toString(),
      masterPembagianDevidenId: data.masterPembagianDevidenId,
      masterPeriodeDevidenId: data.masterPeriodeDevidenId,
      masterPencarianInvestorId: data.masterPencarianInvestorId,
      imagesId: uploadImage.id,
      masterStatusInvestasiId: "2",
    },
    select: {
      id: true,
      title: true,
      authorId: true,
      MasterStatusInvestasi: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!createInvest)
    return {
      status: 400,
      message: "Gagal Disimpan",
    };

  // await funUploadProspektusInvestasi(filePdf, createInvest.id);

  const file: any = filePdf.get("file");
  const fName = file.name;
  const fExt = _.lowerCase(file.name.split(".").pop());
  const fRandomName = v4(fName) + "." + fExt;

  const createFile = await prisma.prospektusInvestasi.create({
    data: {
      investasiId: createInvest.id,
      url: fRandomName,
    },
  });

  if (!createFile) return { status: 400, message: "Gagal Upload" };
  const uploadFile = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(`./public/file/${createFile.url}`, uploadFile);

  revalidatePath(RouterInvestasi.main_porto);
  return {
    data: createInvest,
    status: 201,
    message: "Berhasil Disimpan",
  };
}
