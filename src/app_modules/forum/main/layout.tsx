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

  const listFooter = [
    {
      id: 1,
      name: "Beranda",
      path: RouterForum.beranda,
      icon: <IconHome />,
    },

    {
      id: 2,
      name: "ForumKu",
      path: RouterForum.forumku,
      icon: <IconCircle />,
    },
  ];

  return (
    <>
      <AppShell
        header={
          <Header height={50} sx={{ borderStyle: "none" }}>
            <Group h={50} position="apart" px={"md"}>
              <ActionIcon
                variant="transparent"
                onClick={() => {
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
      </AppShell>
    </>
  );
}
