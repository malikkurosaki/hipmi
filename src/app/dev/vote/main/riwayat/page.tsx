import { Vote_Riwayat } from "@/app_modules/vote";
import { vote_getAllListRiwayat } from "@/app_modules/vote/fun/get/get_all_list_riwayat";
import { Vote_getAllListRiwayatSaya as vote_getAllListRiwayatSaya } from "@/app_modules/vote/fun/get/get_all_list_riwayat_saya";

export default async function Page() {
  const listRiwayat = await vote_getAllListRiwayat({ page: 1 });
  const listRiwayatSaya = await vote_getAllListRiwayatSaya({ page: 1 });

  return (
    <>
      <Vote_Riwayat
        listRiwayat={listRiwayat as any}
        listRiwayatSaya={listRiwayatSaya as any}
      />
    </>
  );
}
