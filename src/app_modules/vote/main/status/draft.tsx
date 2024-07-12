"use client";

import { RouterVote } from "@/app/lib/router_hipmi/router_vote";
import { Box, Center, Loader, Stack } from "@mantine/core";
import _ from "lodash";
import ComponentVote_CardViewStatus from "../../component/card_view_status";
import ComponentVote_IsEmptyData from "../../component/is_empty_data";
import { MODEL_VOTING } from "../../model/interface";
import { useState } from "react";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import { ScrollOnly } from "next-scroll-loader";
import { vote_getAllReview } from "../../fun/get/status/get_all_review";
import { vote_getAllDraft } from "../../fun/get/status/get_all_draft";

export default function Vote_StatusDraft({
  listDraft,
}: {
  listDraft: MODEL_VOTING[];
}) {
  const [data, setData] = useState(listDraft);
  const [activePage, setActivePage] = useState(1);

  return (
    <>
      {_.isEmpty(data) ? (
        <ComponentGlobal_IsEmptyData />
      ) : (
        // --- Main component --- //
        <Box>
          <ScrollOnly
            height="75vh"
            renderLoading={() => (
              <Center mt={"lg"}>
                <Loader color={"yellow"} />
              </Center>
            )}
            data={data}
            setData={setData}
            moreData={async () => {
              const loadData = await vote_getAllDraft({
                page: activePage + 1,
              });
              setActivePage((val) => val + 1);

              return loadData;
            }}
          >
            {(item) => (
              <ComponentVote_CardViewStatus
                data={item}
                path={RouterVote.detail_draft}
              />
            )}
          </ScrollOnly>
        </Box>
      )}
    </>
  );
}
