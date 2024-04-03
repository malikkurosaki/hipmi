"use client";
import { myConsole } from "@/app/fun/my_console";
import { ApiHipmi } from "@/app/lib/api";
import { ActionIcon, Button, Group, Modal, Stack, Title } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { IconLogout } from "@tabler/icons-react";
import { Warna } from "@/app/lib/warna";
import { useDisclosure } from "@mantine/hooks";
import { gs_kodeId, gs_nomor, gs_otp } from "@/app_modules/auth/state/state";
import { auth_Logout } from "@/app_modules/auth/fun/fun_logout";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/component_global/notif_global/notifikasi_peringatan";
import { useState } from "react";

export default function Admin_Logout() {
  const router = useRouter();
  const [opened, { toggle }] = useDisclosure(false);

  const [kodeId, setKodeId] = useAtom(gs_kodeId);
  const [loadingLogout, setLoadingLogout] = useState(false);

  async function onClickLogout() {
    await auth_Logout(kodeId).then((res) => {
      if (res.status === 200) {
        setLoadingLogout(true);
        ComponentGlobal_NotifikasiBerhasil(res.message);
        setKodeId("");
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
            <Button compact onClick={toggle} radius={50}>
              Batal
            </Button>
            <Button
              compact
              loaderPosition="center"
              loading={loadingLogout ? true : false}
              radius={50}
              bg={Warna.merah}
              color="red"
              onClick={() => onClickLogout()}
            >
              Keluar
            </Button>
          </Group>
        </Stack>
      </Modal>
      <ActionIcon variant="transparent">
        <IconLogout color={Warna.merah} onClick={toggle} />
      </ActionIcon>
      {/* <Button radius={"xl"} color={"red"} onClick={toggle}>
        Logout
      </Button> */}
    </>
  );
}
