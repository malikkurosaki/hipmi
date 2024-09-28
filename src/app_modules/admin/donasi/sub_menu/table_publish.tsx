"use client";

import { RouterAdminDonasi_OLD } from "@/app/lib/router_hipmi/router_admin";
import {
  ActionIcon,
  Box,
  Button,
  Center,
  Group,
  Pagination,
  Paper,
  ScrollArea,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { IconChevronLeft, IconEyeCheck, IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import ComponentAdminDonasi_TombolKembali from "../component/tombol_kembali";
import { MODEL_DONASI } from "@/app_modules/donasi/model/interface";
import { useState } from "react";
import TampilanRupiahDonasi from "@/app_modules/donasi/component/tampilan_rupiah";
import ComponentAdminGlobal_HeaderTamplate from "../../component_global/header_tamplate";
import adminDonasi_getListPublish from "../fun/get/get_list_publish";

export default function AdminDonasi_TablePublish({
  listPublish,
}: {
  listPublish: any;
}) {
  return (
    <>
      <Stack h={"100%"}>
        <ComponentAdminGlobal_HeaderTamplate name="Donasi" />
        <TableStatus listPublish={listPublish as any} />
      </Stack>
    </>
  );
}

function TableStatus({ listPublish }: { listPublish: any }) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [idData, setIdData] = useState("");

  const [data, setData] = useState<MODEL_DONASI[]>(listPublish.data);
  const [isNPage, setNPage] = useState(listPublish.nPage);
  const [isActivePage, setActivePage] = useState(1);
  const [isSearch, setSearch] = useState("");

  async function onSearch(s: string) {
    setSearch(s);
    const loadData = await adminDonasi_getListPublish({
      page: 1,
      search: s,
    });
    setData(loadData.data as any);
    setNPage(loadData.nPage);
  }

  async function onPageClick(p: any) {
    setActivePage(p);
    const loadData = await adminDonasi_getListPublish({
      search: isSearch,
      page: p,
    });
    setData(loadData.data as any);
    setNPage(loadData.nPage);
  }

  const TableRows = data.map((e, i) => (
    <tr key={i}>
      <td>
        <Center>{e.title}</Center>
      </td>
      <td>
        <Center>
          <TampilanRupiahDonasi nominal={+e.target} />
        </Center>
      </td>
      <td>
        <Center>
          <TampilanRupiahDonasi nominal={+e.terkumpul} />
        </Center>
      </td>
      <td>
        <Center>{e.DonasiMaster_Ketegori.name}</Center>
      </td>
      <td>
        <Center>{e.DonasiMaster_Durasi.name} hari</Center>
      </td>
      <td>
        <Center>
          <Button
            loaderPosition="center"
            loading={isLoading && e?.id === idData ? true : false}
            color={"green"}
            leftIcon={<IconEyeCheck />}
            radius={"xl"}
            variant="outline"
            onClick={() => {
              setLoading(true);
              setIdData(e?.id);
              router.push(RouterAdminDonasi_OLD.detail_publish + `${e.id}`);
            }}
          >
            Tampilkan
          </Button>
        </Center>
      </td>
    </tr>
  ));

  return (
    <>
      <Stack spacing={"xs"} h={"100%"}>
        {/* <pre>{JSON.stringify(listUser, null, 2)}</pre> */}
        <Group
          position="apart"
          bg={"green.4"}
          p={"xs"}
          style={{ borderRadius: "6px" }}
        >
          <Title order={4}>Publish</Title>
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
                    <Center>Judul</Center>
                  </th>
                  <th>
                    <Center>Target</Center>
                  </th>
                  <th>
                    <Center>Terkumpul</Center>
                  </th>
                  <th>
                    <Center>Ketegori</Center>
                  </th>
                  <th>
                    <Center>Durasi</Center>
                  </th>
                  <th>
                    <Center>Aksi</Center>
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
    </>
  );
}
