"use server";

import prisma from "@/app/lib/prisma";
import fs from "fs";

export async function Donasi_funDeleteDonasiById(donasiId: string) {
  const findDonasi = await prisma.donasi.findFirst({
    where: {
      id: donasiId,
    },
    select: {
      imagesId: true,
      CeritaDonasi: {
        select: {
          id: true,
          imagesId: true,
        },
      },
    },
  });
  if (!findDonasi) return { status: 400, message: "Data tidak ditemukan" };

  //   const findGambar = await prisma.images.findFirst({
  //     where: {
  //       id: findDonasi.imagesId as any,
  //     },
  //     select: {
  //       url: true,
  //     },
  //   });

  //   const findGambarCerita = await prisma.images.findFirst({
  //     where: {
  //       id: findDonasi.CeritaDonasi?.imagesId as any,
  //     },
  //     select: {
  //       url: true,
  //     },
  //   });

  if (findDonasi.imagesId !== null) {
    const delGambar = await prisma.images.delete({
      where: {
        id: findDonasi.imagesId as any,
      },
      select: {
        url: true,
      },
    });

    const delFromFileGambar = fs.unlinkSync(
      `./public/donasi/image/${delGambar?.url}`
    );

    if (delFromFileGambar as any)
      return { status: 400, message: "Gagal hapus gambar" };
  }

  if (findDonasi.CeritaDonasi?.imagesId !== null) {
    const delGambarCerita = await prisma.images.delete({
      where: {
        id: findDonasi.CeritaDonasi?.imagesId as any,
      },
      select: {
        url: true,
      },
    });

    const delFromFileGambarCerita = fs.unlinkSync(
      `./public/donasi/image_cerita/${delGambarCerita?.url}`
    );

    if (delFromFileGambarCerita as any)
      return { status: 400, message: "Gagal hapus gambar cerita" };
  }

  const delCerita = await prisma.donasi_Cerita.delete({
    where: {
      id: findDonasi.CeritaDonasi?.id,
    },
  });

  if(!delCerita) return {status: 400, message: "Gagal hapus data cerita"}

  const delDonasi = await prisma.donasi.delete({
    where: {
      id: donasiId,
    },
  });

  if (!delDonasi) return { status: 400, message: "Gagal hapus data donasi" };

  return {
    status: 200,
    message: "Berhasil hapus",
  };
}
