"use server";

import fs from "fs";
import prisma from "@/app/lib/prisma";
import { MODEL_DONASI, MODEL_DONASI_TEMPORARY } from "../../model/interface";
import _ from "lodash";
import { v4 } from "uuid";

interface Model_Temporary {
  kategoriId: "";
  title: "";
  target: "";
  durasiId: "";
}

export default async function Donasi_funCreateTemporary(
  data: MODEL_DONASI,
  file: FormData
) {
  // console.log(data, "ini data")
  // console.log(file, "ini file nya")

  const dataImage: any = file.get("file");
  const fileName = dataImage.name;
  const fileExtension = _.lowerCase(dataImage.name.split(".").pop());
  const fRandomName = v4(fileName) + "." + fileExtension;

  const uploadTemporary = await prisma.images.create({
    data: {
      url: fRandomName,
    },
    select: {
      id: true,
      url: true,
    },
  });

  if (!uploadTemporary) return { status: 400, message: "Gagal upload gambar" };
  const uploadFolder = Buffer.from(await dataImage.arrayBuffer());
  fs.writeFileSync(
    `./public/donasi/image/${uploadTemporary.url}`,
    uploadFolder
  );

  const res = await prisma.donasi_TemporaryCreate.create({
    data: {
      title: data.title,
      target: data.target,
      donasiMaster_KategoriId: data.donasiMaster_KategoriId,
      donasiMaster_DurasiId: data.donasiMaster_DurasiId,
      imagesId: uploadTemporary.id,
    },
  });

  if (!res) return { status: 400, message: "Gagal membuat donasi" };

  return {
    status: 201,
    message: "Berhasil membuat donasi",
    donasiId: res.id,
  };
}
