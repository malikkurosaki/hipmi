"use client";

import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import { gs_job_hot_menu, gs_job_status } from "@/app_modules/job/global_state";
import { Box, Center } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useAtom } from "jotai";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useState } from "react";
import notifikasi_getByUserId from "../fun/get/get_notifiaksi_by_id";
import { MODEL_NOTIFIKASI } from "../model/interface";
import { ComponentNotifiaksi_CardView } from "./card_view";
import {
  gs_vote_hotMenu,
  gs_vote_status,
} from "@/app_modules/vote/global_state";
import {
  gs_event_hotMenu,
  gs_event_status,
} from "@/app_modules/event/global_state";
import {
  gs_donasi_hot_menu,
  gs_donasi_tabs_posting,
} from "@/app_modules/donasi/global_state";

export function Notifikasi_UiView({
  listNotifikasi,
}: {
  listNotifikasi: MODEL_NOTIFIKASI[];
}) {
  const [data, setData] = useState(listNotifikasi);
  const [activePage, setActivePage] = useState(1);

  // JOB
  const [jobMenuId, setJobMenuId] = useAtom(gs_job_hot_menu);
  const [jobStatus, setJobStatus] = useAtom(gs_job_status);
  const [voteMenu, setVoteMenu] = useAtom(gs_vote_hotMenu);
  const [voteStatus, setVoteStatus] = useAtom(gs_vote_status);
  const [eventMenu, setEventMenu] = useAtom(gs_event_hotMenu);
  const [eventStatus, setEventStatus] = useAtom(gs_event_status);
  const [donasiMenu, setDonasiMenu] = useAtom(gs_donasi_hot_menu);
  const [donasiStatus, setDonasiStatus] = useAtom(gs_donasi_tabs_posting);

  // useShallowEffect(() => {
  //   onLoadData({
  //     onLoad(val) {
  //       setData(val);
  //     },
  //   });
  // }, []);

  // async function onLoadData({ onLoad }: { onLoad: (val: any) => void }) {
  //   const loadData = await notifikasi_getByUserId({ page: 1 });
  //   onLoad(loadData);
  // }

  return (
    <>
      <Box>
        {_.isEmpty(data) ? (
          <ComponentGlobal_IsEmptyData text="Tidak ada pemberitahuan" />
        ) : (
          <ScrollOnly
            height="92vh"
            renderLoading={() => (
              <Center mt={"lg"}>
                <ComponentGlobal_Loader />
              </Center>
            )}
            data={data}
            setData={setData}
            moreData={async () => {
              const loadData = await notifikasi_getByUserId({
                page: activePage + 1,
              });
              setActivePage((val) => val + 1);

              return loadData;
            }}
          >
            {(item) => (
              <ComponentNotifiaksi_CardView
                data={item}
                onLoadData={setData}
                activePage={activePage}
                onSetMenu={(val) => {
                  if (item?.kategoriApp === "JOB") {
                    setJobMenuId(val.menuId);
                    setJobStatus(val.status);
                  }

                  if (item?.kategoriApp === "VOTING") {
                    setVoteMenu(val.menuId);
                    setVoteStatus(val.status);
                  }

                  if (item?.kategoriApp === "EVENT") {
                    setEventMenu(val.menuId);
                    setEventStatus(val.status);
                  }

                  if (item?.kategoriApp === "DONASI") {
                    setDonasiMenu(val.menuId);
                    setDonasiStatus(val.status);
                  }
                }}
              />
            )}
          </ScrollOnly>
        )}
      </Box>
    </>
  );
}
