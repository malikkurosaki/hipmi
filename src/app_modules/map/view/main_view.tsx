import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import { ComponentMap_Header } from "../_component";
import { UiMap_MapBoxView } from "../ui";
import { map_funGetAllMap } from "../fun/get/fun_get_all_map";

export async function Map_View({ mapboxToken }: { mapboxToken: string }) {
  const dataMap = await map_funGetAllMap();
  
  return (
    <>
      <UIGlobal_LayoutTamplate header={<ComponentMap_Header />}>
        <UiMap_MapBoxView mapboxToken={mapboxToken} dataMap={dataMap as any} />
      </UIGlobal_LayoutTamplate>
    </>
  );
}
