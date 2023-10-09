import { UploadFotoProfileLayout } from "@/app_modules/katalog/profile";
import { AppShell } from "@mantine/core";

export default function Layout({ children }: { children: any }) {
  return (
    <>
    <UploadFotoProfileLayout>{children}</UploadFotoProfileLayout>
    </>
  );
}
