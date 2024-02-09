"use client";

import { RouterProfile } from "@/app/lib/router_hipmi/router_katalog";
import ComponentAdminGlobal_HeaderTamplate from "@/app_modules/admin/component/header_tamplate";
import { AdminEvent_getListPesertaById } from "@/app_modules/admin/event/fun/get/get_list_peserta_by_id";
import {
  MODEL_EVENT,
  MODEL_EVENT_PESERTA,
} from "@/app_modules/event/model/interface";
import {
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Grid,
  Group,
  Modal,
  Paper,
  Spoiler,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEyeShare } from "@tabler/icons-react";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminVote_TablePublish() {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Voting: Table Publish" />
        <TableStatus listPublish={[]} />
      </Stack>
    </>
  );
}

function TableStatus({ listPublish }: { listPublish: any[] }) {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [data, setData] = useState(listPublish);
  const [peserta, setPeserta] = useState<any[]>();
  const [eventId, setEventId] = useState("");
  const [loading, setLoading] = useState(false);

  const TableRows = data.map((e, i) => (
    <tr key={i}>
      <td>
        <Center>{e.title}</Center>
      </td>
      <td>
        <Center>
          <Spoiler hideLabel="sembunyikan" maxHeight={50} showLabel="tampilkan">
            {e.deskripsi}
          </Spoiler>
        </Center>
      </td>
      <td>
        <Center>Mulai vote</Center>
      </td>
      <td>
        <Center>Selesai vote</Center>
      </td>

      <td>
        <Center>
          <Button
            loading={
              e.id === eventId ? (loading === true ? true : false) : false
            }
            color={"green"}
            leftIcon={<IconEyeShare />}
            radius={"xl"}
            onClick={async () => {
              setEventId(e.id);
              setLoading(true);
              await new Promise((v) => setTimeout(v, 500));
              await AdminEvent_getListPesertaById(e.id).then((res: any) => {
                setPeserta(res);
                setLoading(false);
              });
              open();
            }}
          >
            Hasil Voting
          </Button>
        </Center>
      </td>
    </tr>
  ));

  return (
    <>
      <Modal opened={opened} onClose={close}>
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
                          e.User.Profile.imagesId
                        }
                      />
                    </Grid.Col>
                    <Grid.Col span={"auto"}>
                      <Group align="center" h={"100%"}>
                        <Text>{e.User.Profile.name}</Text>
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
        <Box bg={"green.1"} p={"xs"}>
          <Title order={6} c={"green"}>
            PUBLISH
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
                <Center>Judul</Center>
              </th>
              <th>
                <Center>Deskripsi</Center>
              </th>
              <th>
                <Center>Mulai Vote</Center>
              </th>
              <th>
                <Center>Selesai Vote</Center>
              </th>

              <th>
                <Center>Aksi</Center>
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
