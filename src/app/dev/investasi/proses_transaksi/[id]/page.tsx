import { ProsesTransaksiInvestasi } from "@/app_modules/investasi";
import getOneInvestasiById from "@/app_modules/investasi/fun/get_one_investasi_by_id";
import { unsealData } from "iron-session";
import { cookies } from "next/headers";
import { funGetUserProfile } from "@/app_modules/fun_global/get_user_profile";
import yaml from "yaml";
import fs from "fs";
const config = yaml.parse(fs.readFileSync("config.yaml").toString());

export default async function Page({ params }: { params: { id: string } }) {
  const c = cookies().get("ssn");
  const user = JSON.parse(
    await unsealData(c?.value as string, {
      password: config.server.password,
    })
  );

  const userLogin = await funGetUserProfile(user.id);
  const dataInvestasi = await getOneInvestasiById(params.id);

  // console.log(dataInvestasi);
  return (
    <>
      <ProsesTransaksiInvestasi
        dataInvestasi={dataInvestasi as any}
        userLogin={userLogin as any}
      />
    </>
  );
}
