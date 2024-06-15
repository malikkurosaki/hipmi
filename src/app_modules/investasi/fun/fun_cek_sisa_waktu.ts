"use server";

import moment from "moment";
import { MODEL_Transaksi_Investasi } from "../model/model_investasi";
import funGantiStatusTransaksi_Investasi from "./fun_ganti_status_transaksi";

export default async function funCekSisaWaktuTransaksiInvestasi(
  data: MODEL_Transaksi_Investasi[]
) {
  const listData = data;


  for (let e of listData) {
    cekWaktu(e)
  }

  async function cekWaktu(data: MODEL_Transaksi_Investasi) {
    // console.log(data)
    const selesai = moment(data.createdAt).add(1, "days").format();
    // let durasi = moment.duration(moment(selesai).diff(new Date()));
    const skrng = moment(new Date());
    const sisaWaktu = moment(selesai).diff(skrng);

    
    if (sisaWaktu <= 0) {
      await funGantiStatusTransaksi_Investasi(data.id, "4")
      .then((res) => {
        // console.log(res.data)
      });
    }
  }

}
