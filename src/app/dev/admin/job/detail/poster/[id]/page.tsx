import { AdminJob_DetailPoster } from "@/app_modules/admin/job";

export default async function Page({ params }: { params: { id: string } }) {
  const imageId = params.id;
  return (
    <>
      <AdminJob_DetailPoster imageId={imageId} />
    </>
  );
}
