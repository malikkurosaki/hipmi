"use client";

import { RouterVote } from "@/app/lib/router_hipmi/router_vote";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import { Box, Center, Loader } from "@mantine/core";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useState } from "react";
import ComponentVote_CardViewStatus from "../../component/card_view_status";
import { vote_getAllReject } from "../../fun/get/status/get_all_reject";
import { MODEL_VOTING } from "../../model/interface";

export default function Vote_StatusReject({
  listReject,
}: {
  listReject: MODEL_VOTING[];
}) {
  const [data, setData] = useState(listReject);
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
              const loadData = await vote_getAllReject({
                page: activePage + 1,
              });
              setActivePage((val) => val + 1);

              return loadData;
            }}
          >
            {(item) => (
              <ComponentVote_CardViewStatus
                data={item}
                path={RouterVote.detail_reject}
              />
            )}
          </ScrollOnly>
        </Box>
      )}
    </>
  );
}
