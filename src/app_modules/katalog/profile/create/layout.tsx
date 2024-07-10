
import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";

export default function ProfileLayout({ children }: { children: any }) {
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Buat Profile" />}
      >
        {children}
      </UIGlobal_LayoutTamplate>
    </>
  );
}
