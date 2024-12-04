import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";
import { adminMap_funGetAllMaps } from "../fun/fun_get_all_maps";
import { UiAdminMap_MapBoxView } from "../ui";

const mapboxToken = process.env.MAPBOX_TOKEN!;
export async function AdminMap_View() {
  const dataMap = await adminMap_funGetAllMaps();

  return (
    <>
      <ComponentAdminGlobal_HeaderTamplate name="Maps" />
      <UiAdminMap_MapBoxView
        mapboxToken={mapboxToken}
        dataMap={dataMap as any}
      />
    </>
  );
}
