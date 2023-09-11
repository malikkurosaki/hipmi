import { CreateProfileLayout } from "@/app_modules/katalog";

export default function Layout({ children }: { children: any }) {
  return (
    <>
      <CreateProfileLayout>{children}</CreateProfileLayout>
    </>
  );
}
