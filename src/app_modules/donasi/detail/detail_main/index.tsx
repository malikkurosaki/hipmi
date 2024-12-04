"use client";

import { Stack } from "@mantine/core";
import ComponentDonasi_CeritaPenggalangMain from "../../component/detail_main/cerita_penggalang";
import { ComponentDonasi_DetailDataMain } from "../../component/detail_main/detail_data_donasi";
import ComponentDonasi_InformasiPenggalangMain from "../../component/detail_main/informasi_penggalang";
import { MODEL_DONASI } from "../../model/interface";

export default function DetailMainDonasi({
  dataDonasi,
  countDonatur,
  userLoginId,
}: {
  dataDonasi: MODEL_DONASI;
  countDonatur: number;
  userLoginId: string;
}) {
  return (
    <>
      <Stack spacing={40} py={"md"}>
        <ComponentDonasi_DetailDataMain
          donasi={dataDonasi}
          countDonatur={countDonatur}
          userLoginId={userLoginId}
        />
        <ComponentDonasi_InformasiPenggalangMain author={dataDonasi.Author} />
        <ComponentDonasi_CeritaPenggalangMain donasi={dataDonasi} />
      </Stack>
    </>
  );
}
