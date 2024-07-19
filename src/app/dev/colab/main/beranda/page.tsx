import { Colab_Beranda } from "@/app_modules/colab";
import colab_getListAllProyek from "@/app_modules/colab/fun/get/get_list_all_proyek";
import { user_getOneUserId } from "@/app_modules/fun_global/get_user_token";

export default async function Page() {
  const listData = await colab_getListAllProyek({page: 1});
  const userLoginId = await user_getOneUserId();

  return (
    <>
      <Colab_Beranda listData={listData as any} userLoginId={userLoginId} />
    </>
  );
}
