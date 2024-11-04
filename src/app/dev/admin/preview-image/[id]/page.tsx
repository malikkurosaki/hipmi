import { Admin_UiImagePreview } from "@/app_modules/admin/_admin_global";
import React from "react";

async function Page({ params }: { params: { id: string } }) {
  const fileId = params.id;

  return (
    <>
      <Admin_UiImagePreview fileId={fileId} />
    </>
  );
}

export default Page;
