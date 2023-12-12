import { DetailSahamTerbeli } from "@/app_modules/investasi";
import funTotalInvestorByIdInvestasi from "@/app_modules/investasi/fun/fun_total_investor_by_id";
import getOneTransaksiBerhasilByIdInvestasi from "@/app_modules/investasi/fun/get_one_transaksi_berhasil_by_id";

export default async function Page({ params }: { params: { id: string } }) {
  const dataTransaksi = await getOneTransaksiBerhasilByIdInvestasi(params.id);
  const investor = await funTotalInvestorByIdInvestasi(
    dataTransaksi?.Investasi.id as any
  );
  // console.log(investor);

  return <DetailSahamTerbeli dataTransaksi={dataTransaksi as any} investor={investor} />;
}
