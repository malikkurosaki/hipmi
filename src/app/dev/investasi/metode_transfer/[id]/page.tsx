import { MetodeTransferInvestasi } from "@/app_modules/investasi";
import getOneInvestasiById from "@/app_modules/investasi/fun/get_one_investasi_by_id";
import getMaster_NamaBank from "@/app_modules/investasi/fun/master/get_nama_bank";

import { user_funGetOneUserId } from "@/app_modules/fun_global";

export default async function Page({ params }: { params: { id: string } }) {
  const authorId = await user_funGetOneUserId();
  const dataInvestasi = await getOneInvestasiById(params.id);
  const namaBank = await getMaster_NamaBank();
  // console.log(namaBank)
  return (
    <>
      <MetodeTransferInvestasi
        dataInvestasi={dataInvestasi as any}
        namaBank={namaBank as any}
        authorId={authorId}
      />
    </>
  );
}
