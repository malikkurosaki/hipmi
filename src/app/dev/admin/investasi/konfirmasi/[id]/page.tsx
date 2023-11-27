import { Admin_KonfirmasiInvestasi } from "@/app_modules/admin/investasi";
import { funGetUserProfile } from "@/app_modules/fun/get_user_profile";
import getOneInvestasiById from "@/app_modules/investasi/fun/get_one_investasi_by_id";


export default async function Page({ params }: { params: { id: string } }) {
  const dataInvestasi = await getOneInvestasiById(params.id)
  const dataUser = await funGetUserProfile(dataInvestasi?.authorId as any)
  // console.log(dataUser)

  return (
    <>
      <Admin_KonfirmasiInvestasi dataInvestasi={dataInvestasi as any} dataUser={dataUser as any} />
    </>
  );
}
