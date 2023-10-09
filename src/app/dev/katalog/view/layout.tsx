import { KatalogLayout } from "@/app_modules/katalog/main";

export default async function Layout({ children }: { children: any }) {
  return (
    <>
      <KatalogLayout>{children}</KatalogLayout>
    </>
  );
}
