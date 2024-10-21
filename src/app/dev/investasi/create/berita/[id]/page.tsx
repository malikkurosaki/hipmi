import { Investasi_UiCreateBerita } from "@/app_modules/investasi/_ui";

export default async function Page({ params }: { params: { id: string } }) {
  const investasiId = params.id;
  return (
    <>
      <Investasi_UiCreateBerita investasiId={investasiId} />
    </>
  );
}
