import { Admin_KonfirmasiInvestasi } from "@/app_modules/admin/investasi";
import getOneInvestasiById from "@/app_modules/investasi/fun/get_one_investasi_by_id";

export default async function Page({ params }: { params: { id: string } }) {
  const dataInvestasi = await getOneInvestasiById(params.id);
  // console.log(dataUser)

  return (
    <>
      <Admin_KonfirmasiInvestasi dataInvestasi={dataInvestasi as any} />
    </>
  );
}
