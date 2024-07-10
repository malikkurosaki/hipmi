import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import { ComponentPortofolio_ButtonMore } from "../component/button_more";

export default function PortofolioLayout({
  children,
  portoId,
  userLoginId,
  authorId,
}: {
  children: any;
  portoId: any;
  userLoginId: string;
  authorId: string;
}) {
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate
            title="Detail Portofolio"
            customButtonRight={
              <ComponentPortofolio_ButtonMore
                portoId={portoId}
                authorId={authorId}
                userLoginId={userLoginId}
              />
            }
          />
        }
      >
        {children}
      </UIGlobal_LayoutTamplate>
    </>
  );
}
