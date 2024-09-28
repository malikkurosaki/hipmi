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
  Pagination,
  Button,
  Modal,
  SimpleGrid,
  Box,
} from "@mantine/core";
import ComponentAdminGlobal_HeaderTamplate from "../../component_global/header_tamplate";
import {
  MODEL_COLLABORATION,
  MODEL_COLLABORATION_ROOM_CHAT,
} from "@/app_modules/colab/model/interface";
import { IconBan, IconCircleDot, IconEye } from "@tabler/icons-react";
import { useState } from "react";
import adminColab_getOneByColabId from "../fun/get/get_one_by_colab_id";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import ComponentAdminColab_DetailData from "../component/detail_data";
import adminColab_getOneRoomChatById from "../fun/get/get_one_room_chat_by_id";
import adminColab_getListAllGroupChat from "../fun/get/get_list_all_group_chat";

export default function AdminColab_TableGroup({
  listGroup,
}: {
  listGroup: any;
}) {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Project Collaboration" />
        <TableMenu listGroup={listGroup} />
      </Stack>
    </>
  );
}
function TableMenu({ listGroup }: { listGroup: any }) {
  const [data, setData] = useState<MODEL_COLLABORATION_ROOM_CHAT[]>(
    listGroup.data
  );
  const [isNPage, setNPage] = useState(listGroup.nPage);
  const [activePage, setActivePage] = useState(1);

  const [idProject, setIdProject] = useState("");
  const [openDetail, setOpenDetail] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [detailData, setDetailData] = useState<MODEL_COLLABORATION_ROOM_CHAT>();

  // PAGINATION dan No awal  data di tampilkan
  let noAwal = activePage * 5 - 4;
  async function onLoad(pindahPage: any) {
    const load = await adminColab_getListAllGroupChat({ page: pindahPage });
    setActivePage(pindahPage);
    setData(load.data as any);
    setNPage(load.nPage);
  }

  async function onDetailData(roomId: string) {
    setLoadingDetail(true);
    await adminColab_getOneRoomChatById({ roomId: roomId }).then((res) => {
      if (res.status === 200) {
        setIdProject(roomId);
        setLoadingDetail(false);
        setDetailData(res.data as any);
        setOpenDetail(true);
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    });
  }

  const tableRow = data.map((e, i) => (
    <tr key={i}>
      <td>
        <Center>{noAwal++}</Center>
      </td>
      <td>
        <Center>
          <Text lineClamp={1}>
            {e?.ProjectCollaboration?.Author?.Profile?.name}
          </Text>
        </Center>
      </td>
      <td>
        <Center>
          <Text lineClamp={1}>{e?.name}</Text>
        </Center>
      </td>
      <td>
        <Center>
          <Text>
            {e?.ProjectCollaboration?.ProjectCollaborationMaster_Industri?.name}
          </Text>
        </Center>
      </td>
      <td>
        <Center>
          <Text>{e?.ProjectCollaboration_AnggotaRoomChat.length}</Text>
        </Center>
      </td>
      <td>
        <Center>
          <Stack>
            <Button
              loading={
                idProject === e?.id ? (loadingDetail ? true : false) : false
              }
              leftIcon={<IconEye />}
              loaderPosition="center"
              radius={"xl"}
              color="green"
              onClick={() => {
                onDetailData(e?.id);
              }}
            >
              Detail
            </Button>
            {/* <Button
              // loading={
              //   idProject === e?.id ? (loadingReject ? true : false) : false
              // }
              leftIcon={<IconBan />}
              loaderPosition="center"
              radius={"xl"}
              color="red"
              // onClick={() => {
              //   onRejected(e.id);
              // }}
            >
              Reject
            </Button> */}
          </Stack>
        </Center>
      </td>
    </tr>
  ));

  return (
    <>
      <Stack spacing={"xs"}>
        <Group
          position="apart"
          bg={"blue.4"}
          p={"xs"}
          style={{ borderRadius: "6px" }}
        >
          <Title order={4}>Group Chat</Title>
        </Group>
        <Paper p={"md"} withBorder shadow="lg">
          <Stack>
            <ScrollArea h={"65vh"}>
              <Table
                verticalSpacing={"xs"}
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
                      <Center>Admin Room</Center>
                    </th>
                    <th>
                      <Center>Nama Group</Center>
                    </th>
                    <th>
                      <Center>Industri</Center>
                    </th>
                    <th>
                      <Center>Anggota Group</Center>
                    </th>
                    <th>
                      <Center>Aksi</Center>
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

      <Modal
        opened={openDetail}
        onClose={() => setOpenDetail(false)}
        centered
        size={"xl"}
        withCloseButton={false}
      >
        <SimpleGrid cols={2}>
          <Paper bg={"gray.1"} p={"md"} h={500}>
            <ScrollArea h={"100%"} w={"100%"}>
              <ComponentAdminColab_DetailData
                data={detailData?.ProjectCollaboration as any}
              />
            </ScrollArea>
          </Paper>
          <Paper bg={"gray.1"} p={"md"} h={500}>
            <ScrollArea h={"100%"}>
              <Stack>
                <Center>
                  <Title order={4}>Anggota</Title>
                </Center>
                <Stack>
                  {detailData?.ProjectCollaboration_AnggotaRoomChat?.map(
                    (e, i) => (
                      <Box key={i}>
                        <Text lineClamp={1}>
                          <IconCircleDot size={10} />{" "}
                          <Text span inherit>
                            {e?.User?.Profile?.name}
                          </Text>
                        </Text>
                      </Box>
                    )
                  )}
                </Stack>
              </Stack>
            </ScrollArea>
          </Paper>
        </SimpleGrid>
      </Modal>
      {/* <pre>{JSON.stringify(detailData, null, 2)}</pre> */}
    </>
  );
}
