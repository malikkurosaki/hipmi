import { investasi_funGetOneBeritaById } from "@/app_modules/investasi/_fun";
import { Investasi_UiDetailBerita } from "@/app_modules/investasi/_ui";

export default async function Page({ params }: { params: { id: string } }) {
  const beritaId = params.id;
  const dataBerita = await investasi_funGetOneBeritaById({ beritaId });
  return (
    <>
      <Investasi_UiDetailBerita dataBerita={dataBerita} />
    </>
  );
}
