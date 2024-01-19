import { DetailMainDonasi } from "@/app_modules/donasi";
import { Donasi_getCountDonatur } from "@/app_modules/donasi/fun/count/get_count_donatur";
import { Donasi_getOneById } from "@/app_modules/donasi/fun/get/get_one_donasi_by_id";
import { User_getUserId } from "@/app_modules/fun_global/get_user_token";

export default async function Page({ params }: { params: { id: string } }) {
  let donasiId = params.id;
  const dataDonasi = await Donasi_getOneById(donasiId);
  const countDonatur = await Donasi_getCountDonatur(donasiId)
  const userLoginId = await User_getUserId();

  return (
    <>
      <DetailMainDonasi dataDonasi={dataDonasi as any} countDonatur={countDonatur} userLoginId={userLoginId}/>
    </>
  );
}
