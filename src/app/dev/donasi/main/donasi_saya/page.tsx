import { DonasiSayaDonasi } from "@/app_modules/donasi";
import { Donasi_getInvoiceByAuthorId } from "@/app_modules/donasi/fun/get/get_list_invoice_by_author_id";
import { user_getOneUserId } from "@/app_modules/fun_global/get_user_token";

export default async function Page() {
  const authorId = await user_getOneUserId();
  const listInvoice = await Donasi_getInvoiceByAuthorId(authorId);

  return <DonasiSayaDonasi listInvoice={listInvoice as any} />;
}
