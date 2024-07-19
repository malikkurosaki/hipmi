"use client";

import { RouterVote } from "@/app/lib/router_hipmi/router_vote";
import ComponentVote_CardViewStatus from "../../component/card_view_status";
import { MODEL_VOTING } from "../../model/interface";
import { Box, Center, Loader, Stack, Text } from "@mantine/core";
import _ from "lodash";
import ComponentVote_IsEmptyData from "../../component/is_empty_data";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import job_getAllStatusPublish from "@/app_modules/job/fun/get/status/get_list_publish";
import { ScrollOnly } from "next-scroll-loader";
import { useState } from "react";
import ComponentVote_CardViewPublish from "../../component/card_view_publish";
import { vote_getAllReview } from "../../fun/get/status/get_all_review";

export default function Vote_StatusReview({
  listReview,
}: {
  listReview: MODEL_VOTING[];
}) {
  const [data, setData] = useState(listReview);
  const [activePage, setActivePage] = useState(1);

  return (
    <>
      {_.isEmpty(data) ? (
        <ComponentGlobal_IsEmptyData />
      ) : (
        // --- Main component --- //
        <Box >
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
              const loadData = await vote_getAllReview({
                page: activePage + 1,
              });
              setActivePage((val) => val + 1);

              return loadData;
            }}
          >
            {(item) => (
              <ComponentVote_CardViewStatus
                data={item}
                path={RouterVote.detail_review}
              />
            )}
          </ScrollOnly>
        </Box>
      )}
    </>
  );
}
