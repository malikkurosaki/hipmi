import { Vote_Riwayat } from "@/app_modules/vote";
import { Vote_getAllListRiwayat } from "@/app_modules/vote/fun/get/get_all_list_riwayat";
import { Vote_getAllListRiwayatSaya } from "@/app_modules/vote/fun/get/get_all_list_riwayat_saya";

export default async function Page() {
  const listRiwayat = await Vote_getAllListRiwayat();
  const listRiwayatSaya = await Vote_getAllListRiwayatSaya()

  return (
    <>
      <Vote_Riwayat
        listRiwayat={listRiwayat as any}
        listRiwayatSaya={listRiwayatSaya as any}
      />
    </>
  );
}
