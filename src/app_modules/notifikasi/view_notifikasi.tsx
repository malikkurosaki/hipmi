import UIGlobal_LayoutHeaderTamplate from "../component_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "../component_global/ui/ui_layout_tamplate";
import { Notifikasi_UiView } from "./component/ui_notifiaksi";

export default function Notifikasi_MainView({
  listNotifikasi,
}: {
  listNotifikasi: any[];
}) {
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Notifikasi" />}
      >
        <Notifikasi_UiView listNotifikasi={listNotifikasi} />
      </UIGlobal_LayoutTamplate>
    </>
  );
}
