import { DonaturDonasi } from "@/app_modules/donasi";
import { Donasi_getListDonatur } from "@/app_modules/donasi/fun/get/get_list_donatur";

export default async function Page({ params }: { params: { id: string } }) {
  const listDonatur = await Donasi_getListDonatur(params.id);

  return (
    <>
      <DonaturDonasi listDonatur={listDonatur as any} />
    </>
  );
}
