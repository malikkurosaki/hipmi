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
        id: invoiceId
    },
    data: {
        donasiMaster_StatusInvoiceId: statusId
    }
})

if(!data) return {status: 400, message: "Gagal memperbarui status transaksi"}
revalidatePath("dev/admin/donasi/detail/publish")
return {
    status: 200,
    message: "Berhasil memperbarui status transaksi",
}
}
