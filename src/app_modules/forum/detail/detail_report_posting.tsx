import LayoutGlobal_UI_HeaderTamplate from "@/app_modules/component_global/ui/ui_header_tamplate";
import LayoutGlobal_UI_Tamplate from "@/app_modules/component_global/ui/ui_layout_tamplate";
import { Stack, Text } from "@mantine/core";
import { ComponentForum_UiDetailReportPosting } from "../component/detail_component/ui_report_posting";

export default function Forum_DetailReportPosting({
  dataPosting,
}: {
  dataPosting: any;
}) {
  return (
    <>
      <LayoutGlobal_UI_Tamplate
        header={<LayoutGlobal_UI_HeaderTamplate title="Report Posting" />}
      >
        <ComponentForum_UiDetailReportPosting dataPosting={dataPosting} />
      </LayoutGlobal_UI_Tamplate>
    </>
  );
}
