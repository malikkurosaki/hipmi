
import { AdminDonasi_ProsesTransaksi } from "@/app_modules/admin/donasi";
import { AdminDonasi_getListStatusInvoiceProses } from "@/app_modules/admin/donasi/fun/get/get_list_status_invoice_proses";

export default async function Page({params}: {params: {id: string}}) {
    let donasiId = params.id

    const listProses = await AdminDonasi_getListStatusInvoiceProses(donasiId)


    return <AdminDonasi_ProsesTransaksi listProses={listProses as any}/>
}