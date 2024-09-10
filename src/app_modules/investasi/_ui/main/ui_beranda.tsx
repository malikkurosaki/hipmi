"use client";

import mqtt_client from "@/util/mqtt_client";
import { useShallowEffect } from "@mantine/hooks";
import React, { useState } from "react";
import { Investasi_ComponentButtonUpdateBeranda } from "../../_component/main/comp_update_beranda";
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
