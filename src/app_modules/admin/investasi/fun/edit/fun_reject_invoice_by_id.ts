"use server";

import prisma from "@/app/lib/prisma";
import { RouterAdminInvestasi } from "@/app/lib/router_admin/router_admin_investasi";
import { revalidatePath } from "next/cache";

export async function adminInvestasi_funRejectInvoiceById({
  invoiceId,
}: {
  invoiceId: string;
}) {
  


  const updt = await prisma.investasi_Invoice.update({
    where: {
      id: invoiceId,
    },
    data: {
      statusInvoiceId: "4",
    },
  });

  if (!updt) return { status: 400, message: "Gagal Update" };
  revalidatePath(RouterAdminInvestasi.detail_publish);
  return {
    status: 200,
    message: "Update Berhasil",
  };
}
