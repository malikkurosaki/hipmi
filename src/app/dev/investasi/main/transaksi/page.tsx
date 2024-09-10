import { TransaksiInvestasi } from "@/app_modules/investasi";
import getListAllTransaksiById_Investasi from "@/app_modules/investasi/fun/get_list_all_transaksi_by_id";
import getMaster_StatusTransaksiInvestasi from "@/app_modules/investasi/fun/master/get_status_transaksi";

import fs from "fs";
import yaml from "yaml";
import { unsealData } from "iron-session";
import { cookies } from "next/headers";
import funCountDown from "@/app_modules/investasi/fun/fun_countdown_investasi";
import funCekSisaWaktuTransaksiInvestasi from "@/app_modules/investasi/fun/fun_cek_sisa_waktu";
import { user_funGetOneUserId } from "@/app_modules/fun_global/get_user_token";
import { investasi_funGetTransaksiByUserId } from "@/app_modules/investasi/_fun";
import { Investasi_UiDaftarTransaksi } from "@/app_modules/investasi/_ui";
const config = yaml.parse(fs.readFileSync("config.yaml").toString());

export default async function Page() {
  const userId = await user_funGetOneUserId();
  const statusTransaksi = await getMaster_StatusTransaksiInvestasi();
  const listTransaksi = await getListAllTransaksiById_Investasi(userId);

  // NEW
  const dataTransaksi = await investasi_funGetTransaksiByUserId({page: 1});

  return (
    <>
      {/* <TransaksiInvestasi
        statusTransaksi={statusTransaksi as any}
        listTransaksi={listTransaksi as any}
      /> */}
      <Investasi_UiDaftarTransaksi dataTransaksi={dataTransaksi}/>
    </>
  );
}
