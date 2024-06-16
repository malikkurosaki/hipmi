"use server";

import prisma from "@/app/lib/prisma";

export async function AdminJob_getListTableByStatusId(statusId: string) {
  if (statusId === "0") {
    const getData = await prisma.job.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      where: {
        masterStatusId: "1",
        isActive: true,
        isArsip: true,
      },
      select: {
        id: true,
        title: true,
        isActive: true,
        isArsip: true,
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

    return getData;
  }
  if (statusId === "1") {
    const getData = await prisma.job.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      where: {
        masterStatusId: "1",
        isActive: true,
        isArsip: false,
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

    return getData;
  }
  if (statusId === "2") {
    const getData = await prisma.job.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      where: {
        masterStatusId: "2",
        isActive: true,
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

    return getData;
  }

  if (statusId === "4") {
    const getData = await prisma.job.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      where: {
        masterStatusId: "4",
        isActive: true,
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

    return getData;
  }
}
