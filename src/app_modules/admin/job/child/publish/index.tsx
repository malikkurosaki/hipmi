"use client";

import { RouterAdminJob } from "@/app/lib/router_admin/router_admin_job";
import ComponentAdminGlobal_HeaderTamplate from "@/app_modules/admin/component_global/header_tamplate";
import { MODEL_JOB } from "@/app_modules/job/model/interface";
import {
  Badge,
  Button,
  Center,
  Group,
  Pagination,
  Paper,
  ScrollArea,
  Spoiler,
  Stack,
  Table,
  Text,
  TextInput,
  Title
} from "@mantine/core";
import {
  IconEyeCheck,
  IconSearch
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import adminJob_getListPublish from "../../fun/get/get_list_publish";
import { IconPhotoCheck } from "@tabler/icons-react";

export default function AdminJob_TablePublish({
  dataPublish,
}: {
  dataPublish: any;
}) {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Job Vacancy" />
        <TableStatus dataPublish={dataPublish} />
      </Stack>
    </>
  );
}

function TableStatus({ dataPublish }: { dataPublish: any }) {
  const router = useRouter();

  const [data, setData] = useState<MODEL_JOB[]>(dataPublish.data);
  const [nPage, setNPage] = useState(dataPublish.nPage);
  const [activePage, setActivePage] = useState(1);
  const [isSearch, setSearch] = useState("");


  async function onSearch(s: string) {
    setSearch(s);
    setActivePage(1);
    const loadData = await adminJob_getListPublish({
      page: 1,
      search: s,
    });
    setData(loadData.data as any);
    setNPage(loadData.nPage);
  }

  async function onPageClick(p: any) {
    setActivePage(p);
    const loadData = await adminJob_getListPublish({
      search: isSearch,
      page: p,
    });
    setData(loadData.data as any);
    setNPage(loadData.nPage);
  }

  const TableRows = data?.map((e, i) => (
    <tr key={i}>
      <td>
        <Center w={150}>
          <Text>{e?.Author?.username}</Text>
        </Center>
      </td>
      <td>
        <Center w={150}>
          <Text>
            {e?.isArsip ? (
              <Badge variant="light">Arsip</Badge>
            ) : (
              <Badge color="green">Publish</Badge>
            )}
          </Text>
        </Center>
      </td>
      <td>
        <Spoiler
          w={300}
          maxHeight={50}
          hideLabel="sembunyikan"
          showLabel="tampilkan"
        >
          {e.title}
        </Spoiler>
      </td>
      <td>
        <Center w={200}>
          {e.imagesId ? (
            <Button
              color="green"
              radius={"xl"}
              leftIcon={<IconPhotoCheck />}
              onClick={() => {
                router.push(RouterAdminJob.detail_poster + e?.imagesId);
              }}
            >
              Lihat
            </Button>
          ) : (
            <Center w={200} >
              <Text fw={"bold"} fz={"xs"} fs={"italic"}>
                Tidak ada poster
              </Text>
            </Center>
          )}
        </Center>
      </td>
      <td>
        <Spoiler
          hideLabel="sembunyikan"
          w={400}
          maxHeight={50}
          showLabel="tampilkan"
        >
          <div dangerouslySetInnerHTML={{ __html: e.content }} />
        </Spoiler>
      </td>
      <td>
        <Spoiler
          hideLabel="sembunyikan"
          w={400}
          maxHeight={50}
          showLabel="tampilkan"
        >
          <div dangerouslySetInnerHTML={{ __html: e.deskripsi }} />
        </Spoiler>
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
          <Title order={4} c={"white"}>
            Publish
          </Title>
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
              w={"100%"}
              h={"100%"}
              striped
              highlightOnHover
            >
              <thead>
                <tr>
                  <th>
                    <Center>Author</Center>
                  </th>
                  <th>
                    <Center>Status</Center>
                  </th>
                  <th>
                    <Text>Judul</Text>
                  </th>
                  <th>
                    <Center>Poster</Center>
                  </th>
                  <th>
                    <Text>Syarat Ketentuan</Text>
                  </th>
                  <th>
                    <Text>Deskripsi</Text>
                  </th>
                </tr>
              </thead>
              <tbody>{TableRows}</tbody>
            </Table>
          </ScrollArea>
          <Center mt={"xl"}>
            <Pagination
              value={activePage}
              total={nPage}
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
