"use client";

import {
  ActionIcon,
  AppShell,
  Center,
  Flex,
  Footer,
  Grid,
  Text,
} from "@mantine/core";
import React, { useState } from "react";
import HeaderTamplateDonasi from "../component/header_tamplate";

import {
  IconCurrencyDollar,
  IconGift,
  IconGiftCardFilled,
  IconHome,
  IconMoneybag,
  IconSend,
} from "@tabler/icons-react";
import toast from "react-simple-toasts";
import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { gs_donasi_hot_menu } from "../global_state";
import { RouterCrowd } from "@/app/lib/router_hipmi/router_crowd";

export default function LayoutDonasi({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [active, setActive] = useAtom(gs_donasi_hot_menu);
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
      <AppShell
        header={
          <HeaderTamplateDonasi title="Donasi" route={RouterCrowd.main} />
        }
        footer={
          <Footer height={70} bg={"dark"}>
            <Grid align="center" h={60} pt={"xs"} grow>
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
                      <Text c={active === i ? "orange" : "white"}>
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
        {children}
      </AppShell>
    </>
  );
}
