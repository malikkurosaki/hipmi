"use client";

import { RouterEvent } from "@/app/lib/router_hipmi/router_event";
import {
  ActionIcon,
  Affix,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Center,
  Divider,
  Grid,
  Group,
  Image,
  Loader,
  Paper,
  Skeleton,
  Stack,
  Text,
  Title,
  rem,
} from "@mantine/core";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MODEL_EVENT } from "../model/interface";
import ComponentEvent_BoxListStatus from "../component/box_list_status";
import { RouterProfile } from "@/app/lib/router_hipmi/router_katalog";
import ComponentGlobal_AuthorNameOnHeader from "@/app_modules/_global/author_name_on_header";
import _ from "lodash";
import { IconCirclePlus, IconPencilPlus } from "@tabler/icons-react";
import ComponentEvent_IsEmptyData from "../component/is_empty_data";
import { useShallowEffect, useWindowScroll } from "@mantine/hooks";
import ComponentGlobal_CardLoadingOverlay from "@/app_modules/_global/loading_card";
import { event_getListAllPublish } from "../fun/get/get_list_all_publish";
import ComponentGlobal_CreateButton from "@/app_modules/_global/component/button_create";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import { RouterVote } from "@/app/lib/router_hipmi/router_vote";
import ComponentVote_CardViewPublish from "@/app_modules/vote/component/card_view_publish";
import { vote_getAllListPublish } from "@/app_modules/vote/fun/get/get_all_list_publish";
import { ScrollOnly } from "next-scroll-loader";
import { ComponentEvent_CardBeranda } from "../component/card_view/card_beranda";

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
