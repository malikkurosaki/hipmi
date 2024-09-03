"use server";

import prisma from "@/app/lib/prisma";

export async function investasi_funGetInvoiceById({
  invoiceId,
}: {
  invoiceId: string;
}) {
  const data = await prisma.investasi_Invoice.findFirst({
    where: {
      id: invoiceId,
    },
    include: {
      MasterBank: true,
      StatusInvoice: true,
    },
  });

  return data;
}
