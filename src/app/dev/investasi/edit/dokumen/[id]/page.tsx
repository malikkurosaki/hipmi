import { investasi_funGetOneDocumentById } from "@/app_modules/investasi/_fun";
import { Investasi_UiEditDokumen } from "@/app_modules/investasi/_ui";

export default async function Page({ params }: { params: { id: string } }) {
  const documentId = params.id;
  const dataDokumen = await investasi_funGetOneDocumentById({ documentId });


  return (
    <>
      <Investasi_UiEditDokumen dataDokumen={dataDokumen} />
    </>
  );
}
