"use server";

import prisma from "@/app/lib/prisma";

export default async function adminAppInformation_createBank({
  data,
}: {
  data: any;
}) {
  const count = await prisma.masterBank.count({});
  const idBank = count + 1;

  const create = await prisma.masterBank.create({
    data: {
      id: idBank.toString(),
      namaBank: data.name,
      namaAkun: data.akun,
      norek: data.norek,
    },
  });

  if (!create) return { status: 400, message: "Gagal menambahkan" };
  return { status: 200, message: "Berhasil menambahkan" };
}
