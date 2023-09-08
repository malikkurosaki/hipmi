import { KatalogLayout } from "@/app_modules/katalog";

export default function LayoutKatalog({ children }: { children: any }) {
  return (
    <>
      <KatalogLayout>{children}</KatalogLayout>
    </>
  );
}
