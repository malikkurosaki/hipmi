import { PortofolioInvestasi } from "@/app_modules/investasi";
import { cookies } from "next/headers";
import fs from "fs";
import yaml from "yaml";
import { unsealData } from "iron-session";
import getInvestasiByStatusId from "@/app_modules/investasi/fun/get_investasi_by_id";
import getStatusInvestasi from "@/app_modules/investasi/fun/master/get_status_investasi";
import getPortoByStatusId from "@/app_modules/investasi/fun/get_porto_status_by_id";

const config = yaml.parse(fs.readFileSync("config.yaml").toString());

export default async function Page() {
  const c = cookies().get("ssn");
  const tkn = JSON.parse(
    await unsealData(c?.value as string, {
      password: config.server.password,
    })
  );

  const listStatusInvestasi = await getStatusInvestasi();
  const dataDraft = await getPortoByStatusId(tkn.id, 1)
  const dataReview = await getPortoByStatusId(tkn.id, 2)
  const dataPublish = await getPortoByStatusId(tkn.id, 3)
  const dataReject = await getPortoByStatusId(tkn.id, 4)



  return (
    <>
      <PortofolioInvestasi
        listStatusInvestasi={listStatusInvestasi as any}
        dataDraft={dataDraft}
        dataReview={dataReview}
        dataPublish={dataPublish}
        dataReject={dataReject}
      />
    </>
  );
}
