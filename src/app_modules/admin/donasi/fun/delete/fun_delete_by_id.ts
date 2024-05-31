"use server";

import prisma from "@/app/lib/prisma";
import { RouterAdminDonasi } from "@/app/lib/router_admin/router_admin_donasi";
import { RouterAdminDonasi_OLD } from "@/app/lib/router_hipmi/router_admin";
import { revalidatePath } from "next/cache";

export default async function adminDonasi_funDeleteKategori({
  kategoriId,
}: {
  kategoriId: string;
}) {
  const del = await prisma.donasiMaster_Kategori.update({
    where: {
      id: kategoriId,
    },
    data: {
      active: false,
    },
  });

  if (!del) return { status: 400, message: "Gagal hapus kategori" };
  revalidatePath(RouterAdminDonasi.table_kategori);
  return { status: 200, message: "Kategori terhapus" };
}
