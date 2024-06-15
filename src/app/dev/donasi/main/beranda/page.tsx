import { MainDonasi } from "@/app_modules/donasi";
import { Donasi_getListBeranda } from "@/app_modules/donasi/fun/get/get_list_beranda";

export default async function Page() {
    const listDonasi = await Donasi_getListBeranda()
    // console.log(listDonasi)
    return <MainDonasi listDonasi={listDonasi as any}/>
}