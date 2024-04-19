import { user_getOneUserId } from "@/app_modules/fun_global/get_user_token";
import { ViewPortofolio } from "@/app_modules/katalog/portofolio";
import { portofolio_getOneById } from "@/app_modules/katalog/portofolio/fun/get/get_one_portofolio";

export default async function Page({ params }: { params: { id: string } }) {
  const getPorto = await portofolio_getOneById(params.id);
  const userLoginId = await user_getOneUserId()



  return (
    <>
      {/* {JSON.stringify(getPorto)} */}
      <ViewPortofolio dataPorto={getPorto as any} userLoginId={userLoginId as any} />
    </>
  );
}
