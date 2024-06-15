"use server";

import prisma from "@/app/lib/prisma";
import { MODEL_Investasi } from "../model/model_investasi";
import { revalidatePath } from "next/cache";
import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";

export default async function funUpdateInvestasi(
  dataLembarSaham: MODEL_Investasi,
  dataInvestasi: MODEL_Investasi
) {
  

  const investasi = dataInvestasi;
  // console.log(investasi)
  const progres =
    ((+investasi.totalLembar - +dataLembarSaham.sisaLembar) /
      +investasi.totalLembar) *
    100;
  const jumlahTerbeli = +investasi.totalLembar - +dataLembarSaham.sisaLembar;

  const res = await prisma.investasi.update({
    where: {
      id: dataLembarSaham.id,
    },
    data: {
      sisaLembar: "" + dataLembarSaham.sisaLembar,
      progress: "" + progres,
      lembarTerbeli: "" + jumlahTerbeli,
    },
  });

  if (!res) return { status: 400, message: "Gagal update" };

  if (res.progress === "100") {
    const updateStatusProgres = await prisma.investasi.update({
      where: {
        id: res.id,
      },
      data: {
        masterProgresInvestasiId: "2",
      },
    });

    // console.log(updateStatusProgres)

    try {
      await fetch(
        `https://wa.wibudev.com/code?nom=${investasi.author.nomor}&text=Selamat !! , Project Investasi  ${investasi.title} Anda Sukses`
      );
      return {
        status: 200,
        message: "Berhasil, kirim pesan ke Author"
      }
    } catch (error) {
      return {
        status: 400,
        message: "Tidak Terkirim ke Author"
      }
    }
    
  }

  revalidatePath(RouterInvestasi.main);

  return {
    status: 200,
    message: "Update berhasil",
  };
}
