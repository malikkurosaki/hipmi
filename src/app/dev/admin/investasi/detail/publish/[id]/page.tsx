import { AdminInvestasi_DetailPublish } from "@/app_modules/admin/investasi";
import {
  adminInvestasi_funGetAllTransaksiById,
  adminInvestasi_getStatusInvestasi,
} from "@/app_modules/admin/investasi/fun";
import getOneInvestasiById from "@/app_modules/investasi/fun/get_one_investasi_by_id";

export default async function Page({ params }: { params: { id: string } }) {
  const investasiId = params.id;
  const dataInvestasi = await getOneInvestasiById(investasiId);
  const statusTransaksi = await adminInvestasi_getStatusInvestasi();
  const dataTransaksi = await adminInvestasi_funGetAllTransaksiById({
    investasiId,
    page: 1,
  });

  return (
    <>
      <AdminInvestasi_DetailPublish
        data={dataInvestasi as any}
        dataTransaksi={dataTransaksi as any}
        statusTransaksi={statusTransaksi}
        investasiId={investasiId as any}
      />
    </>
  );
}
