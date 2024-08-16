import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import { UiMap_CreatePin } from "../ui/ui_create_pin";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";

const mapboxToken = process.env.MAPBOX_TOKEN!;
export async function Map_CreateNewPin({
  portofolioId,
}: {
  portofolioId: string;
}) {
  if (!mapboxToken)
    return <ComponentGlobal_IsEmptyData text="Mapbox token not found" />;

  return (
    <>
      <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate title="Tambah Pin" hideButtonLeft />
        }
      >
        <UiMap_CreatePin
          mapboxToken={mapboxToken}
          portofolioId={portofolioId}
        />
      </UIGlobal_LayoutTamplate>
    </>
  );
}
