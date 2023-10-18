import { ViewPortofolio } from "@/app_modules/katalog/portofolio";
import { getOnePortofolio } from "@/app_modules/katalog/portofolio/fun/get_one_portofolio";

export default async function Page({params}: {params: {id: string}}) {

  const getPorto = await getOnePortofolio(params.id)
  // console.log(getPorto)

  return (
    <>
    {/* {JSON.stringify(getPorto)} */}
      <ViewPortofolio dataPorto={getPorto as any} />
    </>
  );
}
