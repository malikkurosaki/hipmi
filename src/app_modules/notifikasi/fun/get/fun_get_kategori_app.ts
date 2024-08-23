"use server";

import { funGlobal_getMasterKategoriApp } from "@/app_modules/_global/fun/get";

export async function notifikasi_funGetKategoriApp() {
  const data = await funGlobal_getMasterKategoriApp();
  data.unshift({
    id: "0",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    name: "Semua",
    value: null,
  });

  return data;
}
