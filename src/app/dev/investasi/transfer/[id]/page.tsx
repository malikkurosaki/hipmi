import { TransferInvestasi } from "@/app_modules/investasi";
import getOneInvestasiById from "@/app_modules/investasi/fun/get_one_investasi_by_id";
import getTransaksiInvestasi from "@/app_modules/investasi/fun/get_transaksi_investasi";

export default async function Page({ params }: { params: { id: string } }) {
  const dataTransaksi = await getTransaksiInvestasi(params.id);

  return <>
  <TransferInvestasi dataTransaksi={dataTransaksi as any}/>
  </>;
}
