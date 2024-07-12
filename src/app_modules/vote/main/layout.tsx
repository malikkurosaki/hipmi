"use client";

import {
  ActionIcon,
  AppShell,
  Center,
  Footer,
  Grid,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import React, { useState } from "react";
import ComponentVote_HeaderTamplate from "../component/header_tamplate";
import { useRouter } from "next/navigation";
import { RouterVote } from "@/app/lib/router_hipmi/router_vote";
import {
  IconClick,
  IconHistory,
  IconHome,
  IconReservedLine,
} from "@tabler/icons-react";
import { gs_vote_hotMenu } from "../global_state";
import { useAtom } from "jotai";
import { RouterHome } from "@/app/lib/router_hipmi/router_home";
import AppComponentGlobal_LayoutTamplate from "@/app_modules/_global/component_layout_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import { MainColor } from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";

export default function LayoutVote_Main({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [hotMenu, setHotMenu] = useAtom(gs_vote_hotMenu);

  const listFooter = [
    {
      id: 1,
      name: "Beranda",
      path: RouterVote.beranda,
      icon: <IconHome />,
    },

    {
      id: 2,
      name: "Status",
      path: RouterVote.status,
      icon: <IconReservedLine />,
    },
    {
      id: 3,
      name: "Kontribusi",
      path: RouterVote.kontribusi,
      icon: <IconClick />,
    },
    {
      id: 4,
      name: "Riwayat",
      path: RouterVote.riwayat,
      icon: <IconHistory />,
    },
  ];

  return (
    <>
      <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate
            title="Voting"
            routerLeft={RouterHome.main_home}
          />
        }
        footer={
          <SimpleGrid cols={4} h={"9vh"} mx={"xs"} >
            {listFooter.map((e, i) => (
              <Stack key={i} align="center" justify="center" spacing={0}>
                <ActionIcon
                  // disabled={e.path === "" ? true : false}
                  variant="transparent"
                  c={hotMenu === e.id ? MainColor.yellow : "white"}
                  onClick={() =>
                    e.path === ""
                      ? ComponentGlobal_NotifikasiPeringatan("Cooming Soon")
                      : (router.replace(e.path), setHotMenu(e.id))
                  }
                >
                  {e.icon}
                </ActionIcon>
                <Text
                  c={hotMenu === e.id ? MainColor.yellow : "white"}
                  fz={"xs"}
                  lineClamp={1}
                >
                  {e.name}
                </Text>
              </Stack>
            ))}
          </SimpleGrid>
          // <Footer
          //   height={"10vh"}
          //   bg={"dark"}
          //   sx={{ borderTop: "px solid blue" }}
          // >
          //   <Stack h={"100%"} justify="center">
          //     <Grid>
          //       {listFooter.map((e, i) => (
          //         <Grid.Col key={e.id} span={"auto"} pt={"md"}>
          //           <Center
          //             onClick={() => {
          //               router.replace(e.path);
          //               setHotMenu(i);
          //             }}
          //           >
          //             <Stack align="center" spacing={0}>
          //               <ActionIcon
          //                 variant="transparent"
          //                 c={hotMenu === i ? "blue" : "white"}
          //               >
          //                 {e.icon}
          //               </ActionIcon>
          //               <Text fz={10} c={hotMenu === i ? "blue" : "white"}>
          //                 {e.name}
          //               </Text>
          //             </Stack>
          //           </Center>
          //         </Grid.Col>
          //       ))}
          //     </Grid>
          //   </Stack>
          // </Footer>
        }
      >
        {children}
      </UIGlobal_LayoutTamplate>
    </>
  );
}
