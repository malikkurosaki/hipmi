import { funGetUserProfile } from "@/app_modules/fun/get_user_profile";
import { DetailInvestasi } from "@/app_modules/investasi";
import getOneInvestasiById from "@/app_modules/investasi/fun/get_one_investasi_by_id";

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

  const loginUserId = usr.id;
  const dataInvestasi = await getOneInvestasiById(params.id);
  const dataUser = await funGetUserProfile(dataInvestasi?.authorId as any);
  return (
    <>
      <DetailInvestasi
        dataInvestasi={dataInvestasi as any}
        dataUser={dataUser as any}
        loginUserId={loginUserId}
      />
    </>
  );
}
