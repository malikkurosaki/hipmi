"use client";

import { RouterAdminDonasi_OLD } from "@/app/lib/router_hipmi/router_admin";
import {
  ActionIcon,
  Box,
  Button,
  Center,
  Group,
  Modal,
  Pagination,
  Paper,
  ScrollArea,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import {
  IconChevronLeft,
  IconEyeCheck,
  IconEyeClosed,
  IconEyeEdit,
  IconSearch,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import ComponentAdminDonasi_TombolKembali from "../component/tombol_kembali";
import { useDisclosure } from "@mantine/hooks";
import AdminDonasi_DetailReview from "../detail/detail_review";
import { MODEL_DONASI } from "@/app_modules/donasi/model/interface";
import { useState } from "react";
import TampilanRupiahDonasi from "@/app_modules/donasi/component/tampilan_rupiah";
import ComponentAdminGlobal_HeaderTamplate from "../../component/header_tamplate";
import adminDonasi_getListReject from "../fun/get/get_list_reject";

export default function AdminDonasi_TableReject({
  dataReject,
}: {
  dataReject: any;
}) {
  return (
    <>
      <Stack h={"100%"}>
        <ComponentAdminGlobal_HeaderTamplate name="Donasi" />
        <TableStatus dataReject={dataReject} />
      </Stack>
    </>
  );
}

function TableStatus({ dataReject }: { dataReject: any }) {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [isLoading, setLoading] = useState(false);
  const [idData, setIdData] = useState("");
  const [data, setData] = useState<MODEL_DONASI[]>(dataReject.data);
  const [isNPage, setNPage] = useState(dataReject.nPage);
  const [isActivePage, setActivePage] = useState(1);
  const [isSearch, setSearch] = useState("");

  async function onSearch(s: string) {
    setSearch(s);
    const loadData = await adminDonasi_getListReject({
      page: 1,
      search: s,
    });
    setData(loadData.data as any);
    setNPage(loadData.nPage);
  }

  async function onPageClick(p: any) {
    setActivePage(p);
    const loadData = await adminDonasi_getListReject({
      search: isSearch,
      page: p,
    });
    setData(loadData.data as any);
    setNPage(loadData.nPage);
  }

  const TableRows = data.map((e, i) => (
    <tr key={i}>
      <td>
        <Center>{e?.Author?.username}</Center>
      </td>
      <td>
        <Center>{e?.title}</Center>
      </td>
      <td>
        <Center>
          <TampilanRupiahDonasi nominal={+e?.target} />
        </Center>
      </td>
      <td>
        <Center>{e?.DonasiMaster_Ketegori.name}</Center>
      </td>
      <td>
        <Center>{e?.DonasiMaster_Durasi.name} hari</Center>
      </td>
      <td>
        <Center>
          <Button
            color={"red"}
            leftIcon={<IconEyeEdit />}
            radius={"xl"}
            variant="outline"
            onClick={() =>
              router.push(RouterAdminDonasi_OLD.detail_reject + `${e.id}`)
            }
          >
            Lihat Alasan
          </Button>
        </Center>

        {/* <ModalReject opened={opened} close={close} /> */}
      </td>
    </tr>
  ));

  return (
    <>
      <Stack spacing={"xs"} h={"100%"}>
        {/* <pre>{JSON.stringify(listUser, null, 2)}</pre> */}
        <Group
          position="apart"
          bg={"red.4"}
          p={"xs"}
          style={{ borderRadius: "6px" }}
        >
          <Title order={4}>Reject</Title>
          <TextInput
            icon={<IconSearch size={20} />}
            radius={"xl"}
            placeholder="Masukan judul"
            onChange={(val) => {
              onSearch(val.currentTarget.value);
            }}
          />
        </Group>

        <Paper p={"md"} withBorder shadow="lg" h={"80vh"}>
          <ScrollArea w={"100%"} h={"90%"}>
            <Table
              verticalSpacing={"md"}
              horizontalSpacing={"md"}
              p={"md"}
              w={1500}
              striped
              highlightOnHover
            >
              <thead>
                <tr>
                  <th>
                    <Center>Username</Center>
                  </th>
                  <th>
                    <Center>Judul</Center>
                  </th>
                  <th>
                    <Center>Target</Center>
                  </th>
                  <th>
                    <Center>Ketegori</Center>
                  </th>
                  <th>
                    <Center>Durasi</Center>
                  </th>
                  <th>
                    <Center>Alasan</Center>
                  </th>
                </tr>
              </thead>
              <tbody>{TableRows}</tbody>
            </Table>
          </ScrollArea>
          {/* <ScrollArea>
          </ScrollArea> */}
          <Center mt={"xl"}>
            <Pagination
              value={isActivePage}
              total={isNPage}
              onChange={(val) => {
                onPageClick(val);
              }}
            />
          </Center>
        </Paper>
      </Stack>

      {data.map((e, i) => (
        <Modal
          key={e.id}
          opened={opened}
          onClose={close}
          centered
          withCloseButton={false}
        >
          <Stack>
            <Title order={6}>Alasan penolakan</Title>
            <Text>{i}</Text>
          </Stack>
        </Modal>
      ))}
    </>
  );
}

async function ModalReject(opened: any, close: any) {
  return (
    <>
      <Modal opened={opened} onClose={close} centered withCloseButton={false}>
        <Stack>
          <Title order={6}>Alasan penolakan</Title>
          <Text>{"test"}</Text>
        </Stack>
      </Modal>
    </>
  );
}
