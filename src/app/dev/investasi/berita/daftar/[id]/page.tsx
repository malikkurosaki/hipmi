import { investasi_funGetBeritaById } from "@/app_modules/investasi/_fun";
import { Investasi_UiDaftarBerita } from "@/app_modules/investasi/_ui";

export default async function Page({ params }: { params: { id: string } }) {
   const investasiId = params.id;
   const dataBerita = await investasi_funGetBeritaById({ investasiId });

  
  return (
    <>
      <Investasi_UiDaftarBerita dataBerita={dataBerita} />
    </>
  );
}