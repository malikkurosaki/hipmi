import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { ViewPortofolio } from "@/app_modules/katalog/portofolio";
import { portofolio_getOneById } from "@/app_modules/katalog/portofolio/fun/get/get_one_portofolio";

const mapboxToken = process.env.MAPBOX_TOKEN!;
export default async function Page({ params }: { params: { id: string } }) {
  const portofolioId = params.id;
  const dataPortofolio = await portofolio_getOneById(portofolioId);
  const userLoginId = await funGetUserIdByToken();

  return (
    <>
      <ViewPortofolio
        dataPorto={dataPortofolio as any}
        userLoginId={userLoginId as any}
        mapboxToken={mapboxToken}
      />
    </>
  );
}
