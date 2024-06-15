"use server";
import { MODEL_Investasi } from "../model/model_investasi";
import moment from "moment";
import prisma from "@/app/lib/prisma";

export default async function funUpadteProgresPersenInvestasi(data: MODEL_Investasi) {
    // console.log(data)
  if (data.MasterProgresInvestasi.id !== "2" && data.progress === "100") {
    const res = await prisma.investasi.update({
      where: {
        id: data.id,
      },
      data: {
        masterProgresInvestasiId: "2",
      },
    });
    // console.log(res);
    return res;
  }
}
