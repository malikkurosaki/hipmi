import { StatusTransaksiInvestasi_Gagal } from "@/app_modules/investasi";
import getTransaksiByIdInvestasi from "@/app_modules/investasi/fun/get_transaksi_investasi";

export default async function Page({ params }: { params: { id: string } }) {
  // console.log(params.id)
  const dataTransaksi = await getTransaksiByIdInvestasi(params.id);
//   console.log(dataTransaksi);

  return (
    <>
      <StatusTransaksiInvestasi_Gagal dataTransaksi={dataTransaksi as any} />
    </>
  );
}
