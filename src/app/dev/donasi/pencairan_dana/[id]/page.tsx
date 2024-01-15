import { PencairanDanaDonasi } from "@/app_modules/donasi";
import ComponentDonasi_LoaderOverlay from "@/app_modules/donasi/component/loader_overlay";
import { NotifPeringatan } from "@/app_modules/donasi/component/notifikasi/notif_peringatan";
import { Donasi_getListPencairanDanaById } from "@/app_modules/donasi/fun/get/get_list_pencairan_dana_by_id";
import { Donasi_getTotalPencairanDanaById } from "@/app_modules/donasi/fun/get/get_pencairan_dana_by_id";
import { getToken_UserId } from "@/app_modules/fun/get_user_token";
import { Loader } from "@mantine/core";

export default async function Page({ params }: { params: { id: string } }) {
  let donasiId = params.id;
  const totalAkumulasi = await Donasi_getTotalPencairanDanaById(donasiId);
  const listPencairan = await Donasi_getListPencairanDanaById(donasiId);
  

  // if (authorId != totalAkumulasi?.authorId) return <><NotifPeringatan /></>
  
  return (
    <>
      <PencairanDanaDonasi
        totalAkumulasi={totalAkumulasi as any}
        listPencairan={listPencairan as any}
      />
    </>
  );
}
