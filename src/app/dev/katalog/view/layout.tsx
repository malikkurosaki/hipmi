import { KatalogLayout } from "@/app_modules/katalog/view";

export default async function Layout({ children }: { children: any }) {
  return (
    <>
      <KatalogLayout>{children}</KatalogLayout>
    </>
  );
}
