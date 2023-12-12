"use server";

import prisma from "@/app/lib/prisma";
import { MODEL_Investasi } from "../model/model_investasi";

export default async function funUpdateInvestasi(data: MODEL_Investasi) {
    // console.log(data)
  const res = await prisma.investasi.update({
    where: {
      id: data.id,
    },
    data: {
      sisaLembar: "" + data.sisaLembar,
      
    },
  });

  if (!res) return { status: 400, message: "Gagal update" };
  return {
    status: 200,
    message: "Update berhasil",
  };
}
