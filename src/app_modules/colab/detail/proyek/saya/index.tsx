"use client";

import { RouterColab } from "@/app/lib/router_hipmi/router_colab";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_CardStyles } from "@/app_modules/_global/component";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import ComponentColab_DetailData from "@/app_modules/colab/component/detail/detail_data";
import ComponentColab_AuthorNameOnListPartisipan from "@/app_modules/colab/component/detail/header_author_list_partisipan";
import ComponentColab_IsEmptyData from "@/app_modules/colab/component/is_empty_data";
import colab_funCreateRoomChat from "@/app_modules/colab/fun/create/fun_create_room_chat";
import { gs_colab_hot_menu } from "@/app_modules/colab/global_state";
import {
  MODEL_COLLABORATION,
  MODEL_COLLABORATION_PARTISIPASI,
} from "@/app_modules/colab/model/interface";
import mqtt_client from "@/util/mqtt_client";
import {
  ActionIcon,
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
import { IconX } from "@tabler/icons-react";
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
      <ComponentGlobal_CardStyles marginBottom={"15px"}>
        <Stack>
          <ComponentColab_DetailData data={dataColab} />
          <CheckBoxPartisipan
            listPartisipan={listPartisipan}
            colabId={dataColab.id}
          />
        </Stack>
      </ComponentGlobal_CardStyles>
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

  return (
    <>
      <Stack>
        {/* <pre>{JSON.stringify(listPartisipan,null,2)}</pre> */}
        <Paper
          style={{
            border: `2px solid ${AccentColor.softblue}`,
            backgroundColor: AccentColor.blue,
            color: "white",
            borderRadius: "10px",
            marginBottom: "20px",
            padding: "15px",
          }}
        >
          {/* {JSON.stringify(value, null, 2)} */}
          <Stack>
            <Stack spacing={5}>
              <Text c={"red"} fz={10}>
                *
                <Text px={"xs"} span inherit c={"white"}>
                  Pilih user yang akan menjadi tim proyek anda
                </Text>
              </Text>
              {/* <Text c={"red"} fz={10}>
                *
                <Text px={"xs"} span inherit c={"white"}>
                  Room chat dapat dibentuk jika ada 2 user yang dipilih
                </Text>
              </Text> */}
            </Stack>
            <ScrollArea h={400} offsetScrollbars>
              <Checkbox.Group value={value} onChange={setValue}>
                <Stack mt="xs">
                  {_.isEmpty(listPartisipan) ? (
                    <ComponentColab_IsEmptyData text="Tidak Ada Pertisipan" />
                  ) : (
                    listPartisipan.map((e, i) => (
                      <Grid key={i} align="center">
                        <Grid.Col span={2}>
                          <Checkbox color={"yellow"} value={e?.User?.id} />
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
      return ComponentGlobal_NotifikasiPeringatan("Lengkapi Nama Grup");

    // await notifikasiToUser_CreateGroupCollaboration({ colabId: colabId });

    const res = await colab_funCreateRoomChat(nameRoom, value, colabId);
    if (res.status === 201) {
      for (let a of value) {
        mqtt_client.publish(
          "USER",
          JSON.stringify({
            userId: a,
            count: 1,
          })
        );
      }

      setLoading(true);
      ComponentGlobal_NotifikasiBerhasil("Berhasil Membuat Grup");
      setHotMenu(4);
      router.push(RouterColab.grup_diskusi);
    } else {
      ComponentGlobal_NotifikasiGagal("Gagal Membuat Grup");
    }
  }

  return (
    <>
      <Button
        radius={"xl"}
        disabled={value.length >= 1 ? false : true}
        onClick={() => {
          open();
        }}
        bg={MainColor.yellow}
        color="yellow"
        c={"black"}
        style={{
          transition: "0.5s",
        }}
      >
        Buat Ruang Diskusi{" "}
      </Button>

      <Drawer
        opened={opened}
        onClose={close}
        position="bottom"
        size={"auto"}
        withCloseButton={false}
        styles={{
          content: {
            padding: 0,
            position: "absolute",
            margin: "auto",
            backgroundColor: "transparent",
            left: 0,
            right: 0,
            width: 500,
          },
          body: {
            backgroundColor: AccentColor.darkblue,
            borderTop: `2px solid ${AccentColor.blue}`,
            borderRight: `1px solid ${AccentColor.blue}`,
            borderLeft: `1px solid ${AccentColor.blue}`,
            borderRadius: "20px 20px 0px 0px",
            color: "white",
            paddingBottom: "5%",
          },
        }}
      >
        <Stack>
          <Group position="apart">
            <Title order={6}>Nama Grup Diskusi</Title>
            <ActionIcon onClick={close} variant="transparent">
              <IconX color="white" />
            </ActionIcon>
          </Group>
          <TextInput
            placeholder="Masukan nama grup diskusi .."
            radius={"xl"}
            onChange={(val) => {
              setNameRoom(val.currentTarget.value);
            }}
          />
          <Group position="right">
            <Button
              disabled={!nameRoom}
              loaderPosition="center"
              loading={loading ? true : false}
              radius={"xl"}
              color="yellow"
              c={"black"}
              bg={MainColor.yellow}
              onClick={() => onSave()}
              style={{
                transition: "0.5s",
              }}
            >
              Simpan
            </Button>
          </Group>
        </Stack>
      </Drawer>
    </>
  );
}
