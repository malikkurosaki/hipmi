"use server";

import { myConsole } from "@/app/fun/my_console";
import prisma from "@/app/lib/prisma";
import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import { revalidatePath } from "next/cache";

export default async function funDeleteBeritaInvestasi(id: string) {
  const res = await prisma.beritaInvestasi.delete({
    where: {
      id: id,
    },
  });

  if (!res) return { status: 400, message: "Gagal hapus" };

  return {
    status: 200,
    message: "Berita terhapus",
  };
}
