import { Investasi_UiProsesTransaksi } from "@/app_modules/investasi/_ui";

export default async function Page({ params }: { params: { id: string } }) {
  const invoiceId = params.id;
  
  return (
    <>
      <Investasi_UiProsesTransaksi />
    </>
  );
}
