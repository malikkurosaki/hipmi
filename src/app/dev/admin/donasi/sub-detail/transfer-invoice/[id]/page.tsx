import { AdminDonasi_BuktiTransfer } from "@/app_modules/admin/donasi";

export default async function Page({ params }: { params: { id: string } }) {
  let imageId = params.id;
  return (
    <>
      <AdminDonasi_BuktiTransfer imageId={imageId} />
    </>
  );
}
