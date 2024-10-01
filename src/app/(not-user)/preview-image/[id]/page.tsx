import { UIGlobal_ImagePreview, UIGlobal_NotUserImagePreview } from "@/app_modules/_global/ui";

export default async function Page({ params }: { params: { id: string } }) {
  const fileId = params.id;
  return (
    <>
      <UIGlobal_NotUserImagePreview fileId={fileId} />
    </>
  );
}
