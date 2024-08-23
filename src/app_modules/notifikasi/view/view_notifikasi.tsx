import UIGlobal_LayoutHeaderTamplate from "../../_global/ui/ui_header_tamplate";
import { Notifikasi_UiLayout, Notifikasi_UiView } from "../ui";

export default function Notifikasi_MainView({
  listNotifikasi,
  masterKategori,
}: {
  listNotifikasi: any[];
  masterKategori: any[];
}) {
  return (
    <>
      <Notifikasi_UiLayout
        header={<UIGlobal_LayoutHeaderTamplate title="Notifikasi" />}
      >
        <Notifikasi_UiView
          listNotifikasi={listNotifikasi}
          masterKategori={masterKategori}
        />
      </Notifikasi_UiLayout>
    </>
  );
}
