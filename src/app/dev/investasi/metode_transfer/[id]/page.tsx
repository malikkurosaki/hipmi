import { MetodeTransferInvestasi } from "@/app_modules/investasi";
import getOneInvestasiById from "@/app_modules/investasi/fun/get_one_investasi_by_id";
import getMaster_NamaBank from "@/app_modules/investasi/fun/master/get_nama_bank";

import yaml from "yaml";
import fs from "fs";
import { cookies } from "next/headers";
import { unsealData } from "iron-session";
const config = yaml.parse(fs.readFileSync("config.yaml").toString());

export default async function Page({ params }: { params: { id: string } }) {
  const c = cookies().get("ssn");
  const usr = JSON.parse(
    await unsealData(c?.value as string, {
      password: config.server.password,
    })
  );

  const authorId = usr.id;
  const dataInvestasi = await getOneInvestasiById(params.id);
  const namaBank = await getMaster_NamaBank();
  // console.log(namaBank)
  return (
    <>
      <MetodeTransferInvestasi
        dataInvestasi={dataInvestasi as any}
        namaBank={namaBank as any}
        authorId={authorId}
      />
    </>
  );
}
