import { Donasi_ProsesTransaksi } from "@/app_modules/donasi";
import { Donasi_getOneInvoiceById } from "@/app_modules/donasi/fun/get/get_one_invoice_by_id";

export default async function Page({params}: {params: {id: string}}) {
  // console.log(params.id)
  const dataInvoice = await Donasi_getOneInvoiceById(params.id)
  // console.log(dataInvoice)
  return (
    <>
      <Donasi_ProsesTransaksi dataInvoice={dataInvoice as any} />
    </>
  );
}
