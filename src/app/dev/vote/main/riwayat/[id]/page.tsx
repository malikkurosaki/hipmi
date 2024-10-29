import { Vote_Riwayat } from "@/app_modules/vote";
import { vote_getAllListRiwayat } from "@/app_modules/vote/fun/get/get_all_list_riwayat";
import { Vote_getAllListRiwayatSaya as vote_getAllListRiwayatSaya } from "@/app_modules/vote/fun/get/get_all_list_riwayat_saya";

export default async function Page({ params }: { params: { id: string } }) {
  let statusRiwayatId = params.id;

  const listRiwayat = await vote_getAllListRiwayat({ page: 1 });
  const listRiwayatSaya = await vote_getAllListRiwayatSaya({ page: 1 });

  if (statusRiwayatId == "1") {
    return (
      <>
        <Vote_Riwayat
          riwayatId={statusRiwayatId}
          listRiwayat={listRiwayat as any}
        />
      </>
    );
  }
  if (statusRiwayatId == "2") {
    return (
      <>
        <Vote_Riwayat
          riwayatId={statusRiwayatId}
          listRiwayatSaya={listRiwayatSaya as any}
        />
      </>
    );
  }

  // return (
  //   <>
  //     <Vote_Riwayat
  //       riwayatId={statusRiwayatId}
  //       listRiwayat={listRiwayat as any}
  //       listRiwayatSaya={listRiwayatSaya as any}
  //     />
  //   </>
  // );
}
