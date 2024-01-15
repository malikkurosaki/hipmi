import { AdminDonasi_PencairanDana } from "@/app_modules/admin/donasi";

export default async function Page({ params }: { params: { id: string } }) {
  let donasiId = params.id;
  return <AdminDonasi_PencairanDana donasiId={donasiId} />;
}
