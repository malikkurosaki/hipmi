import { AdminDonasi_DetailPublish } from "@/app_modules/admin/donasi";
import { AdminDonasi_funCountDonatur } from "@/app_modules/admin/donasi/fun/count/fun_count_donatur";
import { AdminDonasi_getListDonatur } from "@/app_modules/admin/donasi/fun/get/get_list_donatur_by_id";
import { AdminDonasi_getById } from "@/app_modules/admin/donasi/fun/get/get_one_by_id";

export default async function Page({params}: {params: {id: string}}) {
const dataPublish = await AdminDonasi_getById(params.id)
const listDonatur = await AdminDonasi_getListDonatur(params.id) 
const countDonatur = await AdminDonasi_funCountDonatur(params.id)


  return (
    <>
      <AdminDonasi_DetailPublish dataPublish={dataPublish as any} listDonatur={listDonatur} countDonatur={countDonatur} />
    </>
  );
}
