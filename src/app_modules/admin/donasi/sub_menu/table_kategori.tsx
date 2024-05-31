"use client";

import {
  Stack,
  Group,
  Title,
  Paper,
  ScrollArea,
  Center,
  Pagination,
  Table,
  Grid,
  TextInput,
  Button,
  Text,
  ActionIcon,
  Overlay,
} from "@mantine/core";
import ComponentAdminGlobal_HeaderTamplate from "../../component/header_tamplate";
import { MODEL_NEW_DEFAULT_MASTER } from "@/app_modules/model_global/interface";
import { useState } from "react";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import adminDonasi_funCreateKategori from "../fun/create/fun_create_kategori";
import { ComponentGlobalAdmin_NotifikasiBerhasil } from "../../component/admin_notifikasi/notifikasi_berhasil";
import { ComponentGlobalAdmin_NotifikasiGagal } from "../../component/admin_notifikasi/notifikasi_gagal";
import adminDonasi_getMasterKategori from "../fun/master/get_list_kategori";
import adminDonasi_funDeleteKategori from "../fun/delete/fun_delete_by_id";
import adminDonasi_funUpdatekategoriById from "../fun/update/fun_update_kategori_by_id";

export default function AdminDonasi_TableKategori({
  listKategori,
}: {
  listKategori: MODEL_NEW_DEFAULT_MASTER[];
}) {
  const [list, setList] = useState(listKategori);

  return (
    <>
      <Stack h={"100%"}>
        <ComponentAdminGlobal_HeaderTamplate name="Donasi" />
        <TableView
          list={list}
          onLoadData={(val) => {
            setList(val);
          }}
        />
      </Stack>
    </>
  );
}

function TableView({
  list,
  onLoadData,
}: {
  list: MODEL_NEW_DEFAULT_MASTER[];
  onLoadData: (val: any) => void;
}) {
  const [create, setCreate] = useState("");
  const [visible, setVisible] = useState(true);
  const [kategoriId, setKategoriId] = useState("");
  const [updateName, setUpdateName] = useState("");

  async function onCreateNewKategori() {
    const tambahData = await adminDonasi_funCreateKategori({
      newKategori: create,
    });
    if (tambahData.status === 200) {
      const loadNewdata = await adminDonasi_getMasterKategori();
      onLoadData(loadNewdata);
      setCreate("");
      ComponentGlobalAdmin_NotifikasiBerhasil(tambahData.message);
    } else {
      ComponentGlobalAdmin_NotifikasiGagal(tambahData.message);
    }
  }

  async function onDelete(id: string) {
    const del = await adminDonasi_funDeleteKategori({ kategoriId: id });
    if (del.status === 200) {
      const loadNewdata = await adminDonasi_getMasterKategori();
      onLoadData(loadNewdata);
      ComponentGlobalAdmin_NotifikasiBerhasil(del.message);
    } else {
      ComponentGlobalAdmin_NotifikasiGagal(del.message);
    }
  }

  async function onUpdate() {
    const updt = await adminDonasi_funUpdatekategoriById({
      kategoriId: kategoriId,
      name: updateName,
    });
    if (updt.status === 200) {
      setVisible(true);
      setKategoriId("");
      setUpdateName("");
      ComponentGlobalAdmin_NotifikasiBerhasil(updt.message);
      const loadData = await adminDonasi_getMasterKategori();
      onLoadData(loadData);
    } else {
      ComponentGlobalAdmin_NotifikasiGagal(updt.message);
    }
  }

  const rowTable = list.map((e, i) => (
    <tr key={i}>
      <td>
        <Center>
          <Text>{e?.name}</Text>
        </Center>
      </td>
      <td>
        <Group position="center">
          <ActionIcon
            onClick={() => {
              setVisible(false);
              setKategoriId(e?.id);
              setUpdateName(e?.name);
            }}
          >
            <IconEdit color="green" />
          </ActionIcon>
          <ActionIcon
            onClick={() => {
              onDelete(e?.id);
            }}
          >
            <IconTrash color="red" />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ));

  return (
    <>
      <Stack spacing={"xs"} h={"100%"}>
        {/* <pre>{JSON.stringify(listUser, null, 2)}</pre> */}
        <Group
          position="apart"
          bg={"gray.4"}
          p={"xs"}
          style={{ borderRadius: "6px" }}
        >
          <Title order={4}>Kategori</Title>
        </Group>

        <Grid>
          <Grid.Col span={"auto"}>
            <Stack>
              <Paper p={"md"} withBorder>
                <Stack>
                  <TextInput
                    value={create}
                    label={<Title order={6}>Tambah Kategori</Title>}
                    placeholder="Masukan kategori baru"
                    onChange={(val) => {
                      setCreate(val.currentTarget.value);
                    }}
                  />
                  <Group position="right">
                    <Button
                      style={{
                        transition: "0.5s",
                      }}
                      disabled={create === "" ? true : false}
                      radius={"xl"}
                      onClick={() => {
                        onCreateNewKategori();
                      }}
                    >
                      Simpan
                    </Button>
                  </Group>
                </Stack>
              </Paper>

              <Paper p={"md"} withBorder style={{ transition: "1s" }}>
                <Stack>
                  <TextInput
                    value={updateName}
                    disabled={visible ? true : false}
                    label={<Title order={6}>Update Kategori</Title>}
                    placeholder="Update kategori"
                    onChange={(val) => {
                      setUpdateName(val.currentTarget.value);
                    }}
                  />
                  <Group position="right">
                    <Button
                      disabled={visible ? true : false}
                      style={{
                        transition: "0.5s",
                      }}
                      radius={"xl"}
                      onClick={() => {
                        setKategoriId("");
                        setUpdateName("");
                        setVisible(true);
                      }}
                    >
                      Batal
                    </Button>
                    <Button
                      style={{
                        transition: "0.5s",
                      }}
                      color="green"
                      disabled={visible ? true : false}
                      radius={"xl"}
                      onClick={() => {
                        onUpdate();
                      }}
                    >
                      Update
                    </Button>
                  </Group>
                </Stack>
              </Paper>
            </Stack>
          </Grid.Col>
          <Grid.Col span={8} h={"80vh"}>
            <Paper p={"md"} withBorder shadow="lg" h={"100%"}>
              <ScrollArea w={"100%"} h={"90%"}>
                <Table
                  verticalSpacing={"xs"}
                  horizontalSpacing={"md"}
                  p={"md"}
                  w={"100%"}
                  striped
                  highlightOnHover
                >
                  <thead>
                    <tr>
                      <th>
                        <Center>Kategori</Center>
                      </th>
                      <th>
                        <Center>Aksi</Center>
                      </th>
                    </tr>
                  </thead>
                  <tbody>{rowTable}</tbody>
                </Table>
              </ScrollArea>
              {/* <Center mt={"xl"}>
                <Pagination
                  total={10}
                  // value={isActivePage}
                  // total={isNPage}
                  // onChange={(val) => {
                  //   onPageClick(val);
                  // }}
                />
              </Center> */}
            </Paper>
          </Grid.Col>
        </Grid>
      </Stack>
    </>
  );
}
