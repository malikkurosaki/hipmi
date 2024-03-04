"use client";

import { ActionIcon, Button, Group, Modal, Stack, Title } from "@mantine/core";
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

export default function User_Logout() {
  const router = useRouter();
  const [opened, { toggle }] = useDisclosure(false);
  const [kodeId, setKodeId] = useAtom(gs_kodeId);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const onLogout = async () => {
    // await fetch(ApiHipmi.logout)
    //   .then((res) => res.json())
    //   .then((val) => {
    //     if (val.status == 200) {
    //       setnomor(null);
    //       setCode(null);
    //       ComponentGlobal_NotifikasiBerhasil("Anda Berhasil Logout")
    //       return router.push("/dev/auth/login");
    //     }
    //   });
  };

  async function onClickLogout() {
    await auth_Logout(kodeId).then((res) => {
      if (res.status === 200) {
        setKodeId("");
        ComponentGlobal_NotifikasiBerhasil(res.message);
        router.push(RouterAuth.login)
      } else {
        ComponentGlobal_NotifikasiPeringatan(res.message);
      }
    });
  }

  return (
    <>
      <Modal opened={opened} onClose={toggle} centered withCloseButton={false}>
        <Stack>
          <Title order={6}>Anda yakin ingin keluar ?</Title>
          <Group align="center" position="center">
            <Button
              onClick={() => {
                setLoading(false);
                toggle();
              }}
              radius={50}
            >
              Batal
            </Button>
            <Button
              loaderPosition="center"
              loading={loading2 ? true : false}
              radius={50}
              bg={Warna.merah}
              color="red"
              onClick={() => {
                setLoading2(true);
                onClickLogout();
              }}
            >
              Keluar
            </Button>
          </Group>
        </Stack>
      </Modal>
      {/* <ActionIcon variant="transparent">
        <IconLogout color={Warna.merah} onClick={toggle} />
      </ActionIcon> */}
      <Button
        loading={loading ? true : false}
        loaderPosition="center"
        radius={"xl"}
        color={"red"}
        onClick={() => {
          setLoading(true);
          toggle();
        }}
      >
        Logout
      </Button>
    </>
  );
}
