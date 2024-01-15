"use server";

import fs from "fs";
import prisma from "@/app/lib/prisma";
import { MODEL_DONASI } from "../../model/interface";
import { Donasi_funDeleteTemporaryCreate } from "../delete/fun_delete_temporary_create";
import { v4 } from "uuid";
import _ from "lodash";
import { revalidatePath } from "next/cache";

export async function Donasi_funCreate(req: MODEL_DONASI, file: FormData) {
  const body = req;

  const dataDonasi = await prisma.donasi.create({
    data: {
      target: body.target,
      title: body.title,
      donasiMaster_DurasiId: body.donasiMaster_DurasiId,
      donasiMaster_KategoriId: body.donasiMaster_KategoriId,
      imagesId: body.imagesId,
      authorId: body.authorId,
      namaBank: body.namaBank,
      rekening: body.rekening
    },
  });

  if (!dataDonasi) return { status: 400, message: "Gagal disimpan" };
  await Donasi_funDeleteTemporaryCreate(body.id).then((res) => {
    if (res.status === 200) {
      console.log(res.message);
    } else {
      console.log(res.message);
    }
  });

  const dataImage: any = file.get("file");
  const fileName = dataImage.name;
  const fileExtension = _.lowerCase(dataImage.name.split(".").pop());
  const fRandomName = v4(fileName) + "." + fileExtension;

  const uploadImageCerita = await prisma.images.create({
    data: {
      url: fRandomName,
    },
    select: {
      id: true,
      url: true,
    },
  });

  if (!uploadImageCerita)
    return { status: 400, message: "Gagal upload gambar" };
  const uploadFolder = Buffer.from(await dataImage.arrayBuffer());
  fs.writeFileSync(
    `./public/donasi/image_cerita/${uploadImageCerita.url}`,
    uploadFolder
  );

  const dataCerita = await prisma.donasi_Cerita.create({
    data: {
      donasiId: dataDonasi.id,
      pembukaan: body.CeritaDonasi.pembukaan,
      cerita: body.CeritaDonasi.cerita,
      imagesId: uploadImageCerita.id,
    },
  });

  if (!dataCerita) return { status: 400, message: "Gagal simpan data cerita" };
  revalidatePath("/dev/donasi/main/galang_dana");
  return {
    status: 201,
    message: "Data donasi tersimpan",
  };
}
