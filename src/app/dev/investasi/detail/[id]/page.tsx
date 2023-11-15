import { funGetUserProfile } from "@/app_modules/fun/get_user_profile";
import { DetailInvestasi } from "@/app_modules/investasi";
import getOneInvestasiById from "@/app_modules/investasi/fun/get_one_investasi_by_id";

export default async function Page({params}: {params: {id: string}}) {
    const dataInvestasi = await getOneInvestasiById(params.id)
    const dataUser = await funGetUserProfile(dataInvestasi?.authorId as any)
    return<>
    <DetailInvestasi dataInvestasi={dataInvestasi as any} dataUser={dataUser as any}/>
    </>
}