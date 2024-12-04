"use client";

import { RouterVote } from "@/app/lib/router_hipmi/router_vote";
import { Box, Center, Loader, Stack } from "@mantine/core";
import _ from "lodash";
import { useRouter } from "next/navigation";
import ComponentVote_CardViewPublish from "../../component/card_view_publish";
import ComponentVote_IsEmptyData from "../../component/is_empty_data";
import { MODEL_VOTING } from "../../model/interface";
import { useState } from "react";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import { ScrollOnly } from "next-scroll-loader";
import { Vote_getAllListRiwayatSaya } from "../../fun/get/get_all_list_riwayat_saya";

export default function Vote_RiwayatSaya({
  listRiwayatSaya,
}: {
  listRiwayatSaya: MODEL_VOTING[];
}) {
  const [data, setData] = useState(listRiwayatSaya);
  const [activePage, setActivePage] = useState(1);

  return (
    <>
      {_.isEmpty(data) ? (
        <ComponentGlobal_IsEmptyData />
      ) : (
        // --- Main component --- //
        <Box>
          <ScrollOnly
            height="76vh"
            renderLoading={() => (
              <Center mt={"lg"}>
                <Loader color={"yellow"} />
              </Center>
            )}
            data={data}
            setData={setData}
            moreData={async () => {
              const loadData = await Vote_getAllListRiwayatSaya({
                page: activePage + 1,
              });
              setActivePage((val) => val + 1);

              return loadData;
            }}
          >
            {(item) => (
              <ComponentVote_CardViewPublish
                path={RouterVote.detail_riwayat_saya}
                data={item}
                authorName={true}
              />
            )}
          </ScrollOnly>
        </Box>
      )}
    </>
  );
}
