import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import { UiMap_CustomPin } from "../ui";

const mapboxToken = process.env.MAPBOX_TOKEN!;
export async function Map_CustomPin({ dataMap }: { dataMap: any }) {
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Custom Pin" />}
      >
        <UiMap_CustomPin mapboxToken={mapboxToken} dataMap={dataMap} />
      </UIGlobal_LayoutTamplate>
    </>
  );
}
