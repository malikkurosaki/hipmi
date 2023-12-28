import { CreateCeritaPenggalangDonasi } from "@/app_modules/donasi";
import { Donasi_getTemporaryCreate } from "@/app_modules/donasi/fun/get/get_temporary_create";
import { funGetUserToken } from "@/app_modules/fun/fun_get_user_token";


export default async function Page({ params }: { params: { id: string } }) {
  
  const getTemporaryCreate = await Donasi_getTemporaryCreate(params.id);
  const getToken = await funGetUserToken()
  const userId = getToken.id

  return (
    <>
      <CreateCeritaPenggalangDonasi dataTemporary={getTemporaryCreate as any} userId={userId} />
    </>
  );
}
