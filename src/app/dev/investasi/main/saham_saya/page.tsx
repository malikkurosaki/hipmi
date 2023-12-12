import { InvestasiSahamTerbeli } from "@/app_modules/investasi";
import getListTransaksiBerhasilInvestasi from "@/app_modules/investasi/fun/get_list_transaksi_berhasil_by_id";
import yaml from "yaml";
import fs from "fs";
import { cookies } from "next/headers";
import { unsealData } from "iron-session";
const config = yaml.parse(fs.readFileSync("config.yaml").toString());

export default async function Page() {
  const c = cookies().get("ssn");
  const user = JSON.parse(
    await unsealData(c?.value as string, {
      password: config.server.password,
    })
  );
  const listTransaksi = await getListTransaksiBerhasilInvestasi(user.id)
  // console.log(listTransaksi)
  return (
    <>
      <InvestasiSahamTerbeli listTransaksi={listTransaksi as any} />
    </>
  );
}
