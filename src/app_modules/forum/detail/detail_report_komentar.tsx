import LayoutGlobal_UI_HeaderTamplate from "@/app_modules/component_global/ui/ui_header_tamplate";
import LayoutGlobal_UI_Tamplate from "@/app_modules/component_global/ui/ui_layout_tamplate";
import { ComponentForum_UiDetailReportKomentar } from "../component/detail_component/ui_report_komentar";


export default function Forum_DetailReportKomentar({
  dataKomentar,
}: {
  dataKomentar: any;
}) {
  return (
    <>
      <LayoutGlobal_UI_Tamplate
        header={<LayoutGlobal_UI_HeaderTamplate title="Report Komentar" />}
      >
        {<ComponentForum_UiDetailReportKomentar dataKomentar={dataKomentar} />}
      </LayoutGlobal_UI_Tamplate>
    </>
  );
}


