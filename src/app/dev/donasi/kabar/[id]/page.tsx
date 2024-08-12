import { KabarDonasi } from "@/app_modules/donasi";
import { donasi_funGetListKabarById } from "@/app_modules/donasi/fun/get/get_list_kabar";

export default async function Page({params}: {params: {id: string}}) {
  const donasiId = params.id
  const listKabar = await donasi_funGetListKabarById({ page: 1, donasiId : donasiId});

  return (
    <>
      <KabarDonasi listKabar={listKabar as any} donasiId={donasiId} />
    </>
  );
}
