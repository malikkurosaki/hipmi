import { Colab_DetailNotifikasi } from "@/app_modules/colab";
import colab_getOneNotifikasiById from "@/app_modules/colab/fun/get/get_one_notifikasi_by_id";

export default async function Page({ params }: { params: { id: string } }) {
  let notifId = params.id;
  const data = await colab_getOneNotifikasiById({ notifId: notifId });

  return (
    <>
      <Colab_DetailNotifikasi data={data as any} />
    </>
  );
}
