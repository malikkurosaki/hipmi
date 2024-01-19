"use server";

import prisma from "@/app/lib/prisma";

export async function AdminDonasi_getByStatus(status: string) {
  if (status === "1") {
    const getPublish = await prisma.donasi.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        donasiMaster_StatusDonasiId: "1",
      },
      select: {
        id: true,
        title: true,
        target: true,
        // active: true,
        // createdAt: true,
        // updatedAt: true,
        // publishTime: true,
        authorId: true,
        // imagesId: true,
        terkumpul: true,
        // donasiMaster_KategoriId: true,
        // donasiMaster_DurasiId: true,
        // donasiMaster_StatusDonasiId: true,
        // Author: true,
        imageDonasi: true,
        // CeritaDonasi: true,
        DonasiMaster_Ketegori: true,
        DonasiMaster_Durasi: true,
        // DonasiMaster_Status: true,
      },
    });
    return getPublish;
  }

  if (status === "2") {
    const getReview = await prisma.donasi.findMany({
      where: {
        donasiMaster_StatusDonasiId: "2",
      },
      select: {
        id: true,
        title: true,
        target: true,
        active: true,
        createdAt: true,
        updatedAt: true,
        publishTime: true,
        authorId: true,
        imagesId: true,
        donasiMaster_KategoriId: true,
        donasiMaster_DurasiId: true,
        donasiMaster_StatusDonasiId: true,
        Author: true,
        imageDonasi: true,
        CeritaDonasi: true,
        DonasiMaster_Ketegori: true,
        DonasiMaster_Durasi: true,
        DonasiMaster_Status: true,
      },
    });
    return getReview;
  }

  if (status === "3") {
    const getReview = await prisma.donasi.findMany({
      where: {
        donasiMaster_StatusDonasiId: "3",
      },
    });
    return getReview;
  }

  if (status === "4") {
    const getReview = await prisma.donasi.findMany({
      where: {
        donasiMaster_StatusDonasiId: "4",
      },
      select: {
        id: true,
        title: true,
        target: true,
        active: true,
        createdAt: true,
        updatedAt: true,
        publishTime: true,
        catatan: true,
        authorId: true,
        imagesId: true,
        donasiMaster_KategoriId: true,
        donasiMaster_DurasiId: true,
        donasiMaster_StatusDonasiId: true,
        Author: true,
        imageDonasi: true,
        CeritaDonasi: true,
        DonasiMaster_Ketegori: true,
        DonasiMaster_Durasi: true,
        DonasiMaster_Status: true,
      },
    });
    return getReview;
  }

  if (status === undefined) {
    return {
      status: 400,
      message: "Not Found",
    };
  }
}
