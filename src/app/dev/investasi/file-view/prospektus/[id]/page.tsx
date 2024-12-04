import { investasi_funGetProspekById } from "@/app_modules/investasi/_fun";
import { Investasi_UiFileView } from "@/app_modules/investasi/_ui";

export default async function Page({ params }: { params: { id: string } }) {
  const pospektusId = params.id;

  return (
    <>
      <Investasi_UiFileView pospektusId={pospektusId} />
    </>
  );
}
