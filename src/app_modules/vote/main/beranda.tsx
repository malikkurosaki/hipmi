"use client";

import { RouterVote } from "@/app/lib/router_hipmi/router_vote";
import {
  ActionIcon,
  Affix,
  Box,
  Center,
  Loader,
  Stack,
  rem,
} from "@mantine/core";
import { useShallowEffect, useWindowScroll } from "@mantine/hooks";
import { IconPencilPlus } from "@tabler/icons-react";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ComponentVote_CardViewPublish from "../component/card_view_publish";
import ComponentVote_IsEmptyData from "../component/is_empty_data";
import { vote_getAllListPublish } from "../fun/get/get_all_list_publish";
import { MODEL_VOTING } from "../model/interface";
import ComponentGlobal_CreateButton from "@/app_modules/_global/component/button_create";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import job_getAllStatusPublish from "@/app_modules/job/fun/get/status/get_list_publish";
import { ScrollOnly } from "next-scroll-loader";

export default function Vote_Beranda({
  dataVote,
}: {
  dataVote: MODEL_VOTING[];
}) {
  const [data, setData] = useState(dataVote);

  useShallowEffect(() => {
    onLoad({
      setData(val) {
        setData(val);
      },
    });
  }, [setData]);

  async function onLoad({ setData }: { setData: (val: any) => void }) {
    const loadData = await vote_getAllListPublish({ page: 1 });
    setData(loadData);
  }

  const [activePage, setActivePage] = useState(1);

  return (
    <>
      {_.isEmpty(data) ? (
        <ComponentGlobal_IsEmptyData />
      ) : (
        // --- Main component --- //
        <ScrollOnly
          height="85vh"
          renderLoading={() => (
            <Center mt={"lg"}>
              <Loader color={"yellow"} />
            </Center>
          )}
          data={data}
          setData={setData}
          moreData={async () => {
            const loadData = await vote_getAllListPublish({
              page: activePage + 1,
            });

            setActivePage((val) => val + 1);

            return loadData;
          }}
        >
          {(item) => (
            <ComponentVote_CardViewPublish
              data={item}
              path={RouterVote.main_detail}
              authorName={true}
            />
          )}
        </ScrollOnly>
      )}
    </>
  );
}
