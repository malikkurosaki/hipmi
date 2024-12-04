import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { PortofolioLayout } from "@/app_modules/katalog/portofolio";
import { portofolio_getOneById } from "@/app_modules/katalog/portofolio/fun/get/get_one_portofolio";

export default async function Layout({
  children,
  params,
}: {
  children: any;
  params: { id: string };
}) {
  let portoId = params.id;
  const getPorto = await portofolio_getOneById(portoId);
  const userLoginId = await funGetUserIdByToken();

  return (
    <>
      <PortofolioLayout
        portoId={portoId}
        userLoginId={userLoginId as string}
        authorId={getPorto?.Profile?.User?.id as any}
      >
        {children}
      </PortofolioLayout>
    </>
  );
}
