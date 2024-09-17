import { InvestasiCreate } from "@/app_modules/investasi";
import getPembagianDeviden from "@/app_modules/investasi/fun/master/get_pembagian_deviden";
import getPencarianInvestor from "@/app_modules/investasi/fun/master/get_pencarian_investor";
import getPeriodeDeviden from "@/app_modules/investasi/fun/master/get_periode_deviden";
import getStatusInvestasi from "@/app_modules/investasi/fun/master/get_status_investasi";
import { unsealData } from "iron-session";
import { cookies } from "next/headers";

export default async function Page() {

  const pencarianInvestor = await getPencarianInvestor();
  const periodeDeviden = await getPeriodeDeviden();
  const pembagianDeviden = await getPembagianDeviden();
  const statusInvestasi = await getStatusInvestasi();

  return (
    <>
      <InvestasiCreate
        pencarianInvestor={pencarianInvestor as any}
        periodeDeviden={periodeDeviden as any}
        pembagianDeviden={pembagianDeviden as any}
      />
    </>
  );
}
