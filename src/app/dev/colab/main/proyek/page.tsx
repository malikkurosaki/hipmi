import { Colab_Proyek } from "@/app_modules/colab";
import colab_getListPartisipasiProyekByAuthorId from "@/app_modules/colab/fun/get/get_list_partisipasi_proyek_by_author_id";
import colab_getListAllProyekSayaByAuthorId from "@/app_modules/colab/fun/get/get_list_proyek_saya_by_author_id";

export default async function Page() {
  const listPartisipasiProyek = (await colab_getListPartisipasiProyekByAuthorId()).data;
  const listProyekSaya = (await colab_getListAllProyekSayaByAuthorId()).data;

  return (
    <>
      <Colab_Proyek
        listPartisipasiUser={listPartisipasiProyek as any}
        listProyekSaya={listProyekSaya as any}
      />
    </>
  );
}
