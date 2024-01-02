import { UploadFotoProfileLayout } from "@/app_modules/katalog/profile";
import { AppShell } from "@mantine/core";

export default function Layout({ children, params }: { children: any, params: {id: string} }) {

  return (
    <>

    <UploadFotoProfileLayout profileId={params.id}>{children}</UploadFotoProfileLayout>

    </>
  );
}
