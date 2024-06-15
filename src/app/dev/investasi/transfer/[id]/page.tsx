import { TransferInvestasi } from "@/app_modules/investasi";
import funCountDown from "@/app_modules/investasi/fun/fun_countdown_investasi";
import getOneInvestasiById from "@/app_modules/investasi/fun/get_one_investasi_by_id";
import getTransaksiByIdInvestasi from "@/app_modules/investasi/fun/get_transaksi_investasi";

export default async function Page({ params }: { params: { id: string } }) {
  const dataTransaksi = await getTransaksiByIdInvestasi(params.id);
  // const cd = await funCountDown(params.id)
  // console.log(dataTransaksi)
  // const cd = await funCountDown("" + dataTransaksi?.id);

  return (
    <>
      <TransferInvestasi dataTransaksi={dataTransaksi as any} />
    </>
  );
}
