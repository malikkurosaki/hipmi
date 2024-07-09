"use client";

import ComponentGlobal_IsEmptyData from "@/app_modules/component_global/is_empty_data";
import ComponentGlobal_UI_Loader from "@/app_modules/component_global/ui/ui_loader";
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

    useShallowEffect(() => {
      onLoadData({
        onLoad(val) {
          setData(val);
        },
      });
    }, []);

    async function onLoadData({ onLoad }: { onLoad: (val: any) => void }) {
      const loadData = await notifikasi_getByUserId({ page: 1 });
      onLoad(loadData);
    }

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
                <ComponentGlobal_UI_Loader />
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
                onLoadData={(val) => setData(val)}
                activePage={activePage}
                onSetJob={(val) => {
                  setJobMenuId(val.menuId);
                  setJobStatus(val.status);
                }}
              />
            )}
          </ScrollOnly>
        )}
      </Box>
    </>
  );
}
