import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import { Map_View } from "@/app_modules/map/view";

const mapboxToken = process.env.MAPBOX_TOKEN!;
export default async function Page() {
  if (!mapboxToken)
    return <ComponentGlobal_IsEmptyData text="Mapbox token not found" />;

  return (
    <>
      <Map_View mapboxToken={mapboxToken} />
    </>
  );
}
