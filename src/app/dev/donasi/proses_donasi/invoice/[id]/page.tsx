import { Donasi_InvoiceProses } from "@/app_modules/donasi";
import { Donasi_getOneById } from "@/app_modules/donasi/fun/get/get_one_donasi_by_id";
import { Donasi_getOneInvoiceById } from "@/app_modules/donasi/fun/get/get_one_invoice_by_id";

export default async function Page({ params }: { params: { id: string } }) {
  let invoiceId = params.id;
  const dataInvoice = await Donasi_getOneInvoiceById(invoiceId);


  return <Donasi_InvoiceProses dataInvoice={dataInvoice as any} />;
}
