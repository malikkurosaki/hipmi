"use client";

import { RouterEvent } from "@/app/lib/router_hipmi/router_event";
import ComponentGlobal_AuthorNameOnHeader from "@/app_modules/_global/author_name_on_header";
import {
  Card,
  Stack,
  Grid,
  Title,
  Text,
  Center,
  Box,
  Loader,
} from "@mantine/core";
import moment from "moment";

import { MODEL_EVENT } from "../../model/interface";
import { useRouter } from "next/navigation";
import _ from "lodash";
import { useState } from "react";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import { ScrollOnly } from "next-scroll-loader";
import ComponentEvent_BoxListStatus from "../../component/box_list_status";
import { event_getAllDraft } from "../../fun/get/status/get_all_draft";
import { ComponentEvent_CardRiwayat } from "../../component/card_view/card_riwayat";
import { event_getListSemuaRiwayat } from "../../fun/get/riwayat/get_list_semua_riwayat";

export default function Event_SemuaRiwayat({
  listData,
}: {
  listData: MODEL_EVENT[];
}) {
  const router = useRouter();
  const [data, setData] = useState(listData);
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
              const loadData = await event_getListSemuaRiwayat({
                page: activePage + 1,
              });
              setActivePage((val) => val + 1);

              return loadData;
            }}
          >
            {(item) => <ComponentEvent_CardRiwayat data={item} />}
          </ScrollOnly>
        </Box>
      )}
    </>
  );
}
