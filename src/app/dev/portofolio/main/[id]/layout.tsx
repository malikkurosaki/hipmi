import { user_getOneUserId } from "@/app_modules/fun_global/get_user_token";
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
  const userLoginId = await user_getOneUserId();
  // console.log(userLoginId);
  // console.log(getPorto?.Profile?.User?.id);
  return (
    <>
      <PortofolioLayout
        portoId={portoId}
        userLoginId={userLoginId}
        authorId={getPorto?.Profile?.User?.id as any}
      >
        {children}
      </PortofolioLayout>
    </>
  );
}
