"use server";

import prisma from "@/app/lib/prisma";
import { RouterAdminInvestasi } from "@/app/lib/router_admin/router_admin_investasi";
import { revalidatePath } from "next/cache";

export default async function Admin_funRejectInvestasi(data: any) {
  // console.log(data)

  const res = await prisma.investasi.update({
    where: { id: data.id },
    data: {
      masterStatusInvestasiId: data.status,
      catatan: data.catatan,
    },
    select: {
      id: true,
      title: true,
      authorId: true,
      MasterStatusInvestasi: {
        select: {
          name: true,
        },
      },
    },
  });
  if (!res) return { status: 400, message: "Gagal reject" };

  revalidatePath(RouterAdminInvestasi.detail_review);

  return {
    data: res,
    status: 200,
    message: "Reject berhasil",
  };
}
