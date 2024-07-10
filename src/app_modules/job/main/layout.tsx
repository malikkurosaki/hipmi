"use client";

import { RouterJob } from "@/app/lib/router_hipmi/router_job";
import { MainColor } from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import { ActionIcon, SimpleGrid, Stack, Text } from "@mantine/core";
import { IconHistory, IconHome, IconReservedLine } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { gs_job_hot_menu } from "../global_state";
import { RouterHome } from "@/app/lib/router_hipmi/router_home";

export default function LayoutJob_Main({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [hotMenuId, setHotMenuId] = useAtom(gs_job_hot_menu);
  const [isLoading, setLoading] = useState(false);

  const listFooter = [
    {
      id: 1,
      name: "Beranda",
      path: RouterJob.beranda,
      icon: <IconHome />,
    },

    {
      id: 2,
      name: "Status",
      path: RouterJob.status,
      icon: <IconReservedLine />,
    },
    {
      id: 3,
      name: "Arsip",
      path: RouterJob.arsip,
      icon: <IconHistory />,
    },
  ];

  return (
    <>
      <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate
            title="JOB"
            routerLeft={RouterHome.main_home}
          />
        }
        footer={
          <SimpleGrid cols={3} h={"10vh"} mx={"xs"}>
            {listFooter.map((e, i) => (
              <Stack key={i} align="center" justify="center" spacing={0}>
                <ActionIcon
                  // disabled={e.path === "" ? true : false}
                  variant="transparent"
                  c={hotMenuId === e.id ? MainColor.yellow : "white"}
                  onClick={() =>
                    e.path === ""
                      ? ComponentGlobal_NotifikasiPeringatan("Cooming Soon")
                      : (router.replace(e.path), setHotMenuId(e.id))
                  }
                >
                  {e.icon}
                </ActionIcon>
                <Text
                  c={hotMenuId === e.id ? MainColor.yellow : "white"}
                  fz={"xs"}
                  lineClamp={1}
                >
                  {e.name}
                </Text>
              </Stack>
            ))}
          </SimpleGrid>
          // <Stack justify="center" h={"100%"}>
          //   <Grid>
          //     {listFooter.map((e) => (
          //       <Grid.Col
          //         key={e.id}
          //         span={"auto"}
          //         pt={"md"}
          //         onClick={() => {
          //           // setLoading(true);
          //           // setTimeout(() => router.replace(e.path), 3000);
          //           router.replace(e.path);
          //           setHotMenuId(e.id);
          //           // setTimeout(() => setLoading(false), 1000);
          //         }}
          //       >
          //         <Center>
          //           <Stack align="center" spacing={0}>
          //             <ActionIcon
          //               radius={"xl"}
          //               variant="transparent"
          //               c={hotMenuId === e.id ? MainColor.yellow : "white"}
          //             >
          //               {e.icon}
          //             </ActionIcon>
          //             <Text
          //               fz={10}
          //               c={hotMenuId === e.id ? MainColor.yellow : "white"}
          //             >
          //               {e.name}
          //             </Text>
          //           </Stack>
          //         </Center>
          //       </Grid.Col>
          //     ))}
          //   </Grid>
          // </Stack>
        }
      >
        {children}
      </UIGlobal_LayoutTamplate>
    </>
  );
}
