"use client";

import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import ComponentDonasi_ListKabar from "@/app_modules/donasi/component/detail_main/list_kabar";
import { MODEL_DONASI_KABAR } from "@/app_modules/donasi/model/interface";
import { Box } from "@mantine/core";
import _ from "lodash";
import { useState } from "react";

export default function KabarDonasi({
  listKabar,
}: {
  listKabar: MODEL_DONASI_KABAR[];
}) {

  const [kabar, setKabar] = useState(listKabar);

  if (_.isEmpty(kabar)) return <ComponentGlobal_IsEmptyData />;

  return (
    <>
      {kabar.map((e, i) => (
        <Box key={i}>
          <ComponentDonasi_ListKabar
            kabar={e}
            route={RouterDonasi.detail_kabar}
          />
        </Box>
      ))}
    </>
  );
}
