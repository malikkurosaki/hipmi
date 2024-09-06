import { investasi_funGetProspekById } from "@/app_modules/investasi/_fun";
import { Investasi_UiFileView } from "@/app_modules/investasi/_ui";

export default async function Page({ params }: { params: { id: string } }) {
  const prospekId = params.id;

  return (
    <>
      <Investasi_UiFileView prospekId={prospekId} />
    </>
  );
}
