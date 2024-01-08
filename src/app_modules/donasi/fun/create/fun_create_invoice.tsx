"use server";

import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export async function Donasi_funCreateInvoice(data: any) {
  const res = await prisma.donasi_Invoice.create({
    data: {
      donasiId: data.donasiId,
      nominal: data.nominal,
      donasiMaster_BankId: data.donasiMaster_BankId,
      authorId: data.authorId
    },
  });

  if (!res) return { status: 400, message: "Gagal membuat invoice" };
  revalidatePath("/dev/donasi/main/donasi_saya")
  return {
    status: 200,
    message: "Berhasil membuat invoice",
    invoiceId: res.id
  };
}
