import { PortofolioLayout } from "@/app_modules/katalog/portofolio";

export default async function Layout({ children }: { children: any }) {
  return (
    <>
      <PortofolioLayout>{children}</PortofolioLayout>
    </>
  );
}
