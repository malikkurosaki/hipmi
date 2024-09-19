"use client";
import { Warna } from "@/app/lib/warna";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import { auth_Logout } from "@/app_modules/auth/fun/fun_logout";
import { gs_kodeId } from "@/app_modules/auth/state/state";
import {
  ActionIcon,
  Button,
  Group,
  Loader,
  Modal,
  Stack,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconLogout } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Admin_Logout() {
  const router = useRouter();
  const [opened, { toggle }] = useDisclosure(false);
  const [loading, setLoading] = useState(false);

  const [kodeId, setKodeId] = useAtom(gs_kodeId);
  const [loadingLogout, setLoadingLogout] = useState(false);

  async function onClickLogout() {
    await auth_Logout().then((res) => {
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
      <Modal
        opened={opened}
        onClose={toggle}
        centered
        withCloseButton={false}
        closeOnClickOutside={false}
      >
        <Stack>
          <Title order={6}>Anda yakin ingin keluar ?</Title>
          <Group align="center" position="center">
            <Button
              onClick={() => {
                toggle();
                setLoading(false);
              }}
              radius={50}
            >
              Batal
            </Button>
            <Button
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
        {loading ? (
          <Loader color="gray" />
        ) : (
          <IconLogout
            color={Warna.merah}
            onClick={() => {
              toggle();
              setLoading(true);
            }}
          />
        )}
      </ActionIcon>
      {/* <Button radius={"xl"} color={"red"} onClick={toggle}>
        Logout
      </Button> */}
    </>
  );
}
