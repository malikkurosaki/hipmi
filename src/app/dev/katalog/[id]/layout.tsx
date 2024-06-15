import { KatalogLayout } from "@/app_modules/katalog/main";

export default async function Layout({ children, params }: { children: any, params: {id: string} }) {
  // const a = atob(params.id.toString())
  return (
    <>
      <KatalogLayout profileId={params.id}>{children}</KatalogLayout>
    </>
  );
}
