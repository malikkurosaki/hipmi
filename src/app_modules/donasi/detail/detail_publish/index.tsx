"use client";

import {
  Stack
} from "@mantine/core";
import { useState } from "react";
import ComponentDonasi_CeritaPenggalangMain from "../../component/detail_main/cerita_penggalang";
import { ComponentDonasi_DetailDataMain } from "../../component/detail_main/detail_data_donasi";
import ComponentDonasi_InformasiPenggalangMain from "../../component/detail_main/informasi_penggalang";
import { MODEL_DONASI } from "../../model/interface";

export default function DetailPublishDonasi({
  dataPublish,
  countDonatur,
  userLoginId
}: {
  dataPublish: MODEL_DONASI;
  countDonatur: number,
  userLoginId: string
}) {
  const [donasi, setDonasi] = useState(dataPublish);
  return (
    <>
      {/* <pre>{JSON.stringify(donasi,null,2)}</pre> */}
      <Stack spacing={40}>
        <ComponentDonasi_DetailDataMain donasi={donasi} countDonatur={countDonatur} userLoginId={userLoginId}/>
        <ComponentDonasi_InformasiPenggalangMain author={donasi.Author}/>
        <ComponentDonasi_CeritaPenggalangMain donasi={donasi} />
      </Stack>
    </>
  );
}


