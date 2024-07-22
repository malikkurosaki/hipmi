"use client";

import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import { Box } from "@mantine/core";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import _ from "lodash";
import { ComponentDonasi_CardStatus } from "../../component/card_view/card_status";
import { MODEL_DONASI } from "../../model/interface";

export default function PostingReviewDonasi({
  listReview,
}: {
  listReview: MODEL_DONASI[];
}) {
  if (_.isEmpty(listReview)) return <ComponentGlobal_IsEmptyData />;

  return (
    <>
      {listReview.map((e, i) => (
        <Box key={i}>
          <ComponentDonasi_CardStatus
            data={e}
            path={RouterDonasi.detail_review}
          />
        </Box>
      ))}
    </>
  );
}
