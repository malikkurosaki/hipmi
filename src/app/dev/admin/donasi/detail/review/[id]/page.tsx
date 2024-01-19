import { AdminDonasi_DetailReview } from "@/app_modules/admin/donasi";
import { AdminDonasi_getOneById } from "@/app_modules/admin/donasi/fun/get/get_one_by_id";

export default async function Page({params}: {params: {id: string}}) {
    // console.log(params.id)
    const dataReview = await AdminDonasi_getOneById(params.id)
    // console.log(dataReview)
    return <AdminDonasi_DetailReview dataReview={dataReview as any}/>
}