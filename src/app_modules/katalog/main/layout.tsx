"use client";

import LayoutGlobal_UI_HeaderTamplate from "@/app_modules/component_global/ui/ui_header_tamplate";
import LayoutGlobal_UI_Tamplate from "@/app_modules/component_global/ui/ui_layout_tamplate";
import { ComponentKatalog_ButtonHeaderRight } from "../component/button_header_right";

export default function KatalogLayout({
  children,
  profileId,
  userLoginId,
  authorId,
}: {
  children: any;
  profileId: any;
  userLoginId: string;
  authorId: string;
}) {
  return (
    <>
      <LayoutGlobal_UI_Tamplate
        header={
          <LayoutGlobal_UI_HeaderTamplate
            title="KATALOG"
            customButtonRight={
              <ComponentKatalog_ButtonHeaderRight
                profileId={profileId}
                userLoginId={userLoginId}
                authorId={authorId as any}
              />
            }
          />
        }
      >
        {children}
      </LayoutGlobal_UI_Tamplate>
    </>
  );
}
