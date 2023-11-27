import { TransaksiInvestasi } from "@/app_modules/investasi";
import getListAllTransaksiById_Investasi from "@/app_modules/investasi/fun/get_list_all_transaksi_by_id";
import getMaster_StatusTransaksiInvestasi from "@/app_modules/investasi/fun/master/get_status_transaksi";

import fs from "fs";
import yaml from "yaml";
import { unsealData } from "iron-session";
import { cookies } from "next/headers";
import funCountDown from "@/app_modules/investasi/fun/fun_countdown_investasi";
import funCekSisaWaktuTransaksiInvestasi from "@/app_modules/investasi/fun/fun_cek_sisa_waktu";
const config = yaml.parse(fs.readFileSync("config.yaml").toString());

export default async function Page() {
  const c = cookies().get("ssn");
  const tkn = JSON.parse(
    await unsealData(c?.value as string, {
      password: config.server.password,
    })
  );
  const userId = tkn.id;
  const statusTransaksi = await getMaster_StatusTransaksiInvestasi();
  const listTransaksi = await getListAllTransaksiById_Investasi(userId);
  
  return (
    <>
      <TransaksiInvestasi
        statusTransaksi={statusTransaksi as any}
        listTransaksi={listTransaksi as any}
      />
    </>
  );
}
