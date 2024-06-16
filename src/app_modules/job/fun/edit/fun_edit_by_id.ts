"use server";

import prisma from "@/app/lib/prisma";
import _ from "lodash";
import { v4 } from "uuid";
import fs from "fs";
import { MODEL_JOB } from "../../model/interface";
import { revalidatePath } from "next/cache";

export async function Job_EditById(req: MODEL_JOB, file: FormData) {
  //   console.log(file);
  //   console.log(req);
  //   return { status: 200 };

  const dataImage: any = file.get("file");
  if (dataImage !== "null") {
    const fileName = dataImage.name;
    const fileExtension = _.lowerCase(dataImage.name.split(".").pop());
    const fRandomName = v4(fileName) + "." + fileExtension;

    const upload = await prisma.images.create({
      data: {
        url: fRandomName,
        label: "JOB",
      },
      select: {
        id: true,
        url: true,
      },
    });

    if (!upload) return { status: 400, message: "Gagal upload gambar" };
    const uploadFolder = Buffer.from(await dataImage.arrayBuffer());
    fs.writeFileSync(`./public/job/${upload.url}`, uploadFolder);

    const updt = await prisma.job.update({
      where: {
        id: req.id,
      },
      data: {
        title: req.title,
        content: req.content,
        deskripsi: req.deskripsi,
        imagesId: upload.id,
      },
    });

    if (!updt) return { status: 400, message: "Gagal Update" };
    revalidatePath("/dev/job/detail/draft");
    return {
      status: 200,
      message: "Berhasil Disimpan",
    };
  } else {
    const updt = await prisma.job.update({
      where: {
        id: req.id,
      },
      data: {
        title: req.title,
        content: req.content,
        deskripsi: req.deskripsi,
      },
    });

    if (!updt) return { status: 400, message: "Gagal Update" };
    revalidatePath("/dev/job/detail/draft");
    return {
      status: 200,
      message: "Berhasil Disimpan",
    };
  }
}
