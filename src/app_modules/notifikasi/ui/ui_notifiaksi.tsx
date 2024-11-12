"use client";

import { MainColor } from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import {
  gs_donasi_hot_menu,
  gs_donasi_tabs_posting,
} from "@/app_modules/donasi/global_state";
import {
  gs_event_hotMenu,
  gs_event_status,
} from "@/app_modules/event/global_state";
import {
  gs_investas_menu,
  gs_investasi_status,
} from "@/app_modules/investasi/g_state";
import {
  gs_vote_hotMenu,
  gs_vote_status,
} from "@/app_modules/vote/global_state";
import { Box, Button, Center, Flex, Stack } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useAtom } from "jotai";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useState } from "react";
import { ComponentNotifiaksi_CardView } from "../component/card_view";
import notifikasi_getByUserId from "../fun/get/get_notifiaksi_by_id";
import { gs_notifikasi_kategori_app } from "../lib";
import { MODEL_NOTIFIKASI } from "../model/interface";

export function Notifikasi_UiView({
  listNotifikasi,
  masterKategori,
}: {
  listNotifikasi: any[];
  masterKategori: any[];
}) {
  const [data, setData] = useState<MODEL_NOTIFIKASI[]>(listNotifikasi);
  const [activePage, setActivePage] = useState(1);
  const [mstrKategori, setMstrKategori] = useState(masterKategori);
  const [activeKategori, setActiveKategori] = useAtom(
    gs_notifikasi_kategori_app
  );

  // Kategori App
  const [voteMenu, setVoteMenu] = useAtom(gs_vote_hotMenu);
  const [voteStatus, setVoteStatus] = useAtom(gs_vote_status);
  const [eventMenu, setEventMenu] = useAtom(gs_event_hotMenu);
  const [eventStatus, setEventStatus] = useAtom(gs_event_status);
  const [donasiMenu, setDonasiMenu] = useAtom(gs_donasi_hot_menu);
  const [donasiStatus, setDonasiStatus] = useAtom(gs_donasi_tabs_posting);
  const [investasiMenu, setInvestasiMenu] = useAtom(gs_investas_menu);
  const [investasiStatus, setInvestasiStatus] = useAtom(gs_investasi_status);

  useShallowEffect(() => {
    onLoadDataNotifikasi({ kategoriApp: activeKategori });
  }, [activeKategori]);

  async function onLoadDataNotifikasi({
    kategoriApp,
  }: {
    kategoriApp: string;
  }) {
    const loadNotifikasi = await notifikasi_getByUserId({
      page: 1,
      kategoriApp: kategoriApp,
    });

    setData(loadNotifikasi as any);
  }


  return (
    <>
      <Stack spacing={"xs"}>
        <Box
          style={{
            display: "flex",
            gap: "20px",
            position: "relative",
            overflowX: "scroll",
            scrollbarWidth: "none",
          }}
        >
          <Flex gap={"md"}>
            {mstrKategori.map((e, i) => (
              <Button
                radius={"xl"}
                key={i}
                c={activeKategori === e.name ? "black" : "gray.5"}
                style={{
                  transition: "0.3s",
                  backgroundColor:
                    activeKategori === e.name ? MainColor.yellow : "GrayText",
                }}
                onClick={() => {
                  setActiveKategori(e.name);
                  // onLoadDataNotifikasi(e.name);
                }}
              >
                {e.name}
              </Button>
            ))}
          </Flex>
        </Box>

        <Box>
          {_.isEmpty(data) ? (
            <ComponentGlobal_IsEmptyData text="Tidak ada pemberitahuan" />
          ) : (
            <ScrollOnly
              height="85vh"
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
                  kategoriApp: activeKategori,
                });
                // console.log(loadData);

                setActivePage((val) => val + 1);

                return loadData;
              }}
            >
              {(item) => (
                <ComponentNotifiaksi_CardView
                  data={item}
                  onLoadData={setData}
                  activePage={activePage}
                  activeKategori={activeKategori}
                  // onSetMenu={(val) => {
                  //   if (item?.kategoriApp === "JOB") {

                  //     setJobMenuId(val.menuId);
                  //     // setJobStatus(val.status);
                  //   }

                  //   // if (item?.kategoriApp === "VOTING") {
                  //   //   setVoteMenu(val.menuId);
                  //   //   setVoteStatus(val.status);
                  //   // }

                  //   // if (item?.kategoriApp === "EVENT") {
                  //   //   setEventMenu(val.menuId);
                  //   //   setEventStatus(val.status);
                  //   // }

                  //   // if (item?.kategoriApp === "DONASI") {
                  //   //   setDonasiMenu(val.menuId);
                  //   //   setDonasiStatus(val.status);
                  //   // }

                  //   // if (item?.kategoriApp === "INVESTASI") {
                  //   //   setInvestasiMenu(val.menuId);
                  //   //   setInvestasiStatus(val.status);
                  //   // }
                  // }}
                />
              )}
            </ScrollOnly>
          )}
        </Box>
      </Stack>
    </>
  );
}
