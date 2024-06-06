import { AdminDonasi_BuktiTransferPencairan } from "@/app_modules/admin/donasi";

export default async function Page({ params }: { params: { id: string } }) {
  let imagaId = params.id;
  return (
    <>
      <AdminDonasi_BuktiTransferPencairan imageId={imagaId} />
    </>
  );
}
