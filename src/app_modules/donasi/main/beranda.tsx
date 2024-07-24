"use client";

import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import { ActionIcon, Affix, Box, rem } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { IconPencilPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ComponentDonasi_CardPublish from "../component/card_view/box_publish";
import { MODEL_DONASI } from "../model/interface";
import ComponentGlobal_CreateButton from "@/app_modules/_global/component/button_create";
import _ from "lodash";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";

export default function MainDonasi({
  listDonasi,
}: {
  listDonasi: MODEL_DONASI[];
}) {
  const [data, setData] = useState(listDonasi);

  return (
    <>
      <Box>
        <ComponentGlobal_CreateButton path={RouterDonasi.create_donasi} />
        {_.isEmpty(data) ? (
          <ComponentGlobal_IsEmptyData />
        ) : (
          data.map((e, i) => (
            <Box key={i}>
              <ComponentDonasi_CardPublish
                data={e as any}
                path={RouterDonasi.detail_main}
              />
            </Box>
          ))
        )}
      </Box>
    </>
  );
}
