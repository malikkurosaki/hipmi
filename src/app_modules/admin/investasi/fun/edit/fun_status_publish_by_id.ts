"use server";

import prisma from "@/app/lib/prisma";
import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import { revalidatePath } from "next/cache";

export async function adminInvestasi_funEditStatusPublishById({
  investasiId,
  statusId,
  progesInvestasiId,
}: {
  investasiId: string;
  statusId: string;
  progesInvestasiId: string;
}) {
  const publishTime = new Date();
  const res = await prisma.investasi.update({
    where: {
      id: investasiId,
    },
    data: {
      countDown: publishTime,
      masterStatusInvestasiId: statusId,
      masterProgresInvestasiId: progesInvestasiId,
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
    }
  });

  if (!res) return { status: 400, message: "Gagal Update" };
  revalidatePath(RouterInvestasi.portofolio);

  return {
    data: res,
    status: 200,
    message: "Publish Berhasil",
  };
}
