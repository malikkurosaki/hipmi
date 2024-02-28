"use server";

import prisma from "@/app/lib/prisma";
import { User_getUserId } from "@/app_modules/fun_global/get_user_token";
import _ from "lodash";
import { v4 } from "uuid";
import fs from "fs";
import { revalidatePath } from "next/cache";
import { MODEL_JOB } from "../../model/interface";

export async function Job_funCreate(req: MODEL_JOB, file: FormData) {
  const authorId = await User_getUserId();

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
    const create = await prisma.job.create({
      data: {
        title: req.title,
        content: req.content,
        deskripsi: req.deskripsi,
        authorId: authorId,
        imagesId: upload.id,
      },
    });

    if (!create) return { status: 400, message: "Gagal Disimpan" };
    revalidatePath("/dev/job/main/status");
    return {
      status: 201,
      message: "Berhasil Disimpan",
    };
  } else {
    const create = await prisma.job.create({
      data: {
        title: req.title,
        content: req.content,
        deskripsi: req.deskripsi,
        authorId: authorId,
      },
    });

    if (!create) return { status: 400, message: "Gagal Disimpan" };
    revalidatePath("/dev/job/main/status");
    return {
      status: 201,
      message: "Berhasil Disimpan",
    };
  }
}
