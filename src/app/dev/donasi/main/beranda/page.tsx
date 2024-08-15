import { MainDonasi } from "@/app_modules/donasi";
import { donasi_funGetAllPublish } from "@/app_modules/donasi/fun/get/get_list_beranda";

export default async function Page() {
  const listDonasi = await donasi_funGetAllPublish({ page: 1 });
  // console.log(listDonasi)
  return <MainDonasi listDonasi={listDonasi as any} />;
}
