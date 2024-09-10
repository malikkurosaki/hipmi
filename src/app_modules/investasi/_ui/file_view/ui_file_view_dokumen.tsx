"use client";

import { RouterInvestasi_OLD } from "@/app/lib/router_hipmi/router_investasi";
import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import { IconX } from "@tabler/icons-react";
import dynamic from "next/dynamic";
const PdfToImage = dynamic(
  () =>
    import("../../_view/file_view/view_file_viewer").then((mod) => mod.default),
  { ssr: false }
);

export function Investasi_UiFileViewDokumen({
  dokumenId,
}: {
  dokumenId: string;
}) {
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="" iconLeft={<IconX/>} />}
      >
        <PdfToImage
          id={dokumenId}
          path={RouterInvestasi_OLD.api_file_dokumen}
        />
      </UIGlobal_LayoutTamplate>
    </>
  );
}
