import LayoutGlobal_UI_HeaderTamplate from "../component_global/ui/ui_header_tamplate";
import LayoutGlobal_UI_Tamplate from "../component_global/ui/ui_layout_tamplate";
import { Notifikasi_UiView } from "./component/ui_notifiaksi";

export default function Notifikasi_MainView({
  listNotifikasi,
}: {
  listNotifikasi: any[];
}) {
  return (
    <>
      <LayoutGlobal_UI_Tamplate
        header={<LayoutGlobal_UI_HeaderTamplate title="Notifikasi" />}
      >
        <Notifikasi_UiView listNotifikasi={listNotifikasi} />
      </LayoutGlobal_UI_Tamplate>
    </>
  );
}
