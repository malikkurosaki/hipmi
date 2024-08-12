"use client";

import { RouterCrowd } from "@/app/lib/router_hipmi/router_crowd";
import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import { MainColor } from "@/app_modules/_global/color/color_pallet";
import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import {
  ActionIcon,
  SimpleGrid,
  Stack,
  Text
} from "@mantine/core";
import {
  IconCash,
  IconChartHistogram,
  IconChartPie,
  IconNotes,
} from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import React from "react";
import { gs_investas_menu } from "../g_state";

export default function LayoutMainInvestasi({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [active, setActive] = useAtom(gs_investas_menu);

  const listFooter = [
    {
      id: 1,
      name: "Bursa",
      route: RouterInvestasi.main,
      icon: <IconChartHistogram />,
    },
    {
      id: 2,
      name: "Portofolio",
      route: RouterInvestasi.main_porto,
      icon: <IconChartPie />,
    },
    {
      id: 3,
      name: "Saham Saya",
      route: RouterInvestasi.main_investasi,
      icon: <IconCash />,
    },
    {
      id: 4,
      name: "Transaksi",
      route: RouterInvestasi.main_transaksi,
      icon: <IconNotes />,
    },
  ];

  return (
    <>
      <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate
            routerLeft={RouterCrowd.main}
            title="Investasi"
            // icon={<IconPencilPlus />}
            // route2={"/dev/investasi/create"}
          />
        }
        footer={
          <SimpleGrid cols={listFooter.length} h={"9vh"} mx={"xs"}>
            {listFooter.map((e, i) => (
              <Stack key={i} align="center" justify="center" spacing={0}>
                <ActionIcon
                  // disabled={e.path === "" ? true : false}
                  variant="transparent"
                  c={active === i ? MainColor.yellow : "white"}
                  onClick={
                    () => {
                      router.push(e.route);
                      setActive(i);
                    }
                    // e.route === ""
                    //   ? ComponentGlobal_NotifikasiPeringatan("Cooming Soon")
                    //   : (router.replace(e.route), setActive(i))
                  }
                >
                  {e.icon}
                </ActionIcon>
                <Text
                  c={active === i ? MainColor.yellow : "white"}
                  fz={"xs"}
                  lineClamp={1}
                >
                  {e.name}
                </Text>
              </Stack>
            ))}
          </SimpleGrid>

          // <Footer height={"10vh"} bg={"black"}>
          //   <Grid align="center" h={"10vh"} pt={"xs"} grow>

          //     {listFooter.map((e, k) => (
          //       <Grid.Col
          //         key={e.id}
          //         span={3}
          //         onClick={() => {
          //           router.push(e.route);
          //           setActive(k);
          //         }}
          //       >
          //         <Center h={"100%"}>
          //           <Flex direction={"column"} align={"center"} w={"100%"}>
          //             <ActionIcon
          //               variant="transparent"
          //               c={active === k ? "blue" : "white"}
          //             >
          //               {e.icon}
          //             </ActionIcon>
          //             <Text c={active === k ? "blue" : "white"} fz={"xs"}>
          //               {e.name}
          //             </Text>
          //           </Flex>
          //         </Center>
          //       </Grid.Col>
          //     ))}
          //   </Grid>
          // </Footer>
        }
      >
        {children}
      </UIGlobal_LayoutTamplate>
    </>
  );
}
