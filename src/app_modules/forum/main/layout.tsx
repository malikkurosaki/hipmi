"use client";

import {
  ActionIcon,
  AppShell,
  Avatar,
  Center,
  Footer,
  Grid,
  Group,
  Header,
  Loader,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import React, { useState } from "react";
import ComponentForum_HeaderTamplate from "../component/header/header_tamplate";
import { RouterHome } from "@/app/lib/router_hipmi/router_home";
import { RouterForum } from "@/app/lib/router_hipmi/router_forum";
import { IconChevronLeft, IconCircle, IconHome } from "@tabler/icons-react";
import router from "next/router";
import { useRouter } from "next/navigation";
import { title } from "process";
import { MODEL_USER } from "@/app_modules/home/model/interface";
import { RouterProfile } from "@/app/lib/router_hipmi/router_katalog";
import ComponentGlobal_V2_LoadingPage from "@/app_modules/component_global/loading_page_v2";
import AppComponentGlobal_LayoutTamplate from "@/app_modules/component_global/component_layout_tamplate";
import LayoutGlobal_UI_Tamplate from "@/app_modules/component_global/ui/ui_layout_tamplate";
import LayoutGlobal_UI_HeaderTamplate from "@/app_modules/component_global/ui/ui_header_tamplate";

export default function LayoutForum_Main({
  children,
  dataAuthor,
}: {
  children: React.ReactNode;
  dataAuthor: MODEL_USER;
}) {
  const router = useRouter();
  const [hotMenu, setHotMenu] = useState(1);
  const [loading, setLoading] = useState(false);


  return (
    <>
      <LayoutGlobal_UI_Tamplate
        header={
          <LayoutGlobal_UI_HeaderTamplate
            title="FORUM"
            iconRight={
              <ActionIcon
                radius={"xl"}
                variant="transparent"
                onClick={() => {
                  setLoading(true);
                  router.push(RouterForum.forumku + dataAuthor?.id);
                }}
              >
                {loading ? (
                  <Loader size={20} />
                ) : (
                  <Avatar
                    radius={"xl"}
                    size={30}
                    sx={{
                      borderStyle: "solid",
                      borderWidth: "0.5px",
                      borderColor: "black",
                    }}
                    alt="foto"
                    src={
                      RouterProfile.api_foto_profile +
                      dataAuthor?.Profile?.imagesId
                    }
                  />
                )}
              </ActionIcon>
            }
          />
        }
      >
        {children}
      </LayoutGlobal_UI_Tamplate>

      {/* <AppComponentGlobal_LayoutTamplate
        header={
          <Header height={50} sx={{ borderStyle: "none" }}>
            <Group h={50} position="apart" px={"md"}>
              <ActionIcon
                variant="transparent"
                onClick={() => {
                  setLoading(true);
                  return router.push(RouterHome.main_home);
                }}
              >
                <IconChevronLeft />
              </ActionIcon>

              <Title order={5}>Forum</Title>
              
              <ActionIcon
                loading={loading ? true : false}
                variant="transparent"
                onClick={() => {
                  setLoading(true);
                  router.push(RouterForum.forumku + dataAuthor?.id);
                }}
              >
                <Avatar
                  radius={"xl"}
                  size={30}
                  sx={{
                    borderStyle: "solid",
                    borderWidth: "0.5px",
                    borderColor: "black",
                  }}
                  alt="foto"
                  src={
                    RouterProfile.api_foto_profile +
                    dataAuthor?.Profile?.imagesId
                  }
                />
              </ActionIcon>
            </Group>
          </Header>
        }

        // footer={
        //   <Footer height={60} bg={"dark"}>
        //     <Grid>
        //       {listFooter.map((e) => (
        //         <Grid.Col
        //           key={e.id}
        //           span={"auto"}
        //           pt={"md"}
        //           onClick={() => {
        //             router.replace(e.path);
        //             setHotMenu(e.id);
        //           }}
        //         >
        //           <Center>
        //             <Stack align="center" spacing={0}>
        //               <ActionIcon
        //                 variant="transparent"
        //                 c={hotMenu === e.id ? "blue" : "white"}
        //               >
        //                 {e.icon}
        //               </ActionIcon>
        //               <Text fz={10} c={hotMenu === e.id ? "blue" : "white"}>
        //                 {e.name}
        //               </Text>
        //             </Stack>
        //           </Center>
        //         </Grid.Col>
        //       ))}
        //     </Grid>
        //   </Footer>
        // }
      >
        {children}
      </AppComponentGlobal_LayoutTamplate> */}
    </>
  );
}
