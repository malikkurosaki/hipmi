import { Investasi_UiEditProspektus } from "@/app_modules/investasi/_ui";

export default async function Page({ params }: { params: { id: string } }) {
  const investasiId = params.id;

  return (
    <>
      <Investasi_UiEditProspektus investasiId={investasiId} />
    </>
  );
}
