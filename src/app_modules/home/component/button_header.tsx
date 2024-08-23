"use client";

import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import { ActionIcon, Indicator, Loader, Text } from "@mantine/core";
import { MODEL_USER } from "../model/interface";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { RouterUserSearch } from "@/app/lib/router_hipmi/router_user_search";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import { IconBell, IconUserSearch } from "@tabler/icons-react";
import { RouterNotifikasi } from "@/app/lib/router_hipmi/router_notifikasi";
import { useShallowEffect } from "@mantine/hooks";
import notifikasi_countUserNotifikasi from "@/app_modules/notifikasi/fun/count/fun_count_by_id";
import mqtt_client from "@/util/mqtt_client";
import { useAtom } from "jotai";
import { gs_notifikasi_kategori_app } from "@/app_modules/notifikasi/lib";

export function ComponentHome_ButtonHeaderLeft({
  dataUser,
}: {
  dataUser: MODEL_USER;
}) {
  const router = useRouter();
  const [isLoadingUS, setIsLoadingUS] = useState(false);

  return (
    <>
      <ActionIcon
        radius={"xl"}
        variant={"transparent"}
        onClick={() => {
          if (dataUser?.Profile === null) {
            ComponentGlobal_NotifikasiPeringatan("Lengkapi Profile");
          } else {
            setIsLoadingUS(true);
            router.push(RouterUserSearch.main, { scroll: false });
          }
        }}
      >
        {isLoadingUS ? (
          <Loader color={AccentColor.yellow} size={20} />
        ) : (
          <IconUserSearch color="white" />
        )}
      </ActionIcon>
    </>
  );
}

export function ComponentHome_ButtonHeaderRight({
  dataUser,
  countNotifikasi,
}: {
  dataUser: MODEL_USER;
  countNotifikasi: number;
}) {
  const router = useRouter();
  const [count, setCount] = useState(countNotifikasi);
  const [isLoadingBell, setIsLoadingBell] = useState(false);
  const [activeKategori, setActiveKategori] = useAtom(
    gs_notifikasi_kategori_app
  );

  useShallowEffect(() => {
    mqtt_client.subscribe("USER");

    mqtt_client.on("message", (topic: any, message: any) => {
      // console.log(topic);
      const data = JSON.parse(message.toString());

      if (data.userId === dataUser.id) {
        setCount(count + data.count);
      }
    });

    onLoadNotifikasi({
      onLoad(val) {
        setCount(val);
      },
    });
  }, [count]);

  async function onLoadNotifikasi({ onLoad }: { onLoad: (val: any) => void }) {
    const loadNotif = await notifikasi_countUserNotifikasi();
    onLoad(loadNotif);
  }

  return (
    <>
      <ActionIcon
        variant="transparent"
        onClick={() => {
          if (dataUser?.Profile === null) {
            ComponentGlobal_NotifikasiPeringatan("Lengkapi Profile");
          } else {
            router.push(RouterNotifikasi.main, { scroll: false });
            setIsLoadingBell(true);
            setActiveKategori("Semua")
          }
        }}
      >
        {isLoadingBell ? (
          <Loader color={AccentColor.yellow} size={20} />
        ) : count === 0 ? (
          <IconBell color="white" />
        ) : (
          <Indicator
            processing
            color={MainColor.yellow}
            label={
              <Text fz={10} c={MainColor.darkblue}>
                {count > 99 ? "99+" : count}
              </Text>
            }
          >
            <IconBell color="white" />
          </Indicator>
        )}
      </ActionIcon>
    </>
  );
}
