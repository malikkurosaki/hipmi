import { DonasiSayaDonasi } from "@/app_modules/donasi";
import { donasi_funGetAllInvoiceByAuthorId } from "@/app_modules/donasi/fun/get/get_all_invoice_by_author_id";

export default async function Page() {
  const listInvoice = await donasi_funGetAllInvoiceByAuthorId({ page: 1 });

  return <DonasiSayaDonasi listInvoice={listInvoice as any} />;
}
