import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { DetailMainDonasi } from "@/app_modules/donasi";
import { Donasi_getCountDonatur } from "@/app_modules/donasi/fun/count/get_count_donatur";
import { Donasi_getOneById } from "@/app_modules/donasi/fun/get/get_one_donasi_by_id";

export default async function Page({ params }: { params: { id: string } }) {
  let donasiId = params.id;
  const userLoginId = await funGetUserIdByToken();

  const dataDonasi = await Donasi_getOneById(donasiId);
  const countDonatur = await Donasi_getCountDonatur(donasiId);

  return (
    <>
      <DetailMainDonasi
        dataDonasi={dataDonasi as any}
        countDonatur={countDonatur}
        userLoginId={userLoginId as string}
      />
    </>
  );
}
