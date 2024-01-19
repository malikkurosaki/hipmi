"use server";

import prisma from "@/app/lib/prisma";
import { MODEL_PROFILE } from "../model/interface";
import _ from "lodash";
import { v4 } from "uuid";
import fs from "fs";

export default async function funCreateNewProfile(
  req: MODEL_PROFILE,
  gambarPP: FormData,
  gambarBG: FormData
) {
  const body = req;

  const findEmail = await prisma.profile.findUnique({
    where: {
      email: body.email,
    },
  });

  if (findEmail) return { status: 400, message: "Email telah digunakan" };

  const gambarProfile: any = gambarPP.get("filePP");
  const fileName = gambarProfile.name;
  const fileExtension = _.lowerCase(gambarProfile.name.split(".").pop());
  const fRandomName = v4(fileName) + "." + fileExtension;

  const uploadPP = await prisma.images.create({
    data: {
      url: fRandomName,
      label: "PROFILE_FOTO",
    },
    select: {
      id: true,
      url: true,
    },
  });

  if (!uploadPP) return { status: 400, message: "Gagal upload foto profile" };
  const uploadPP_Folder = Buffer.from(await gambarProfile.arrayBuffer());
  fs.writeFileSync(`./public/profile/foto/${uploadPP.url}`, uploadPP_Folder);

  const gambarBackground: any = gambarBG.get("fileBG");
  const fileNameBG = gambarBackground.name;
  const fileExtensionBG = _.lowerCase(gambarBackground.name.split(".").pop());
  const fRandomNameBG = v4(fileNameBG) + "." + fileExtensionBG;

  const uploadBG = await prisma.imagesBackground.create({
    data: {
      url: fRandomNameBG,
      label: "PROFILE_BACKGROUND",
    },
    select: {
      id: true,
      url: true,
    },
  });

  if (!uploadBG)
    return { status: 400, message: "Gagal upload background profile" };
  const uploadBG_Folder = Buffer.from(await gambarBackground.arrayBuffer());
  fs.writeFileSync(
    `./public/profile/background/${uploadBG.url}`,
    uploadBG_Folder
  );

  

  const createProfile = await prisma.profile.create({
    data: {
      userId: body.userId,
      name: body.name,
      email: body.email,
      alamat: body.alamat,
      jenisKelamin: body.jenisKelamin,
      imagesId: uploadPP.id,
      imagesBackgroundId: uploadBG.id,
    },
  });

  if (!createProfile) return { status: 400, message: "Gagal membuat profile" };

  return {
    status: 201,
    message: "Berhasil",
  };
}
