import { CheckCookies_UiView } from "@/app_modules/check_cookies";
import { CreateCeritaPenggalangDonasi } from "@/app_modules/donasi";
import { Donasi_getTemporaryCreate } from "@/app_modules/donasi/fun/get/get_temporary_create";
import { user_funGetOneUserId } from "@/app_modules/fun_global/get_user_token";

export default async function Page({ params }: { params: { id: string } }) {
  const getTemporaryCreate = await Donasi_getTemporaryCreate(params.id);
  const userLoginId = await user_funGetOneUserId();
  if (!userLoginId) return <CheckCookies_UiView />;

  return (
    <>
      <CreateCeritaPenggalangDonasi
        dataTemporary={getTemporaryCreate as any}
        userId={userLoginId}
      />
    </>
  );
}
