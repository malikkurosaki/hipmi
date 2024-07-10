import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import { Stack, Text } from "@mantine/core";
import { ComponentForum_UiDetailReportPosting } from "../component/detail_component/ui_report_posting";

export default function Forum_DetailReportPosting({
  dataPosting,
}: {
  dataPosting: any;
}) {
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Report Posting" />}
      >
        <ComponentForum_UiDetailReportPosting dataPosting={dataPosting} />
      </UIGlobal_LayoutTamplate>
    </>
  );
}
