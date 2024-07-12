"use client";

import { RouterVote } from "@/app/lib/router_hipmi/router_vote";
import { Box, Center, Loader, Stack } from "@mantine/core";
import _ from "lodash";
import { useRouter } from "next/navigation";
import ComponentVote_CardViewPublish from "../../component/card_view_publish";
import ComponentVote_IsEmptyData from "../../component/is_empty_data";
import { MODEL_VOTING } from "../../model/interface";
import { RouterJob } from "@/app/lib/router_hipmi/router_job";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import ComponentJob_CardStatus from "@/app_modules/job/component/card/card_view";
import job_getAllStatusPublish from "@/app_modules/job/fun/get/status/get_list_publish";
import { ScrollOnly } from "next-scroll-loader";
import { useState } from "react";

export default function Vote_StatusPublish({
  listPublish,
}: {
  listPublish: MODEL_VOTING[];
}) {
  const [data, setData] = useState(listPublish);
  const [activePage, setActivePage] = useState(1);

  return (
    <>
      {_.isEmpty(data) ? (
        <ComponentGlobal_IsEmptyData />
      ) : (
        // --- Main component --- //
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
            const loadData = await job_getAllStatusPublish({
              page: activePage + 1,
            });

            setActivePage((val) => val + 1);

            return loadData;
          }}
        >
          {(item) => (
            <ComponentVote_CardViewPublish
              data={item}
              path={RouterVote.detail_publish}
            />
          )}
        </ScrollOnly>
      )}
    </>
  );
}
