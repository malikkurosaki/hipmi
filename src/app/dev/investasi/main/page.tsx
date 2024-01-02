import { MainInvestasi } from "@/app_modules/investasi";
import funUpadteProgresPersenInvestasi from "@/app_modules/investasi/fun/fun_update_progres_persen";
import funUpadteProgresWaktuInvestasi from "@/app_modules/investasi/fun/fun_update_progres_waktu";
import getAllDataPublishInvestasi from "@/app_modules/investasi/fun/get_list_all_investasi";
import { getListAllPublish } from "@/app_modules/investasi/fun/get_list_all_publish";
import { MODEL_Investasi } from "@/app_modules/investasi/model/model_investasi";

import _ from "lodash";

export default async function Page() {
  const dataOnProgres = await getListAllPublish("1");
  const dataSelesai = await getListAllPublish("2");
  const dataWaktuHabis = await getListAllPublish("3");
  const allData = await getAllDataPublishInvestasi();
  // console.log(allData)

  // const dataInves: MODEL_Investasi[] = [];

  // for (let i of allData as any) {
  //   await funUpadteProgresWaktuInvestasi(i).then(
  //     async () =>
  //       await funUpadteProgresPersenInvestasi(i).then(
  //         async () =>
  //           await getAllDataPublishInvestasi().then((val: any) =>
  //             dataInves.push(val)
  //           )
  //       )
  //   );
  // }

  // const realData = dataInves.map((e) => e)
  // console.log(allData)
 
 

  return (
    <>
      <MainInvestasi
        listData={allData as any}
        dataSelesai={dataSelesai as any}
        dataWaktuHabis={dataWaktuHabis as any}
      />
    </>
  );
}
