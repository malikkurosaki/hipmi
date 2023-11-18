"use server";

import prisma from "@/app/lib/prisma";
import { MODEL_Transaksi_Investasi } from "../model/model_investasi";

export default async function funCreateTransaksiInvestasi(
  data: MODEL_Transaksi_Investasi,
  invesId: string,
  authorId: string
) {
  const res = await prisma.transaksiInvestasi.create({
    data: {
      namaBank: data.namaBank,
      nomorRekening: data.nomorRekening,
      lembarTerbeli: "" + data.lembarTerbeli,
      totalTransfer: "" + data.totalTransfer,
      investasiId: invesId,
      authorId: authorId,
    },
  });
  if (!res) return { status: 400, message: "Gagal disimpan" };

  return {
    status: 201,
    message: "Berhasil disimpan",
    res
  };
}
