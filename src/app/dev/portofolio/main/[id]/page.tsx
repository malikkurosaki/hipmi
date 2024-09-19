import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { ViewPortofolio } from "@/app_modules/katalog/portofolio";
import { portofolio_getOneById } from "@/app_modules/katalog/portofolio/fun/get/get_one_portofolio";

const mapboxToken = process.env.MAPBOX_TOKEN!;
export default async function Page({ params }: { params: { id: string } }) {
  const getPorto = await portofolio_getOneById(params.id);
  const userLoginId = await funGetUserIdByToken();

  return (
    <>
      {/* <pre style={{ color: "white" }}>{JSON.stringify(getPorto, null, 2)}</pre> */}
      <ViewPortofolio
        dataPorto={getPorto as any}
        userLoginId={userLoginId as any}
        mapboxToken={mapboxToken}
      />
    </>
  );
}
