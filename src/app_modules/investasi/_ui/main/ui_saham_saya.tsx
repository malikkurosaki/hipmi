"use client";

import { Investasi_ViewSahamSaya } from "../../_view";

export function Investasi_UiSahamSaya({ dataSaham }: { dataSaham: any[] }) {
  return (
    <>
      <Investasi_ViewSahamSaya dataSaham={dataSaham} />
    </>
  );
}
