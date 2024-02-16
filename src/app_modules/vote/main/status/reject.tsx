"use client";

import { RouterVote } from "@/app/lib/router_hipmi/router_vote";
import ComponentVote_CardViewStatus from "../../component/card_view_status";
import { MODEL_VOTING } from "../../model/interface";
import { Box, Stack } from "@mantine/core";
import ComponentVote_IsEmptyData from "../../component/is_empty_data";
import _ from "lodash";

export default function Vote_StatusReject({
  listReject,
}: {
  listReject: MODEL_VOTING[];
}) {
  if (_.isEmpty(listReject))
    return <ComponentVote_IsEmptyData text="Tidak ada review" />;
  return (
    <>
      <Stack>
        {listReject.map((e) => (
          <Box key={e.id}>
            <ComponentVote_CardViewStatus
              path={RouterVote.detail_reject}
              data={e}
            />
          </Box>
        ))}
      </Stack>
    </>
  );
}
