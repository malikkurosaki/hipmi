import { Investasi_UiFileViewDokumen } from "@/app_modules/investasi/_ui";

export default async function Page({ params }: { params: { id: string } }) {
  const dokumenId = params.id;

  return (
    <>
      <Investasi_UiFileViewDokumen dokumenId={dokumenId} />
    </>
  );
}
