import { PortofolioLayout } from "@/app_modules/katalog/portofolio";
import { getOnePortofolio } from "@/app_modules/katalog/portofolio/fun/get_one_portofolio";

export default async function Layout({ children, params }: { children: any, params: {id: string} }) {
  const getPorto = await getOnePortofolio(params.id)


  return (
    <>
      <PortofolioLayout profileId={getPorto?.profileId}>{children}</PortofolioLayout>
    </>
  );
}
