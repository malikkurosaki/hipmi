"use client";

import { RouterColab } from "@/app/lib/router_hipmi/router_colab";
import ComponentColab_DetailData from "@/app_modules/colab/component/detail/detail_data";
import ComponentColab_DetailListPartisipasiUser from "@/app_modules/colab/component/detail/list_partisipasi_user";
import ComponentColab_AuthorNameOnHeader from "@/app_modules/colab/component/header_author_name";
import { gs_colab_hot_menu } from "@/app_modules/colab/global_state";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import {
  Button,
  Checkbox,
  Drawer,
  Grid,
  Group,
  Paper,
  ScrollArea,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useAtom } from "jotai";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Colab_DetailStatusPublish() {
  return (
    <>
      <Stack px={5} spacing={"xl"}>
        <ComponentColab_DetailData />
        <CheckBoxPartisipan />
      </Stack>
    </>
  );
}

function CheckBoxPartisipan() {
  const router = useRouter();
  const [value, setValue] = useState<string[]>([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [hotMenu, setHotMenu] = useAtom(gs_colab_hot_menu);

  const listCheck = [
    {
      id: 1,
      value: "satu",
      label: "Satu",
    },
    {
      id: 2,
      value: "dua",
      label: "Dua",
    },
    {
      id: 3,
      value: "tiga",
      label: "Tiga",
    },
    {
      id: 4,
      value: "empat",
      label: "Empat",
    },
    {
      id: 5,
      value: "lima",
      label: "Lima",
    },
    {
      id: 6,
      value: "enam",
      label: "Enam",
    },
    {
      id: 7,
      value: "tujuh",
      label: "Tujuh",
    },
    {
      id: 8,
      value: "delapan",
      label: "Delapan",
    },
    {
      id: 9,
      value: "sembilan",
      label: "Sembilan",
    },
    {
      id: 10,
      value: "sepuluh",
      label: "Sepuluh",
    },
  ];

  async function onSave() {
    close();
    ComponentGlobal_NotifikasiBerhasil("Berhasil Membuat Grup");
    setHotMenu(4);
    router.push(RouterColab.grup_diskusi);
  }

  return (
    <>
      <Stack>
        <Paper withBorder shadow="lg" p={"sm"}>
          <Text c={"red"} fz={10}>
            *
            <Text px={"xs"} span inherit c={"gray"}>
              Pilih user yang akan menjadi tim proyek anda
            </Text>
          </Text>
          <ScrollArea h={400}>
            <Checkbox.Group value={value} onChange={setValue}>
              <Stack mt="xs">
                {listCheck.map((e, i) => (
                  <Grid key={e.id} align="center">
                    <Grid.Col span={"content"}>
                      <Checkbox value={e.value} />
                    </Grid.Col>
                    <Grid.Col span={"auto"}>
                      <ComponentColab_AuthorNameOnHeader isPembatas={true} />
                    </Grid.Col>
                  </Grid>
                ))}
              </Stack>
            </Checkbox.Group>
          </ScrollArea>
        </Paper>
        <Button
          radius={"xl"}
          disabled={_.isEmpty(value) ? true : false}
          onClick={() => {
            open();
          }}
        >
          Buat Ruang Diskusi{" "}
        </Button>
      </Stack>

      <Drawer
        opened={opened}
        onClose={close}
        position="bottom"
        size={150}
        withCloseButton={false}
      >
        <Stack>
          <Title order={6}>Nama Grup Diskusi</Title>
          <TextInput placeholder="Masukan nama grup diskusi .." radius={"xl"} />
          <Group grow>
            <Button radius={"xl"} onClick={close}>
              Batal
            </Button>
            <Button radius={"xl"} color="green" onClick={() => onSave()}>
              Simpan
            </Button>
          </Group>
        </Stack>
      </Drawer>
    </>
  );
}
