"use client";
import { myConsole } from "@/app/fun/my_console";
import { ApiHipmi } from "@/app/lib/api";
import { ActionIcon, Button, Group, Modal } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { gs_nomor, gs_otp } from "../state/state";
import { IconLogout } from "@tabler/icons-react";
import { Warna } from "@/app/lib/warna";
import { gs_token } from "@/app_modules/home/state/global_state";
import { useDisclosure } from "@mantine/hooks";

export default function Logout() {
  const router = useRouter();
  const [nomor, setnomor] = useAtom(gs_nomor);
  const [code, setCode] = useAtom(gs_otp);
  const [token, setToken] = useAtom(gs_token);

  const [opened, { toggle }] = useDisclosure(false);

  const onLogout = async () => {
    // MyConsole("keluar");

    await fetch(ApiHipmi.logout)
      .then((res) => res.json())
      .then((val) => {
        if (val.status == 200) {
          setnomor(null);
          setCode(null);
          setToken(null);

          return router.push("/dev/auth/login");
        }
      });
  };

  return (
    <>
      <Modal opened={opened} onClose={toggle} centered title="Yakin ingin keluar ?">
        <Group align="center" position="center">
          <Button compact onClick={toggle} radius={50}>
            Batal
          </Button>
          <Button
          compact
            radius={50}
            bg={Warna.merah}
            color="red"
            onClick={() => onLogout()}
          >
            Keluar
          </Button>
        </Group>
      </Modal>
      <ActionIcon variant="transparent">
        <IconLogout color={Warna.merah} onClick={toggle} />
      </ActionIcon>
    </>
  );
}
