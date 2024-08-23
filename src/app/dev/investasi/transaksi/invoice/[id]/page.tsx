import { Investasi_UiInvoice } from "@/app_modules/investasi/_ui";

export default function Page({ params }: { params: { id: string } }) {
  const invoiceId = params.id;
  

  return (
    <>
      <Investasi_UiInvoice />
    </>
  );
}
