"use client";

import { RouterVote } from "@/app/lib/router_hipmi/router_vote";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import { Box, Center, Loader } from "@mantine/core";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useState } from "react";
import ComponentVote_CardViewPublish from "../../component/card_view_publish";
import { vote_getAllListRiwayat } from "../../fun/get/get_all_list_riwayat";
import { MODEL_VOTING } from "../../model/interface";

export default function Vote_SemuaRiwayat({
  listRiwayat,
}: {
  listRiwayat: MODEL_VOTING[];
}) {
  const [data, setData] = useState(listRiwayat);
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
              const loadData = await vote_getAllListRiwayat({
                page: activePage + 1,
              });
              setActivePage((val) => val + 1);

              return loadData;
            }}
          >
            {(item) => (
              <ComponentVote_CardViewPublish
                path={RouterVote.detail_semua_riwayat}
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
