import { Donasi_CreateKabar } from "@/app_modules/donasi";

export default async function Page({ params }: { params: { id: string } }) {
  const donasiId = params.id;
  return (
    <>
      <Donasi_CreateKabar donasiId={donasiId} />
    </>
  );
}
