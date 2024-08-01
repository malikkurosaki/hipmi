"use server";

import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export async function Donasi_funUpdateStatusInvoice(
  invoiceId: string,
  statusId: string
) {
  //   console.log(invoiceId, "invoice Id");
  //   console.log(status, "status");

  const data = await prisma.donasi_Invoice.update({
    where: {
      id: invoiceId,
    },
    data: {
      donasiMaster_StatusInvoiceId: statusId,
    },
    select: {
      id: true,
      DonasiMaster_StatusInvoice: {
        select: {
          name: true,
        },
      },
      Donasi: {
        select: {
          id: true,
          title: true,
          authorId: true,
        },
      },
    },
  });

  if (!data)
    return { status: 400, message: "Gagal memperbarui status transaksi" };
  revalidatePath("dev/admin/donasi/detail/publish");
  return {
    data: data,
    status: 200,
    message: "Berhasil memperbarui status transaksi",
  };
}
