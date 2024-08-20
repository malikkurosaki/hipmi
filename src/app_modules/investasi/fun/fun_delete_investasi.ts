"use server";

import prisma from "@/app/lib/prisma";
import { RouterAdminInvestasi_OLD } from "@/app/lib/router_hipmi/router_admin";
import { RouterInvestasi_OLD } from "@/app/lib/router_hipmi/router_investasi";
import { revalidatePath } from "next/cache";

export default async function funDeleteInvestasi(id: string) {
  const res = await prisma.investasi.delete({
    where: {
      id: id,
    },
  });

  if (!res) return { status: 400, message: "Gagal Hapus Data" };

  revalidatePath(RouterInvestasi_OLD.portofolio);

  return {
    status: 200,
    message: "Berhasil Hapus",
  };
}
