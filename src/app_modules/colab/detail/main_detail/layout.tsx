"use client";

import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import React from "react";

export default function LayoutColab_MainDetail({
  children,
  colabId,
  isAuthor,
}: {
  children: React.ReactNode;
  colabId: string;
  isAuthor: boolean;
}) {
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate
            title="Detail"
            // icon={isAuthor ? <IconEdit /> : ""}
            // route2={isAuthor ? RouterColab.edit + colabId : ""}
          />
        }
      >
        {children}
      </UIGlobal_LayoutTamplate>
    </>
  );
}
