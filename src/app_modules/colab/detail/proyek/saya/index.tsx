"use client";

import { RouterColab } from "@/app/lib/router_hipmi/router_colab";
import ComponentColab_DetailData from "@/app_modules/colab/component/detail/detail_data";
import ComponentColab_AuthorNameOnListPartisipan from "@/app_modules/colab/component/detail/header_author_list_partisipan";
import ComponentColab_AuthorNameOnHeader from "@/app_modules/colab/component/header_author_name";
import ComponentColab_IsEmptyData from "@/app_modules/colab/component/is_empty_data";
import colab_funCreateRoomChat from "@/app_modules/colab/fun/create/fun_create_room_chat";
import { gs_colab_hot_menu } from "@/app_modules/colab/global_state";
import {
  MODEL_COLLABORATION,
  MODEL_COLLABORATION_PARTISIPASI,
} from "@/app_modules/colab/model/interface";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/component_global/notif_global/notifikasi_gagal";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/component_global/notif_global/notifikasi_peringatan";
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

export default function Colab_DetailProyekSaya({
  dataColab,
  listPartisipan,
}: {
  dataColab: MODEL_COLLABORATION;
  listPartisipan: MODEL_COLLABORATION_PARTISIPASI[];
}) {
  return (
    <>
      <Stack px={5} spacing={"xl"}>
        <ComponentColab_DetailData data={dataColab} />
        <CheckBoxPartisipan
          listPartisipan={listPartisipan}
          colabId={dataColab.id}
        />
      </Stack>
    </>
  );
}

function CheckBoxPartisipan({
  listPartisipan,
  colabId,
}: {
  listPartisipan: MODEL_COLLABORATION_PARTISIPASI[];
  colabId: string;
}) {
  const [value, setValue] = useState<string[]>([]);

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

  return (
    <>
      <Stack>
        {/* <pre>{JSON.stringify(listPartisipan,null,2)}</pre> */}
        <Paper withBorder shadow="lg" p={"sm"}>
          {/* {JSON.stringify(value, null, 2)} */}
          <Stack>
            <Stack spacing={5}>
              <Text c={"red"} fz={10}>
                *
                <Text px={"xs"} span inherit c={"gray"}>
                  Pilih user yang akan menjadi tim proyek anda
                </Text>
              </Text>
              <Text c={"red"} fz={10}>
                *
                <Text px={"xs"} span inherit c={"gray"}>
                  Room chat dapat dibentuk jika ada 2 user yang dipilih
                </Text>
              </Text>
            </Stack>
            <ScrollArea h={400} offsetScrollbars>
              <Checkbox.Group value={value} onChange={setValue}>
                <Stack mt="xs">
                  {_.isEmpty(listPartisipan) ? (
                    <ComponentColab_IsEmptyData text="Tidak Ada Pertisipan" />
                  ) : (
                    listPartisipan.map((e, i) => (
                      <Grid key={i} align="center">
                        <Grid.Col span={"content"}>
                          <Checkbox value={e?.User?.id} />
                        </Grid.Col>
                        <Grid.Col span={"auto"}>
                          <ComponentColab_AuthorNameOnListPartisipan
                            isPembatas={true}
                            author={e?.User}
                            deskripsi={e?.deskripsi_diri}
                          />
                        </Grid.Col>
                      </Grid>
                    ))
                  )}
                </Stack>
              </Checkbox.Group>
            </ScrollArea>
          </Stack>
        </Paper>
        <ButtonAction value={value} colabId={colabId} />
      </Stack>
    </>
  );
}

function ButtonAction({
  value,
  colabId,
}: {
  value: string[];
  colabId: string;
}) {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [hotMenu, setHotMenu] = useAtom(gs_colab_hot_menu);
  const [nameRoom, setNameRoom] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSave() {
    if (nameRoom === "")
      return ComponentGlobal_NotifikasiPeringatan("Isi Nama Grup");
    await colab_funCreateRoomChat(nameRoom, value, colabId).then((res) => {
      console.log(res);
      if (res.status === 201) {
        setLoading(true);
        close();
        ComponentGlobal_NotifikasiBerhasil("Berhasil Membuat Grup");
        setHotMenu(4);
        router.push(RouterColab.grup_diskusi);
      } else {
        ComponentGlobal_NotifikasiGagal("Gagal Membuat Grup");
      }
    });
  }

  return (
    <>
      <Button
        radius={"xl"}
        disabled={value.length >= 1 ? false : true}
        onClick={() => {
          open();
        }}
      >
        Buat Ruang Diskusi{" "}
      </Button>

      <Drawer
        opened={opened}
        onClose={close}
        position="bottom"
        size={150}
        withCloseButton={false}
      >
        <Stack>
          <Title order={6}>Nama Grup Diskusi</Title>
          <TextInput
            placeholder="Masukan nama grup diskusi .."
            radius={"xl"}
            onChange={(val) => {
              setNameRoom(val.currentTarget.value);
            }}
          />
          <Group grow>
            <Button radius={"xl"} onClick={close}>
              Batal
            </Button>
            <Button
              loaderPosition="center"
              loading={loading ? true : false}
              radius={"xl"}
              color="green"
              onClick={() => onSave()}
            >
              Simpan
            </Button>
          </Group>
        </Stack>
      </Drawer>
    </>
  );
}
