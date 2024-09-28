"use client";

import {
  Paper,
  Center,
  Title,
  ScrollArea,
  Box,
  Stack,
  Text,
  Divider,
  Button,
  Drawer,
  Textarea,
  Group,
} from "@mantine/core";
import ComponentColab_AuthorNameOnHeader from "../header_author_name";
import {
  MODEL_COLLABORATION_MASTER,
  MODEL_COLLABORATION_PARTISIPASI,
} from "../../model/interface";
import _ from "lodash";
import { useState } from "react";
import colab_funCreatePartisipan from "../../fun/create/fun_create_partisipan_by_user_id";
import colab_getListPartisipanByColabId from "../../fun/get/get_list_partisipan_by_id";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { useDisclosure } from "@mantine/hooks";
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
        size={"30vh"}
        withCloseButton={false}
      >
        <Stack>
          <Textarea
            label="Deskripsi Diri"
            placeholder="Deskripsikan diri anda yang sesuai dengan proyek ini.."
            minRows={4}
            onChange={(val) => {
              setDeskripsi(val.currentTarget.value);
            }}
          />
          <Group position="center">
            <Button radius={"xl"} onClick={() => close()}>
              Batal
            </Button>
            <Button radius={"xl"} color="green" onClick={() => onJoin()}>
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
              color={cekPartisipan ? "green" : "blue"}
              onClick={() => {
                // onJoin();
                open();
              }}
            >
              {cekPartisipan ? "Telah Berpartisipasi" : "Partisipasi"}
            </Button>
          </Center>
        ) : (
          ""
        )}

        <Paper withBorder p={"md"}>
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
