"use client";

import {
  ActionIcon,
  Center,
  Flex,
  Footer,
  Grid,
  Group,
  Header,
  Text,
  Title
} from "@mantine/core";
import React, { useState } from "react";

import { RouterCrowd } from "@/app/lib/router_hipmi/router_crowd";
import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import AppComponentGlobal_LayoutTamplate from "@/app_modules/component_global/component_layout_tamplate";
import {
  IconChevronLeft,
  IconGiftCardFilled,
  IconHome,
  IconMoneybag
} from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { gs_donasi_hot_menu } from "../global_state";

export default function LayoutDonasi({
  children,
  userId,
  isRead,
}: {
  children: React.ReactNode;
  userId: string;
  isRead: boolean[];
}) {
  const router = useRouter();
  const [active, setActive] = useAtom(gs_donasi_hot_menu);
  const [isLoading, setLoading] = useState(false);
  const [isRightLoading, setRightLoading] = useState(false);

  const listPage = [
    {
      id: 1,
      name: "Beranda",
      path: RouterDonasi.main_beranda,
      icon: <IconHome />,
    },
    {
      id: 2,
      name: "Galang Dana",
      path: RouterDonasi.main_galang_dana,
      icon: <IconMoneybag />,
    },
    {
      id: 3,
      name: "Donasi Saya",
      path: RouterDonasi.main_donasi_saya,
      icon: <IconGiftCardFilled />,
    },
  ];

  return (
    <>
      <AppComponentGlobal_LayoutTamplate
        header={
          <Header height={50} sx={{ borderStyle: "none" }}>
            <Group h={50} position="apart" px={"md"}>
              <ActionIcon
                radius={"xl"}
                variant="transparent"
                loading={isLoading ? true : false}
                onClick={() => {
                  setLoading(true);
                  router.push(RouterCrowd.main);
                }}
              >
                <IconChevronLeft />
              </ActionIcon>
              <Title order={5}>Donasi</Title>
              <ActionIcon disabled variant="transparent"/>
              {/* <ActionIcon
                radius={"md"}
                loading={isRightLoading ? true : false}
                variant="transparent"
                onClick={() => {
                  setRightLoading(true);
                  router.push(RouterDonasi.notif_page + `${userId}`);
                }}
              >
                {_.isEmpty(isRead) ? (
                  <IconBell />
                ) : isRead.includes(false) ? (
                  <Indicator processing color="orange">
                    <IconBell />
                  </Indicator>
                ) : (
                  <IconBell />
                )}
              </ActionIcon> */}
            </Group>
          </Header>
        }
        footer={
          <Footer height={"10vh"} bg={"dark"}>
            <Grid align="center" h={"10vh"} pt={"xs"} grow>
              {/* Tampilan Bursa */}
              {listPage.map((e, i) => (
                <Grid.Col
                  key={e.id}
                  span={3}
                  onClick={() => {
                    router.push(e.path);
                    setActive(i);
                  }}
                >
                  <Center>
                    <Flex direction={"column"} align={"center"} w={"100%"}>
                      <ActionIcon
                        variant="transparent"
                        c={active === i ? "orange" : "white"}
                      >
                        {e.icon}
                      </ActionIcon>
                      <Text c={active === i ? "orange" : "white"} fz={"xs"}>
                        {e.name}
                      </Text>
                    </Flex>
                  </Center>
                </Grid.Col>
              ))}
            </Grid>
          </Footer>
        }
      >
        {/* {JSON.stringify(isRead)} */}
        {children}
      </AppComponentGlobal_LayoutTamplate>
    </>
  );
}
