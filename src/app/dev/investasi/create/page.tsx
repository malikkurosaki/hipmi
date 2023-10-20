import { InvestasiCreate } from "@/app_modules/investasi";
import { unsealData } from "iron-session";
import { cookies } from "next/headers";
import yaml from "yaml";
import fs from "fs";
import { funCreateInvestasi } from "@/app_modules/investasi/fun/fun_create_investasi";
import getPencarianInvestor from "@/app_modules/investasi/fun/get_pencarian_investor";
import getPeriodeDeviden from "@/app_modules/investasi/fun/get_periode_deviden";
import getPembagianDeviden from "@/app_modules/investasi/fun/get_pembagian_deviden";

const config = yaml.parse(fs.readFileSync("config.yaml").toString());

export default async function Page() {
  const c = cookies().get("ssn");
  const tkn = JSON.parse(
    await unsealData(c?.value as string, {
      password: config.server.password,
    })
  );

  const pencarianInvestor = await getPencarianInvestor();
  const periodeDeviden = await getPeriodeDeviden();
  const pembagianDeviden = await getPembagianDeviden();

  //   console.log(pembagianDeviden)

  return (
    <>
      <InvestasiCreate
        id={tkn.id}
        pencarianInvestor={pencarianInvestor as any}
        periodeDeviden={periodeDeviden as any}
        pembagianDeviden={pembagianDeviden as any}
      />
    </>
  );
}
