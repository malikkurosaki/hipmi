import { Colab_Proyek } from "@/app_modules/colab";
import colab_getListPartisipasiByAuthorId from "@/app_modules/colab/fun/get/get_list_partisipasi_by_author_id";
import colab_getListAllProyekSayaByAuthorId from "@/app_modules/colab/fun/get/get_list_proyek_saya_by_author_id";

export default async function Page() {
  const listPartisipasiUser = (await colab_getListPartisipasiByAuthorId()).data;
  const listProyekSaya = (await colab_getListAllProyekSayaByAuthorId()).data;

  return (
    <>
      <Colab_Proyek
        listPartisipasiUser={listPartisipasiUser as any}
        listProyekSaya={listProyekSaya as any}
      />
    </>
  );
}
