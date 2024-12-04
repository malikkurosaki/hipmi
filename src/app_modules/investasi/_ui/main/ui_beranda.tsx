"use client";

import { MODEL_INVESTASI } from "../../_lib/interface";
import { Investasi_ViewBeranda } from "../../_view";

export function Investasi_UiBeranda({
  dataInvestasi,
}: {
  dataInvestasi: MODEL_INVESTASI[];
}) {
  return (
    <>
      <Investasi_ViewBeranda dataInvestasi={dataInvestasi} />
    </>
  );
}
