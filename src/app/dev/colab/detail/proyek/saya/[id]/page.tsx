import { Colab_DetailProyekSaya } from "@/app_modules/colab";
import colab_getListPartisipanById from "@/app_modules/colab/fun/get/get_list_partisipan_by_id";
import colab_getOneCollaborationById from "@/app_modules/colab/fun/get/get_one_by_id";

export default async function Page({ params }: { params: { id: string } }) {
  const colabId = params.id
  const dataColab = await colab_getOneCollaborationById(colabId)
  const listPartisipan = await colab_getListPartisipanById(colabId);


  return (
    <>
    {/* <pre>{JSON.stringify(listPartisipan, null,2)}</pre> */}
      <Colab_DetailProyekSaya
        dataColab={dataColab as any}
        listPartisipan={listPartisipan as any}
      />
    </>
  );
}
