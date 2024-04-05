import { Colab_Beranda } from "@/app_modules/colab";
import colab_getListAllProyek from "@/app_modules/colab/fun/get/get_list_all_proyek";

export default async function Page() {
    const listData = await colab_getListAllProyek()

    return (
      <>
        <Colab_Beranda listData={listData as any} />
      </>
    );
}