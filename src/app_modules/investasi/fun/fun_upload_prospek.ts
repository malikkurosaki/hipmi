"use server";

import prisma from "@/app/lib/prisma";
import _ from "lodash";
import { v4 } from "uuid";
import fs from "fs"
import { revalidatePath } from "next/cache";
import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";

export default async function funUploadProspektusInvestasi(
  formData: FormData,
  idInves: string
) {
  // console.log(formData)

  const file: any = formData.get("file");
  const fName = file.name;
  const fExt = _.lowerCase(file.name.split(".").pop());
  // console.log(fName)
  // console.log(fExt)
  const fRandomName = v4(fName) + "." + fExt;

  const uploadFile = await prisma.prospektusInvestasi.upsert({
    where: {
      investasiId: idInves,
    },
    update: {
      url: fRandomName,
    },
    create: {
      investasiId: idInves,
      url: fRandomName,
    },
  });

  if(!uploadFile) return {status: 400, message: "Gagal Upload"}
  const upFolder = Buffer.from(await file.arrayBuffer())
  fs.writeFileSync(`./public/file/${uploadFile.url}`, upFolder)

  revalidatePath(RouterInvestasi.edit_prospektus)
  return {
    status: 201,
    message: "File tersimpan "
  }
}
