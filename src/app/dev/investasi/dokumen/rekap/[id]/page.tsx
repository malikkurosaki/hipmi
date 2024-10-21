import { investasi_funGetAllDocumentById } from "@/app_modules/investasi/_fun";
import { Investasi_UiRekapDokumen } from "@/app_modules/investasi/_ui";

export default async function Page({ params }: { params: { id: string } }) {
  const investasiId = params.id;
  const dataDokumen = await investasi_funGetAllDocumentById({
    investasiId,
    page: 1,
  });

  return (
    <>
      <Investasi_UiRekapDokumen
        investasiId={investasiId}
        dataDokumen={dataDokumen}
      />
    </>
  );
}
