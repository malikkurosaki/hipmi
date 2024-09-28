"use server";

import prisma from "@/app/lib/prisma";
import { ceil } from "lodash";

export default async function adminJob_getListReview({
  page,
  search,
}: {
  page: number;
  search?: string;
}) {
  let takeData = 5;
  let skipData = page * takeData - takeData;

  const getData = await prisma.job.findMany({
    skip: skipData,
    take: takeData,
    orderBy: {
      updatedAt: "desc",
    },
    where: {
      masterStatusId: "2",
      isActive: true,
      title: {
        contains: search,
        mode: "insensitive",
      },
    },
    select: {
      id: true,
      title: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
      content: true,
      deskripsi: true,
      catatan: true,
      authorId: true,
      Author: true,
      imagesId: true,
    },
  });

  const nCount = await prisma.job.count({
    where: {
      masterStatusId: "2",
      isActive: true,
      title: {
        contains: search,
        mode: "insensitive",
      },
    },
  });

  const allData = {
    data: getData,
    nPage: ceil(nCount / takeData),
  };

  return allData;
}
