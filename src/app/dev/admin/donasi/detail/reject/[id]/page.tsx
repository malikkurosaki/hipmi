import { AdminDonasi_DetailReject } from "@/app_modules/admin/donasi";
import { AdminDonasi_getById } from "@/app_modules/admin/donasi/fun/get/get_one_by_id";

export default async function Page({ params }: { params: { id: string } }) {
  const dataReject = await AdminDonasi_getById(params.id);

  return (
    <>
      <AdminDonasi_DetailReject dataReject={dataReject as any} />
    </>
  );
}
