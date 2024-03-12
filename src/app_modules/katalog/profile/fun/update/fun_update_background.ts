"use server";

import fs from "fs";
import prisma from "@/app/lib/prisma";
import _ from "lodash";
import { v4 } from "uuid";
import { revalidatePath } from "next/cache";

export async function Profile_funUpdateBackground(
  profileId: string,
  file: FormData
) {
  const gambarBackground: any = file.get("file");
  const fileName = gambarBackground.name;
  const fileExtension = _.lowerCase(gambarBackground.name.split(".").pop());
  const fRandomName = v4(fileName) + "." + fileExtension;

  const uploadBG = await prisma.imagesBackground.create({
    data: {
      url: fRandomName,
      label: "PROFILE_BACKGROUND",
    },
    select: {
      id: true,
      url: true,
    },
  });

  if (!uploadBG)
    return { status: 400, message: "Gagal upload gambar background" };
  const uploadBG_Folder = Buffer.from(await gambarBackground.arrayBuffer());
  fs.writeFileSync(
    `./public/profile/background/${uploadBG.url}`,
    uploadBG_Folder
  );

  revalidatePath("/dev/katalog");

  const updateBackground = await prisma.profile.update({
    where: {
      id: profileId,
    },
    data: {
      imagesBackgroundId: uploadBG.id,
    },
  });

  if (!updateBackground)
    return { status: 400, message: "Gagal update gambar background" };
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

  // const findBackground = await prisma.imagesBackground.findFirst({
  //   where: {
  //     id: findProfile?.imagesBackgroundId as string,
  //   },
  //   select: {
  //     url: true,
  //   },
  // });
  // if (!findBackground) return { status: 400, message: "Foto tidak ditemukan" };
  // if (findBackground) fs.unlinkSync(`./public/profile/background/${findBackground.url}`);

  // const gambarBackground: any = file.get("file");
  // const fileName = gambarBackground.name;
  // const fileExtension = _.lowerCase(gambarBackground.name.split(".").pop());
  // const randomName = v4(fileName) + "." + fileExtension;

  // const uploadBG = await prisma.imagesBackground.update({
  //   where: {
  //     id: findProfile?.imagesBackgroundId as string,
  //   },
  //   data: {
  //     url: randomName,
  //     label: "PROFILE_BACKGROUND",
  //   },
  //   select: {
  //     id: true,
  //     url: true,
  //   },
  // });

  // if (!uploadBG) return { status: 400, message: "Gagal upload foto background" };
  // const uploadBG_Folder = Buffer.from(await gambarBackground.arrayBuffer());
  // fs.writeFileSync(`./public/profile/background/${uploadBG.url}`, uploadBG_Folder);
  // revalidatePath("/dev/katalog");

  // return {
  //   status: 200,
  //   message: "Update berhasil",
  // };
}
