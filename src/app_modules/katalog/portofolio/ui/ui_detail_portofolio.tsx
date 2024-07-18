"use client";

import {
  Stack
} from "@mantine/core";
import { ComponentPortofolio_ButtonDelete } from "../component/button_delete";
import { MODEL_PORTOFOLIO } from "../model/interface";
import { Portofolio_UiDetailData } from "./ui_detail_data";
import { Portofolio_UiDetailLogo } from "./ui_detail_logo";
import { Portofolio_UiSosialMedia } from "./ui_detail_media";

export default function Portofolio_UiDetail({
  dataPorto,
  userLoginId,
}: {
  dataPorto: MODEL_PORTOFOLIO;
  userLoginId: string;
}) {

  return (
    <>
      <Stack mb={"lg"}>
        <Portofolio_UiDetailData dataPorto={dataPorto} />
        <Portofolio_UiDetailLogo dataPorto={dataPorto} />
        <Portofolio_UiSosialMedia dataPorto={dataPorto} />

        <ComponentPortofolio_ButtonDelete
          dataPorto={dataPorto}
          userLoginId={userLoginId}
        />
      </Stack>
    </>
  );
}
