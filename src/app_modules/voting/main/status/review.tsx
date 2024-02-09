"use client";

import { RouterVote } from "@/app/lib/router_hipmi/router_vote";
import ComponentVote_CardViewStatus from "../../component/card_view_status";
import { MODEL_VOTING } from "../../model/interface";
import { Box, Stack } from "@mantine/core";

export default function Vote_StatusReview({
  listReview,
}: {
  listReview: MODEL_VOTING[];
}) {
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
