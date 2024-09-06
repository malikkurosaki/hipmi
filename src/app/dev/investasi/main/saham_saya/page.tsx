import { investasi_funGetSuccessTransactionById } from "@/app_modules/investasi/_fun";
import { Investasi_UiSahamSaya } from "@/app_modules/investasi/_ui";
import fs from "fs";
import yaml from "yaml";
const config = yaml.parse(fs.readFileSync("config.yaml").toString());

export default async function Page() {
  // const c = cookies().get("ssn");
  // const user = JSON.parse(
  //   await unsealData(c?.value as string, {
  //     password: config.server.password,
  //   })
  // );
  // const listTransaksi = await getListTransaksiBerhasilInvestasi(user.id);

  const dataSaham = await investasi_funGetSuccessTransactionById({ page: 1 });

  return (
    <>
      {/* <InvestasiSahamTerbeli listTransaksi={listTransaksi as any} /> */}
      <Investasi_UiSahamSaya dataSaham={dataSaham as any} />
    </>
  );
}
