import { Stack } from "@mantine/core";
import { useState } from "react";
import {
  Investasi_ComponentBoxDetailData,
  Investasi_ComponentBoxHargaDanLembarSaham,
  Investasi_ComponentBoxProgress,
} from "../../_component";
import { MODEL_INVOICE_INVESTASI } from "../../_lib/interface";

export function Investasi_ViewDetailSahamSaya({
  dataSaham,
}: {
  dataSaham: MODEL_INVOICE_INVESTASI;
}) {
  const [data, setData] = useState(dataSaham);

  return (
    <>
      <Stack mb={"lg"}>
        <Investasi_ComponentBoxHargaDanLembarSaham data={data} />
        <Investasi_ComponentBoxProgress progress={data.Investasi.progress} />
        <Investasi_ComponentBoxDetailData data={data} />
      </Stack>
    </>
  );
}
