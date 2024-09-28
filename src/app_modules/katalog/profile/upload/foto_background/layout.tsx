import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";

export default function LayoutProfile_UpdateFotoBackground({
  children,
}: {
  children: any;
}) {
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Update Background" />}
      >
        {children}
      </UIGlobal_LayoutTamplate>
    </>
  );
}
