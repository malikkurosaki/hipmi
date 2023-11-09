import { PortofolioInvestasi } from "@/app_modules/investasi";
import { cookies } from "next/headers";
import fs from "fs";
import yaml from "yaml";
import { unsealData } from "iron-session";
import getInvestasiById from "@/app_modules/investasi/fun/get_investasi_by_id";
import getStatusInvestasi from "@/app_modules/investasi/fun/master/get_status_investasi";

const config = yaml.parse(fs.readFileSync("config.yaml").toString());

export default async function Page() {
  const c = cookies().get("ssn");
  const tkn = JSON.parse(
    await unsealData(c?.value as string, {
      password: config.server.password,
    })
  );

const dataInvestasi = await getInvestasiById(tkn.id)
const listStatusInvestasi = await getStatusInvestasi()
// console.log(listStatusInvestasi)

  return (
    <>
      <PortofolioInvestasi dataInvestasi={dataInvestasi as any} listStatusInvestasi={listStatusInvestasi as any}  />
    </>
  );
}
