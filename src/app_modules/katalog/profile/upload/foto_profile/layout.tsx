import UIGlobal_LayoutHeaderTamplate from "@/app_modules/component_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/component_global/ui/ui_layout_tamplate";

export default function UploadFotoProfileLayout({
  children,
}: {
  children: any;
}) {
 

  return (
    <>
      <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Update Foto" />}
      >
        {children}
      </UIGlobal_LayoutTamplate>
    </>
  );
}
