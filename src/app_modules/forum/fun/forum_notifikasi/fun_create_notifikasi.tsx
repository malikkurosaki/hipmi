"use server";

import prisma from "@/app/lib/prisma";
import { MODEL_NOTIFIKASI } from "@/app_modules/notifikasi/model/interface";

export default async function forum_funCreateNotifikasiToAdmin({
  data,
}: {
  data: MODEL_NOTIFIKASI;
}) {
  console.log(data);

  //   const getAdmin = await prisma.user.findMany({
  //     where: {
  //       active: true,
  //       masterUserRoleId: "2",
  //     },
  //   });

  return { status: 201 };
}
