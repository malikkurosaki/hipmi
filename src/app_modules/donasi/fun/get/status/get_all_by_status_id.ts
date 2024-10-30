"use server";

import { prisma } from "@/app/lib";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";

export async function donasi_funGetAllStatusById({
  page,
  statusId,
}: {
  page: number;
  statusId: string;
}) {
  const userLoginId = await funGetUserIdByToken();

  const takeData = 5;
  const skipData = page * takeData - takeData;

  if (statusId === "1") {
    const data = await prisma.donasi.findMany({
      take: takeData,
      skip: skipData,
      orderBy: {
        publishTime: "desc",
      },
      where: {
        authorId: userLoginId,
        donasiMaster_StatusDonasiId: "1",
        active: true,
      },
      select: {
        id: true,
        title: true,
        imagesId: true,
        target: true,
        progres: true,
        publishTime: true,
        DonasiMaster_Durasi: true,
        terkumpul: true,
        imageId: true,
      },
    });
    return data;
    
  } else {
    const data = await prisma.donasi.findMany({
      take: takeData,
      skip: skipData,
      orderBy: {
        updatedAt: "desc",
      },
      where: {
        authorId: userLoginId,
        donasiMaster_StatusDonasiId: statusId,
      },
    });

    return data;
  }
}
