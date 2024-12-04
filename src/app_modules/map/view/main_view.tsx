import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import { ComponentMap_Header } from "../_component";
import { UiMap_MapBoxView } from "../ui";

export async function Map_View({
  dataMap,
  mapboxToken,
}: {
  dataMap: any[];
  mapboxToken: string;
}) {
  return (
    <>
      <UIGlobal_LayoutTamplate header={<ComponentMap_Header />}>
        <UiMap_MapBoxView mapboxToken={mapboxToken} dataMap={dataMap as any} />
      </UIGlobal_LayoutTamplate>
    </>
  );
}
