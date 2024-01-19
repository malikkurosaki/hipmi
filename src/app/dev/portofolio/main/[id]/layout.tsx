import { PortofolioLayout } from "@/app_modules/katalog/portofolio";
import { Portofolio_getOneById } from "@/app_modules/katalog/portofolio/fun/get/get_one_portofolio";

export default async function Layout({ children, params }: { children: any, params: {id: string} }) {
  let portoId = params.id
  const getPorto = await Portofolio_getOneById(portoId)


  return (
    <>
      <PortofolioLayout portoId={portoId}>{children}</PortofolioLayout>
    </>
  );
}
