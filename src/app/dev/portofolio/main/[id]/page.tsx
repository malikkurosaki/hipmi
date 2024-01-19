import { User_getUserId } from "@/app_modules/fun_global/get_user_token";
import { ViewPortofolio } from "@/app_modules/katalog/portofolio";
import { Portofolio_getOneById } from "@/app_modules/katalog/portofolio/fun/get/get_one_portofolio";

export default async function Page({ params }: { params: { id: string } }) {
  const getPorto = await Portofolio_getOneById(params.id);


  return (
    <>
      {/* {JSON.stringify(getPorto)} */}
      <ViewPortofolio dataPorto={getPorto as any} />
    </>
  );
}
