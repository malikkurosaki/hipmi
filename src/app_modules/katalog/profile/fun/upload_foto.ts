"use server";

import prisma from "@/app/lib/prisma";
import fs from "fs";
import { cookies } from "next/headers";
import { v4 } from "uuid";

export async function funUploadFoto(formData: FormData) {
  const file: any = formData.get("file");
  const fName = file.name;

  // console.log(file)

  const upload = await prisma.images.create({
    data: {
      url: fName,
    },
    select: {
      id: true,
      url: true,
    },
  });

  const upFolder = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(`./public/img/${fName}`, upFolder);

  return {
    success: true,
    message: "success",
    data: upload,
  };
}
