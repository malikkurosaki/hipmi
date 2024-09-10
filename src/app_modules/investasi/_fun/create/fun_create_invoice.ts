"use server";

import prisma from "@/app/lib/prisma";
import { user_funGetOneUserId } from "@/app_modules/fun_global/get_user_token";

interface Model_Invoice_Masuk {
  total: number;
  jumlah: number;
  pilihBank: string;
  investasiId: string;
}
export async function investasi_funCreateInvoice({
  data,
}: {
  data: Model_Invoice_Masuk;
}) {
  const authorId = await user_funGetOneUserId();

  const create = await prisma.investasi_Invoice.create({
    data: {
      nominal: "" + data.total,
      lembarTerbeli: "" + data.jumlah ,
      masterBankId: data.pilihBank,
      authorId: authorId,
      investasiId: data.investasiId,
      statusInvoiceId: "3",
    },
  });

  if (!create) return { status: 400, message: "Gagal membuat invoice" };
  return { status: 201, data: create, message: "Berhasil membuat invoice" };
}
