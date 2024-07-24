"use client";

import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import ComponentDonasi_CardPublish from "../../component/card_view/box_publish";
import { MODEL_DONASI } from "../../model/interface";
import { useState } from "react";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import _ from "lodash";
import { Box } from "@mantine/core";

export default function PostingPublishDonasi({
  listPublish,
}: {
  listPublish: MODEL_DONASI[];
}) {
  const [data, setData] = useState(listPublish);

  return (
    <>
      {_.isEmpty(data) ? (
        <ComponentGlobal_IsEmptyData />
      ) : (
        data.map((e, i) => (
          <Box key={i}>
            <ComponentDonasi_CardPublish
              data={e}
              path={RouterDonasi.detail_publish}
            />
          </Box>
        ))
      )}
    </>
  );

  // return (
  //   <>
  //     <ComponentDonasi_CardPublish dataDonasi={listPublish} path={RouterDonasi.detail_publish} />
  //   </>
  // );
}
