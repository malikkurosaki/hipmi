import getListAllTransaksiById_Investasi from "@/app_modules/investasi/fun/get_list_all_transaksi_by_id";
import getMaster_StatusTransaksiInvestasi from "@/app_modules/investasi/fun/master/get_status_transaksi";

import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { investasi_funGetTransaksiByUserId } from "@/app_modules/investasi/_fun";
import { Investasi_UiDaftarTransaksi } from "@/app_modules/investasi/_ui";

export default async function Page() {
  const userLoginId = await funGetUserIdByToken();

  const statusTransaksi = await getMaster_StatusTransaksiInvestasi();
  const listTransaksi = await getListAllTransaksiById_Investasi(userLoginId);

  // NEW
  const dataTransaksi = await investasi_funGetTransaksiByUserId({ page: 1 });

  return (
    <>
      {/* <TransaksiInvestasi
        statusTransaksi={statusTransaksi as any}
        listTransaksi={listTransaksi as any}
      /> */}
      <Investasi_UiDaftarTransaksi dataTransaksi={dataTransaksi} />
    </>
  );
}
