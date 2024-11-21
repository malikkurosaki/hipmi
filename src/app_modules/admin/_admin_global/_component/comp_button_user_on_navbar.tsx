"use client";

import { RouterAuth } from "@/app/lib/router_hipmi/router_auth";
import { Warna } from "@/app/lib/warna";
import { AccentColor } from "@/app_modules/_global/color";
import {
  ComponentGlobal_NotifikasiBerhasil,
  ComponentGlobal_NotifikasiPeringatan,
} from "@/app_modules/_global/notif_global";
import { auth_Logout } from "@/app_modules/auth/fun/fun_logout";
import { gs_kodeId } from "@/app_modules/auth/state/state";
import { MODEL_USER } from "@/app_modules/home/model/interface";
import {
  ActionIcon,
  Button,
  Center,
  Divider,
  Grid,
  Group,
  Menu,
  Modal,
  Popover,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconPhone, IconUser, IconUserCircle } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Admin_ComponentButtonUserCircle({
  dataUser,
}: {
  dataUser: MODEL_USER;
}) {
  const router = useRouter();
  const [isOpenMenuUser, setOpenMenuUser] = useState(false);
  const [openPop, setOpenPop] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [kodeId, setKodeId] = useAtom(gs_kodeId);
  const [loadingLogout, setLoadingLogout] = useState(false);

  async function onClickLogout() {
    const res = await auth_Logout();
    if (res.status === 200) {
      console.log(res);
      setLoadingLogout(true);
      ComponentGlobal_NotifikasiBerhasil(res.message);
      setKodeId("");
      setOpenModal(false);
      router.push(RouterAuth.login, { scroll: false });
    } else {
      ComponentGlobal_NotifikasiPeringatan(res.message);
    }
  }

  return (
    <>
      <Popover opened={openPop} onChange={setOpenPop} position="right-end">
        <Popover.Target>
          <ActionIcon
            variant="transparent"
            onClick={() => {
              setOpenPop((o) => !o);
            }}
          >
            <IconUserCircle color="white" />
          </ActionIcon>
        </Popover.Target>

        <Popover.Dropdown style={{ backgroundColor: AccentColor.blue }}>
          <Stack>
            <Grid>
              <Grid.Col span={2}>
                <IconUser />
              </Grid.Col>
              <Grid.Col span={"auto"}>
                <Text lineClamp={1}>{dataUser.username}</Text>
              </Grid.Col>
            </Grid>

            <Grid>
              <Grid.Col span={2}>
                <IconPhone />
              </Grid.Col>
              <Grid.Col span={"auto"}>
                <Text lineClamp={1}>+{dataUser.nomor}</Text>
              </Grid.Col>
            </Grid>

            <Divider />

            <Center>
              <Button radius={"xl"} onClick={() => setOpenModal(true)}>
                Keluar
              </Button>
            </Center>
          </Stack>
        </Popover.Dropdown>
      </Popover>

      <Modal
        opened={openModal}
        onClose={() => setOpenModal(false)}
        centered
        withCloseButton={false}
        closeOnClickOutside={false}
      >
        <Stack>
          <Title order={6}>Anda yakin ingin keluar ?</Title>
          <Group align="center" position="center">
            <Button
              onClick={() => {
                setOpenModal(false);
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
    </>
  );

  return (
    <>
      <Menu
        withArrow
        arrowPosition="center"
        opened={isOpenMenuUser}
        onChange={setOpenMenuUser}
        shadow="md"
        width={250}
        position="bottom-start"
        styles={{
          dropdown: {
            backgroundColor: AccentColor.blue,
            border: `1px solid ${AccentColor.skyblue}`,
          },
          item: {
            color: "white",
            ":hover": {
              backgroundColor: "gray",
            },
          },
          arrow: {
            borderTopColor: AccentColor.skyblue,
            borderLeftColor: AccentColor.skyblue,
          },
        }}
      >
        <Menu.Target>
          <IconUserCircle color="white" />
          {/* <ActionIcon variant="transparent">
          </ActionIcon> */}
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item>
            <Grid>
              <Grid.Col span={2}>
                <IconUser />
              </Grid.Col>
              <Grid.Col span={"auto"}>
                <Text lineClamp={1}>{dataUser.username}</Text>
              </Grid.Col>
            </Grid>
          </Menu.Item>
          <Menu.Item>
            <Grid>
              <Grid.Col span={2}>
                <IconPhone />
              </Grid.Col>
              <Grid.Col span={"auto"}>
                <Text lineClamp={1}>+{dataUser.nomor}</Text>
              </Grid.Col>
            </Grid>
          </Menu.Item>

          <Menu.Divider />

          <Menu.Item>
            {/* <Center py={"xs"}>
              <Admin_Logout />
            </Center> */}
            {/* <Button>Keluar</Button> */}
            <Text>Keluar</Text>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
}
