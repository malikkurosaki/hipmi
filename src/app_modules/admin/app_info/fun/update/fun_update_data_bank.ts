"use server";

import prisma from "@/app/lib/prisma";
import { MODEL_DATA_BANK } from "@/app_modules/investasi/model/model_investasi";

export default async function adminAppInformation_updateDataBankById({
  data,
}: {
  data: MODEL_DATA_BANK;
}) {
  const updt = await prisma.masterBank.update({
    where: {
      id: data.id,
    },
    data: {
      name: data.name,
      norek: data.norek,
    },
  });

  if (!updt) return { status: 400, message: "Gagal update" };
  return { status: 200, message: "Berhasil update" };
}
