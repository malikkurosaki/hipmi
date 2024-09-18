import getListAllTransaksiById_Investasi from "@/app_modules/investasi/fun/get_list_all_transaksi_by_id";
import getMaster_StatusTransaksiInvestasi from "@/app_modules/investasi/fun/master/get_status_transaksi";

import { user_funGetOneUserId } from "@/app_modules/fun_global/get_user_token";
import { investasi_funGetTransaksiByUserId } from "@/app_modules/investasi/_fun";
import { Investasi_UiDaftarTransaksi } from "@/app_modules/investasi/_ui";
import { CheckCookies_UiView } from "@/app_modules/check_cookies";

export default async function Page() {
  const userLoginId = await user_funGetOneUserId();
  if (!userLoginId) return <CheckCookies_UiView />;

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
