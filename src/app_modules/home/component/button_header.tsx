"use client";

import { gs_user_ntf } from "@/app/lib/global_state";
import { RouterNotifikasi } from "@/app/lib/router_hipmi/router_notifikasi";
import { RouterUserSearch } from "@/app/lib/router_hipmi/router_user_search";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import notifikasi_countUserNotifikasi from "@/app_modules/notifikasi/fun/count/fun_count_by_id";
import { gs_notifikasi_kategori_app } from "@/app_modules/notifikasi/lib";
import { ActionIcon, Indicator, Loader, Text } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconBell, IconUserSearch } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MODEL_USER } from "../model/interface";

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
  const [isLoadingBell, setIsLoadingBell] = useState(false);
  const [activeKategori, setActiveKategori] = useAtom(
    gs_notifikasi_kategori_app
  );

  // Notifikasi
  const [countNtf, setCountNtf] = useState(countNotifikasi);
  const [newUserNtf, setNewUserNtf] = useAtom(gs_user_ntf);

  useShallowEffect(() => {
    // console.log(newUserNtf, "new notif");
    // console.log(countNtf, "count ntf");
    setCountNtf(countNtf + newUserNtf);
    setNewUserNtf(0);

    onLoadNotifikasi({
      onLoad(val) {
        console.log(val, "total notif");
        setCountNtf(val);
      },
    });
  }, [newUserNtf, setCountNtf]);

  // useShallowEffect(() => {
  //   mqtt_client.subscribe("USER");

  //   mqtt_client.on("message", (topic: any, message: any) => {
  //     // console.log(topic);
  //     const data = JSON.parse(message.toString());

  //     if (data.userId === dataUser.id) {
  //       setCountNtf(countNtf + data.count);
  //     }
  //   });

  //   onLoadNotifikasi({
  //     onLoad(val) {
  //       setCountNtf(val);
  //     },
  //   });
  // }, [countNtf]);

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
            setActiveKategori("Semua");
          }
        }}
      >
        {isLoadingBell ? (
          <Loader color={AccentColor.yellow} size={20} />
        ) : countNtf === 0 ? (
          <IconBell color="white" />
        ) : (
          <Indicator
            processing
            color={MainColor.yellow}
            label={
              <Text fz={10} c={MainColor.darkblue}>
                {countNtf > 99 ? "99+" : countNtf}
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
