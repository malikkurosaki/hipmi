"use server";

import fs from "fs";
import prisma from "@/app/lib/prisma";
import _ from "lodash";
import { v4 } from "uuid";
import { revalidatePath } from "next/cache";

export async function Profile_funUpdateFoto(profileId: string, file: FormData) {
  const gambarProfile: any = file.get("file");
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

  const updateProfile = await prisma.profile.update({
    where: {
      id: profileId,
    },
    data: {
      imagesId: uploadPP.id,
    },
  });

  if (!updateProfile) return { status: 400, message: "Gagal update foto" };
  revalidatePath("/dev/katalog");

  return {
    status: 200,
    message: "Update berhasil",
  };



  // const findProfile = await prisma.profile.findFirst({
  //   where: {
  //     id: profileId,
  //   },
  // });

  // const findFoto = await prisma.images.findFirst({
  //   where: {
  //     id: findProfile?.imagesId as string,
  //   },
  //   select: {
  //     url: true,
  //   },
  // });
  // if (!findFoto) return { status: 400, message: "Foto tidak ditemukan" };
  // if (findFoto) fs.unlinkSync(`./public/profile/foto/${findFoto.url}`);

  // const gambarProfile: any = file.get("file");
  // const fileName = gambarProfile.name;
  // const fileExtension = _.lowerCase(gambarProfile.name.split(".").pop());
  // const randomName = v4(fileName) + "." + fileExtension;

  // const uploadPP = await prisma.images.update({
  //   where: {
  //     id: findProfile?.imagesId as string,
  //   },
  //   data: {
  //     url: randomName,
  //     label: "PROFILE_FOTO",
  //   },
  //   select: {
  //     id: true,
  //     url: true,
  //   },
  // });

  // if (!uploadPP) return { status: 400, message: "Gagal upload foto profile" };
  // const uploadPP_Folder = Buffer.from(await gambarProfile.arrayBuffer());
  // fs.writeFileSync(`./public/profile/foto/${uploadPP.url}`, uploadPP_Folder);
  // revalidatePath("/dev/katalog");

  // return {
  //   status: 200,
  //   message: "Update berhasil",
  // };
}
