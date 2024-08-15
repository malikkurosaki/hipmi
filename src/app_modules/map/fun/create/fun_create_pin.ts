"use server";

import prisma from "@/app/lib/prisma";
import { RouterMap } from "@/app/lib/router_hipmi/router_map";
import { user_getOneUserId } from "@/app_modules/fun_global/get_user_token";
import { revalidatePath } from "next/cache";

export async function map_funCreatePin({ data }: { data: any }) {
  const authorId = await user_getOneUserId();
  // console.log(data);

  const create = await prisma.businessMaps.create({
    data: {
      latitude: data.lat,
      longitude: data.long,
      namePin: data.namePin,
      authorId: authorId,
    },
  });

  if (!create) return { status: 400, message: "Gagal menambahkan" };

  revalidatePath(RouterMap.main_view)
  return { status: 200, message: "Berhasil menambahkan" };
}
