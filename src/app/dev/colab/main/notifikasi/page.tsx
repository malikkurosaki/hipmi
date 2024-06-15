import { Colab_NotifikasiView } from "@/app_modules/colab";
import colab_getListNotifikasiByUserId from "@/app_modules/colab/fun/get/get_list_notifikasi_by_user_id";

export default async function Page() {
  const listNotifikasi = await colab_getListNotifikasiByUserId();
  // console.log(listNotifikasi);

  return (
    <>
      <Colab_NotifikasiView listNotifikasi={listNotifikasi as any} />
    </>
  );
}
