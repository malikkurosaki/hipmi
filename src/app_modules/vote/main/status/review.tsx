"use client";

import { RouterVote } from "@/app/lib/router_hipmi/router_vote";
import ComponentVote_CardViewStatus from "../../component/card_view_status";
import { MODEL_VOTING } from "../../model/interface";
import { Box, Center, Stack, Text } from "@mantine/core";
import _ from "lodash";
import ComponentVote_IsEmptyData from "../../component/is_empty_data";

export default function Vote_StatusReview({
  listReview,
}: {
  listReview: MODEL_VOTING[];
}) {
  if (_.isEmpty(listReview))
    return <ComponentVote_IsEmptyData text="Tidak ada data" />;


  return (
    <>
      <Stack>
        {listReview.map((e) => (
          <Box key={e.id}>
            <ComponentVote_CardViewStatus
              path={RouterVote.detail_review}
              data={e}
            />
          </Box>
        ))}
      </Stack>
    </>
  );
}
