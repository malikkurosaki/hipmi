import { KabarDonasi } from "@/app_modules/donasi";
import { Donasi_getListKabar } from "@/app_modules/donasi/fun/get/get_list_kabar";

export default async function Page({params}: {params: {id: string}}) {
  const donasiId = params.id
  const listKabar = await Donasi_getListKabar(donasiId)

  return (
    <>
      <KabarDonasi listKabar={listKabar as any} />
    </>
  );
}
