"use server";

import prisma from "@/app/lib/prisma";
import _ from "lodash";
import { v4 } from "uuid";
import fs from "fs";
import { revalidatePath } from "next/cache";
import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import { MODEL_Investasi } from "../model/model_investasi";

export async function funCreateInvestasi(
  formData: FormData,
  data: MODEL_Investasi | any
) {
  console.log(data)
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

  if (!upload)
    return {
      status: 400,
      message: "File Kosong",
    };

  const upFolder = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(`./public/investasi/${upload.url}`, upFolder);

  const createInvest = await prisma.investasi.create({
    data: {
      authorId: data.authorId,
      title: data.title,
      targetDana: data.targetDana.toString(),
      hargaLembar: data.hargaLembar.toString(),
      totalLembar: data.totalLembar.toString(),
      roi: data.roi.toString(),
      masterPembagianDevidenId: data.masterPeriodeDevidenId,
      masterPeriodeDevidenId: data.masterPembagianDevidenId,
      masterPencarianInvestorId: data.masterPencarianInvestorId,
      imagesId: upload.id,
      masterStatusInvestasiId: "1",
    },
  });

  if (!createInvest)
    return {
      status: 400,
      message: "Gagal Disimpan",
    };

  revalidatePath(RouterInvestasi.main_porto);

  return {
    status: 201,
    message: "Berhasil Disimpan",
  };
}
