import { investasi_funGetSuccessTransactionById } from "@/app_modules/investasi/_fun";
import { Investasi_UiSahamSaya } from "@/app_modules/investasi/_ui";

export default async function Page() {
  const dataSaham = await investasi_funGetSuccessTransactionById({ page: 1 });

  return (
    <>
      {/* <InvestasiSahamTerbeli listTransaksi={listTransaksi as any} /> */}
      <Investasi_UiSahamSaya dataSaham={dataSaham as any} />
    </>
  );
}
