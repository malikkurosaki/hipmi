"use client";

import {
  ActionIcon,
  Button,
  Group,
  Modal,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { gs_kodeId, gs_nomor, gs_otp } from "../state/state";
import { IconLogout } from "@tabler/icons-react";
import { Warna } from "@/app/lib/warna";
import { useDisclosure } from "@mantine/hooks";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import { auth_Logout } from "../fun/fun_logout";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/component_global/notif_global/notifikasi_peringatan";
import { RouterAuth } from "@/app/lib/router_hipmi/router_auth";
import { useState } from "react";
import ComponentGlobal_UI_Modal from "@/app_modules/component_global/ui/ui_modal";

export default function Component_Logout() {
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const [kodeId, setKodeId] = useAtom(gs_kodeId);
  const [loading, setLoading] = useState(false);

  async function onClickLogout() {
    // await auth_Logout(kodeId).then((res) => {
    //   ComponentGlobal_NotifikasiBerhasil("Berhasil Logout");
    // });
    await auth_Logout(kodeId).then((res) => {
      if (res.status === 200) {
        ComponentGlobal_NotifikasiBerhasil(res.message);
        setKodeId("");
      } else {
        ComponentGlobal_NotifikasiPeringatan(res.message);
      }
    });
  }

  return (
    <>
      <ComponentGlobal_UI_Modal
        title={"Anda yakin ingin keluar ?"}
        buttonKiri={
          <Button
            onClick={() => {
              setLoading(false);
              setOpened(false);
            }}
            radius={50}
          >
            Batal
          </Button>
        }
        buttonKanan={
          <Button
            loaderPosition="center"
            loading={loading ? true : false}
            radius={50}
            bg={Warna.merah}
            color="red"
            onClick={() => {
              setLoading(true);
              onClickLogout();
            }}
          >
            Keluar
          </Button>
        }
        opened={opened}
        close={() => setOpened(false)}
      />

      <Stack align="center" spacing={"xs"}>
        <ActionIcon
          variant="transparent"
          c="white"
          onClick={() => {
            setOpened(true);
          }}
        >
          <IconLogout color="red" />
        </ActionIcon>
        <Text fw={"bold"} align="center" color="red">
          Keluar
        </Text>
      </Stack>
    </>
  );
}
