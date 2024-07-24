import { Donasi_ProsesTransaksi } from "@/app_modules/donasi";
import { Donasi_getOneInvoiceById } from "@/app_modules/donasi/fun/get/get_one_invoice_by_id";
import donasi_getMasterNomorAdmin from "@/app_modules/donasi/fun/master/get_nomor_admin";

export default async function Page({ params }: { params: { id: string } }) {
  // console.log(params.id)
  const dataInvoice = await Donasi_getOneInvoiceById(params.id);
  const nomorAdmin = await donasi_getMasterNomorAdmin();

  return (
    <>
      <Donasi_ProsesTransaksi
        dataInvoice={dataInvoice as any}
        nomorAdmin={nomorAdmin}
      />
    </>
  );
}
