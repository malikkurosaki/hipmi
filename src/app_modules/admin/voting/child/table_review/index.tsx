"use client";

import { RouterProfile } from "@/app/lib/router_hipmi/router_katalog";
import ComponentAdminGlobal_HeaderTamplate from "@/app_modules/admin/component/header_tamplate";
import { AdminEvent_getListPesertaById } from "@/app_modules/admin/event/fun/get/get_list_peserta_by_id";
import { Avatar, Box, Button, Center, Divider, Grid, Group, Modal, Paper, Spoiler, Stack, Table, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBan } from "@tabler/icons-react";
import { IconEyeShare } from "@tabler/icons-react";
import _ from "lodash";
import { useRouter } from "next/navigation";

import { useState } from "react";

export default function AdminVote_TableReview() {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Voting: Table Review" />
        <TableStatus listData={[]}/>
      </Stack>
    </>
  );
}

function TableStatus({ listData }: { listData: any[] }) {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [data, setData] = useState(listData);
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
        <Stack align="center">
          <Button
            w={150}
            color={"green"}
            leftIcon={<IconEyeShare />}
            radius={"xl"}
            // onClick={() => onPublish(e.id, setData)}
          >
            Publish
          </Button>
          <Button
            w={150}
            color={"red"}
            leftIcon={<IconBan />}
            radius={"xl"}
            // onClick={() => {
            //   open();
            //   setEventId(e.id);
            // }}
          >
            Reject
          </Button>
        </Stack>
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
        <Box bg={"orange.1"} p={"xs"}>
          <Title order={6} c={"orange"}>
            REVIEW
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
