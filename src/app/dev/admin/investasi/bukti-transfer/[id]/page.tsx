import { AdminInvestasi_DetailBuktiTransfer } from "@/app_modules/admin/investasi/detail";

export default async function Page({ params }: { params: { id: string } }) {
  const imageId = params.id;
  return (
    <>
      <AdminInvestasi_DetailBuktiTransfer imageId={imageId} />
    </>
  );
}
