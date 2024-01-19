"use client";
import { myConsole } from "@/app/fun/my_console";
import { ApiHipmi } from "@/app/lib/api";
import { ActionIcon, Button, Group, Modal, Stack, Title } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { IconLogout } from "@tabler/icons-react";
import { Warna } from "@/app/lib/warna";
import { useDisclosure } from "@mantine/hooks";
import { gs_nomor, gs_otp } from "@/app_modules/auth/state/state";

export default function Admin_Logout() {
  const router = useRouter();
  const [nomor, setnomor] = useAtom(gs_nomor);
  const [code, setCode] = useAtom(gs_otp);

  const [opened, { toggle }] = useDisclosure(false);

  const onLogout = async () => {
    router.push("/dev/auth/login");

    // await fetch(ApiHipmi.logout)
    //   .then((res) => res.json())
    //   .then((val) => {
    //     if (val.status == 200) {
    //         setnomor(null);
    //         setCode(null);

    //       router.push("/dev/auth/login");
    //     }
    //   });
  };

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
              radius={50}
              bg={Warna.merah}
              color="red"
              onClick={() => onLogout()}
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
