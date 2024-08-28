import { investasi_funGetInvoiceById } from "@/app_modules/investasi/_fun/get/fun_get_invoice_by_id";
import { Investasi_UiInvoice } from "@/app_modules/investasi/_ui";

export default async function Page({ params }: { params: { id: string } }) {
  const invoiceId = params.id;
  const dataInvoice = await investasi_funGetInvoiceById({ invoiceId: invoiceId });

  return (
    <>
      <Investasi_UiInvoice dataInvoice={dataInvoice as any} />
    </>
  );
}
