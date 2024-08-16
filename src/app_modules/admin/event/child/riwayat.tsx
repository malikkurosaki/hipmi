"use client";

import {
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Grid,
  Group,
  Loader,
  Modal,
  Paper,
  SimpleGrid,
  Spoiler,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";
import {
  MODEL_EVENT,
  MODEL_EVENT_PESERTA,
} from "@/app_modules/event/model/interface";
import { data } from "autoprefixer";
import _ from "lodash";
import moment from "moment";
import { IconEyeShare } from "@tabler/icons-react";
import { useDisclosure, useShallowEffect } from "@mantine/hooks";
import { useState } from "react";
import { AdminEvent_getListPesertaById } from "../fun/get/get_list_peserta_by_id";
import { RouterProfile } from "@/app/lib/router_hipmi/router_katalog";

export default function AdminEvent_Riwayat({
  listRiwayat,
}: {
  listRiwayat: any;
}) {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Event: Riwayat" />
        <DetailRiwayat listRiwayat={listRiwayat} />
      </Stack>
    </>
  );
}

function DetailRiwayat({ listRiwayat }: { listRiwayat: MODEL_EVENT[] }) {
  const [opened, setOpen] = useState(false);
  const [peserta, setPeserta] = useState<MODEL_EVENT_PESERTA[]>();
  const [eventId, setEventId] = useState("");
  const [loading, setLoading] = useState(false);

  const TableRows = listRiwayat.map((e, i) => (
    <tr key={e.id}>
      <td>
        <Button
          loading={e.id === eventId ? (loading === true ? true : false) : false}
          color={"green"}
          leftIcon={<IconEyeShare />}
          radius={"xl"}
          onClick={async () => {
            setEventId(e.id);
            setLoading(true);
            await new Promise((r) => setTimeout(r, 500));
            await AdminEvent_getListPesertaById(e.id).then((res: any) => {
              setLoading(false);
              setPeserta(res);
            });
            setOpen(true);
          }}
        >
          Peserta
        </Button>
      </td>
      <td>{e?.Author?.Profile?.name}</td>
      <td>{e?.title}</td>
      <td>{e?.lokasi}</td>
      <td>{e?.EventMaster_TipeAcara?.name}</td>
      <td>{e?.tanggal.toLocaleString("id-ID", { dateStyle: "full" })}</td>
      <td>
        {e.tanggal.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </td>
      <td>
        <Spoiler hideLabel="sembunyikan" maxHeight={50} showLabel="tampilkan">
          {e.deskripsi}
        </Spoiler>
      </td>
    </tr>
  ));

  useShallowEffect(() => {
    getAllPeserta(eventId);
  }, [eventId]);

  async function getAllPeserta(eventId: string) {
    await AdminEvent_getListPesertaById(eventId).then((res: any) =>
      setPeserta(res)
    );
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpen(false)}
        size={"md"}
        // closeOnClickOutside={false}
        withCloseButton={false}
      >
        <Paper>
          <Stack>
            <Center>
              <Title order={3}>Daftar Peserta</Title>
            </Center>
            <Stack>
              {peserta?.map((e) => (
                <Stack key={e.id} spacing={"xs"}>
                  <Grid>
                    <Grid.Col span={"content"}>
                      <Avatar
                        sx={{ borderStyle: "solid", borderWidth: "0.5px" }}
                        radius={"xl"}
                        src={
                          RouterProfile.api_foto_profile +
                          e?.User?.Profile?.imagesId
                        }
                      />
                    </Grid.Col>
                    <Grid.Col span={"auto"}>
                      <Group align="center" h={"100%"}>
                        <Text>{e?.User?.Profile?.name}</Text>
                      </Group>
                    </Grid.Col>
                  </Grid>
                  <Divider />
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Paper>
      </Modal>

      <Box>
        <Box bg={"gray.1"} p={"xs"}>
          <Title order={6} c={"gray"}>
            RIWAYAT
          </Title>
        </Box>
        <Table
          withBorder
          verticalSpacing={"md"}
          horizontalSpacing={"xl"}
          p={"md"}
          striped
          highlightOnHover
        >
          <thead>
            <tr>
              <th>
                <Center>Aksi</Center>
              </th>
              <th>
                <Center>Author</Center>
              </th>
              <th>
                <Center>Judul</Center>
              </th>
              <th>
                <Center>Lokasi</Center>
              </th>
              <th>Tipe Acara</th>
              <th>Tanggal</th>
              <th>Jam</th>
              <th>
                <Center>Deskripsi</Center>
              </th>
            </tr>
          </thead>
          <tbody>{TableRows}</tbody>
        </Table>
        <Center>
          {_.isEmpty(TableRows) ? (
            <Center h={"50vh"}>
              <Title order={6}>Tidak Ada Data</Title>
            </Center>
          ) : (
            ""
          )}
        </Center>
      </Box>
    </>
  );
}
