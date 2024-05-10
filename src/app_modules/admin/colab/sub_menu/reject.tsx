"use client";

import {
  Stack,
  Group,
  Title,
  Paper,
  ScrollArea,
  Table,
  Center,
  Text,
  Badge,
  Spoiler,
  Box,
  Pagination,
} from "@mantine/core";
import ComponentAdminGlobal_HeaderTamplate from "../../component/header_tamplate";
import { useState } from "react";
import { MODEL_COLLABORATION } from "@/app_modules/colab/model/interface";
import adminColab_getListAllRejected from "../fun/get/get_list_all_reject";

export default function AdminColab_TableRejected({
  listReject,
}: {
  listReject: any;
}) {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Project Collaboration" />
        <TableMenu listReject={listReject} />
      </Stack>
    </>
  );
}
function TableMenu({ listReject }: { listReject: any }) {
  const [data, setData] = useState<MODEL_COLLABORATION[]>(listReject.data);
  const [isNPage, setNPage] = useState(listReject.nPage);
  const [activePage, setActivePage] = useState(1);

  let noAwal = activePage * 5 - 4;
  async function onLoad(pindahPage: any) {
    const load = await adminColab_getListAllRejected({ page: pindahPage });
    setActivePage(pindahPage);
    setData(load.data as any);
    setNPage(load.nPage);
  }

  const tableRow = data?.map((e, i) => (
    <tr key={i}>
      <td>
        <Center>{noAwal++}</Center>
      </td>
      <td>
        <Center>
          <Text lineClamp={1}>{e?.Author?.Profile?.name}</Text>
        </Center>
      </td>
      <td>
        <Center>
          <Box>
            <Center>
              <Text lineClamp={1}>{e?.title}</Text>
            </Center>
          </Box>
        </Center>
      </td>
      <td>
        <Center>
          <Text>{e?.ProjectCollaborationMaster_Industri.name}</Text>
        </Center>
      </td>
      <td>
        <Center>
          <Text>{e?.ProjectCollaboration_Partisipasi.length}</Text>
        </Center>
      </td>
      <td>
        <Center>
          <Box w={400}>
            <Center>
              <Spoiler
                hideLabel={"sembunyikan"}
                maxHeight={50}
                showLabel="tampilkan"
              >
                {e?.report}
              </Spoiler>
            </Center>
          </Box>
        </Center>

        {/* <Stack>
            <Button
              loading={
                idProject === e?.id ? (loadingDetail ? true : false) : false
              }
              leftIcon={<IconEye />}
              loaderPosition="center"
              radius={"xl"}
              color="green"
              onClick={() => {
                getDetailData(e.id);
              }}
            >
              Detail
            </Button>
            <Button
              loading={
                idProject === e?.id ? (loadingReject ? true : false) : false
              }
              leftIcon={<IconBan />}
              loaderPosition="center"
              radius={"xl"}
              color="red"
              onClick={() => {
                onRejected(e.id);
              }}
            >
              Reject
            </Button>
          </Stack> */}
      </td>
    </tr>
  ));

  return (
    <>
      <Stack spacing={"xs"}>
        <Group
          position="apart"
          bg={"red.4"}
          p={"xs"}
          style={{ borderRadius: "6px" }}
        >
          <Title order={4}>Reject</Title>
        </Group>
        <Paper p={"md"} withBorder shadow="lg">
          <Stack>
            <ScrollArea h={"65vh"}>
              <Table
                verticalSpacing={"lg"}
                horizontalSpacing={"md"}
                p={"md"}
                striped
                highlightOnHover
              >
                <thead>
                  <tr>
                    <th>
                      <Center>No</Center>
                    </th>
                    <th>
                      <Center>Username</Center>
                    </th>
                    <th>
                      <Center>Title</Center>
                    </th>
                    <th>
                      <Center>Industri</Center>
                    </th>
                    <th>
                      <Center>Jumlah Partisipan</Center>
                    </th>
                    <th>
                      <Center>Report</Center>
                    </th>
                  </tr>
                </thead>
                <tbody>{tableRow}</tbody>
              </Table>
            </ScrollArea>
            <Pagination
              position="center"
              total={isNPage}
              value={activePage}
              onChange={(val) => {
                onLoad(val);
              }}
            />
          </Stack>
        </Paper>
      </Stack>
    </>
  );
}
