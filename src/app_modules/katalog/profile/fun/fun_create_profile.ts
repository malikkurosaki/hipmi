"use server";

import prisma from "@/app/lib/prisma";
import { MODEL_PROFILE } from "../model/interface";
import _ from "lodash";
import { v4 } from "uuid";
import fs from "fs";
import { revalidatePath } from "next/cache";
import { RouterHome } from "@/app/lib/router_hipmi/router_home";
import { Prisma } from "@prisma/client";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";

export default async function funCreateNewProfile({
  data,
  imageId,
  imageBackgroundId,
}: {
  data: Prisma.ProfileCreateInput;
  imageId: string;
  imageBackgroundId: string;
}) {
  const userLoginId = await funGetUserIdByToken();

  const findEmail = await prisma.profile.findUnique({
    where: {
      email: data.email,
    },
  });

  if (findEmail) return { status: 400, message: "Email telah digunakan" };

  const createProfile = await prisma.profile.create({
    data: {
      userId: userLoginId,
      name: data.name,
      email: data.email,
      alamat: data.alamat,
      jenisKelamin: data.jenisKelamin,
      imageId: imageId,
      imageBackgroundId: imageBackgroundId,
    },
  });

  if (!createProfile) return { status: 400, message: "Gagal membuat profile" };
  revalidatePath(RouterHome.main_home);

  return {
    status: 201,
    message: "Berhasil",
  };
}
