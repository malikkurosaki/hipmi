import { Investasi_UiCreateDocument } from "@/app_modules/investasi/_ui";

export default async function Page({ params }: { params: { id: string } }) {
  const investasiId = params.id;

  return (
    <>
      <Investasi_UiCreateDocument investasiId={investasiId} />
    </>
  );
}
