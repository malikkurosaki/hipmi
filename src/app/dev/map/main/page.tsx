import { map_funGetAllMap } from "@/app_modules/map/fun/get/fun_get_all_map";
import { Map_View } from "@/app_modules/map/view";

const mapboxToken = process.env.MAPBOX_TOKEN!;
export default async function Page() {
  const dataMap = await map_funGetAllMap();

  return (
    <>
      <Map_View mapboxToken={mapboxToken} dataMap={dataMap} />
    </>
  );
}
