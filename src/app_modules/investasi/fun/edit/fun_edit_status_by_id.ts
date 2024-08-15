"use server";

import prisma from "@/app/lib/prisma";
import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import { revalidatePath } from "next/cache";

export async function investasi_funEditStatusById({
  investasiId,
  statusId,
}: {
  investasiId: string;
  statusId: string;
}) {
  const res = await prisma.investasi.update({
    where: {
      id: investasiId,
    },
    data: {
      masterStatusInvestasiId: statusId,
    },
    select: {
        id: true,
        title: true,
        authorId: true,
        MasterStatusInvestasi: {
            select: {
                name: true
            }
        }   
    }
  });

  if (!res) return { status: 400, message: "Gagal Update" };
  revalidatePath(RouterInvestasi.main_porto);
  return {
    data: res,
    status: 200,
    message: "Update Berhasil",
  };
}
