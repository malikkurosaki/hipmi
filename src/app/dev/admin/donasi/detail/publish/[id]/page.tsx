import { AdminDonasi_DetailPublish } from "@/app_modules/admin/donasi";
import { AdminDonasi_funCountDonatur } from "@/app_modules/admin/donasi/fun/count/fun_count_donatur";
import { AdminDonasi_getListDonatur } from "@/app_modules/admin/donasi/fun/get/get_list_donatur_by_id";
import { AdminDonasi_getListPencairanDana } from "@/app_modules/admin/donasi/fun/get/get_list_pencairan_dana_by_id";
import { AdminDonasi_getOneById } from "@/app_modules/admin/donasi/fun/get/get_one_by_id";

export default async function Page({ params }: { params: { id: string } }) {
  const dataPublish = await AdminDonasi_getOneById(params.id);
  const listDonatur = await AdminDonasi_getListDonatur(params.id);
  const countDonatur = await AdminDonasi_funCountDonatur(params.id);
  const listPencairan = await AdminDonasi_getListPencairanDana(params.id);
  // console.log(listDonatur)

  return (
    <>
      <AdminDonasi_DetailPublish
        dataPublish={dataPublish as any}
        listDonatur={listDonatur}
        countDonatur={countDonatur}
        listPencairan={listPencairan as any}
      />
    </>
  );
}
