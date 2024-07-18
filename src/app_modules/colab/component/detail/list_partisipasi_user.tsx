"use client";

import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_InputCountDown from "@/app_modules/_global/component/input_countdown";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import {
  ActionIcon,
  Box,
  Button,
  Center,
  Drawer,
  Group,
  Paper,
  ScrollArea,
  Stack,
  Text,
  Textarea,
  Title
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";
import { useState } from "react";
import colab_funCreatePartisipan from "../../fun/create/fun_create_partisipan_by_user_id";
import colab_getListPartisipanByColabId from "../../fun/get/get_list_partisipan_by_id";
import {
  MODEL_COLLABORATION_PARTISIPASI
} from "../../model/interface";
import ComponentColab_AuthorNameOnListPartisipan from "./header_author_list_partisipan";

export default function ComponentColab_DetailListPartisipasiUser({
  listPartisipan,
  userLoginId,
  authorId,
  colabId,
  cekPartisipan,
}: {
  listPartisipan?: MODEL_COLLABORATION_PARTISIPASI[];
  userLoginId?: string;
  authorId?: string;
  colabId?: string;
  cekPartisipan?: boolean;
}) {
  const [apply, setApply] = useState(false);
  const [data, setData] = useState(listPartisipan);
  const [opened, { open, close }] = useDisclosure(false);
  const [deskripsi, setDeskripsi] = useState("");

  async function onJoin() {
    await colab_funCreatePartisipan(
      colabId as any,
      userLoginId as any,
      deskripsi
    ).then(async (res) => {
      if (res.status === 201) {
        await colab_getListPartisipanByColabId(colabId as any).then((val) => {
          setApply(true);
          close();
          setData(val as any);
          ComponentGlobal_NotifikasiBerhasil(res.message);
        });
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    });
  }

  return (
    <>
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
        <Stack spacing={"xs"}>
          <Group position="right">
            <ActionIcon onClick={close} variant="transparent">
              <IconX color="white" />
            </ActionIcon>
          </Group>
          <Textarea
          maxLength={300}
            label="Deskripsi Diri"
            placeholder="Deskripsikan diri anda yang sesuai dengan proyek ini.."
            minRows={4}
            onChange={(val) => {
              setDeskripsi(val.currentTarget.value);
            }}
          />
          <Group position="apart">
            {/* <Button radius={"xl"} onClick={() => close()}>
              Batal
            </Button> */}
            <ComponentGlobal_InputCountDown lengthInput={deskripsi?.length} maxInput={300}/>
            <Button
              disabled={!deskripsi}
              radius={"xl"}
              color="yellow"
              bg={MainColor.yellow}
              onClick={() => onJoin()}
              style={{
                transition: "0.5s"
              }}
            >
              Simpan
            </Button>
          </Group>
        </Stack>
      </Drawer>

      <Stack>
        {userLoginId !== authorId ? (
          <Center>
            <Button
              radius={"xl"}
              disabled={cekPartisipan ? true : false}
              color={cekPartisipan ? "green" : "yellow"}
              onClick={open}
              // bg={MainColor.yellow}
            >
              {cekPartisipan ? "Telah Berpartisipasi" : "Partisipasi"}
            </Button>
          </Center>
        ) : (
          ""
        )}

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
          <Stack spacing={"xl"}>
            <Center>
              <Title order={5}>Partispasi User ({data?.length})</Title>
            </Center>{" "}
            <ScrollArea h={data?.length === 0 ? 30 : 400}>
              <Box>
                <Stack>
                  {data?.length === 0 ? (
                    <Center>
                      <Text fz={"xs"} fw={"bold"} c={"gray"}>
                        Tidak ada partisipan
                      </Text>
                    </Center>
                  ) : (
                    data?.map((e, i) => (
                      <Box key={i}>
                        <ComponentColab_AuthorNameOnListPartisipan
                          isPembatas={true}
                          author={e.User}
                          deskripsi={e.deskripsi_diri}
                        />
                      </Box>
                    ))
                  )}
                </Stack>
              </Box>
            </ScrollArea>
          </Stack>
        </Paper>
      </Stack>
    </>
  );
}
