"use client";

import { RouterEvent } from "@/app/lib/router_hipmi/router_event";
import ComponentGlobal_CreateButton from "@/app_modules/_global/component/button_create";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import {
  Box,
  Center,
  Loader
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useState } from "react";
import { ComponentEvent_CardBeranda } from "../component/card_view/card_beranda";
import { event_getListAllPublish } from "../fun/get/get_list_all_publish";
import { MODEL_EVENT } from "../model/interface";

export default function Event_Beranda({
  dataEvent,
}: {
  dataEvent: MODEL_EVENT[];
}) {
  const [data, setData] = useState(dataEvent);
  const [activePage, setActivePage] = useState(1);

  useShallowEffect(() => {
    onLoad({
      onPublish(val) {
        setData(val);
      },
    });
  }, [setData]);

  async function onLoad({ onPublish }: { onPublish: (val: any) => void }) {
    const loadData = await event_getListAllPublish({ page: 1 });
    onPublish(loadData);
  }

  return (
    <>
      <Box>
        <ComponentGlobal_CreateButton path={RouterEvent.create} />
        {_.isEmpty(data) ? (
          <ComponentGlobal_IsEmptyData />
        ) : (
          <Box>
            <ScrollOnly
              height="82vh"
              renderLoading={() => (
                <Center mt={"lg"}>
                  <Loader color={"yellow"} />
                </Center>
              )}
              data={data}
              setData={setData}
              moreData={async () => {
                const loadData = await event_getListAllPublish({
                  page: activePage + 1,
                });

                setActivePage((val) => val + 1);

                return loadData;
              }}
            >
              {(item) => <ComponentEvent_CardBeranda data={item} />}
            </ScrollOnly>
          </Box>
        )}
      </Box>
    </>
  );
}
