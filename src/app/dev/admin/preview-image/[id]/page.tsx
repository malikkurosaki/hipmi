import { Admin_ComponentPreviewImageAdmin } from "@/app_modules/admin/_admin_global/comp_preview_image_admin";

async function Page({ params }: { params: { id: string } }) {
  const fileId = params.id;

  return (
    <>
      <Admin_ComponentPreviewImageAdmin fileId={fileId} />
    </>
  );
}

export default Page;
