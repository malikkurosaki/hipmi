"use client";

import {
  Box,
  Button,
  Center,
  Group,
  Paper,
  ScrollArea,
  SimpleGrid,
  Stack,
  Table,
  TextInput,
  Title,
} from "@mantine/core";
import ComponentAdminGlobal_HeaderTamplate from "../component/header_tamplate";
import { MODEL_USER } from "@/app_modules/home/model/interface";
import _ from "lodash";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import adminDeveloper_funEditUserAksesById from "./fun/edit/fun_edit_user_akses_by_id";
import adminDeveloper_funGetListAllAdmin from "./fun/get/fun_get_list_all_admin";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/component_global/notif_global/notifikasi_gagal";
import adminDeveloper_funGetListAllUser from "./fun/get/fun_get_list_all_user";

export default function AdminDeveloper({
  listUser,
  listAdmin,
}: {
  listUser: MODEL_USER[];
  listAdmin: MODEL_USER[];
}) {
  const [dataUser, setDataUser] = useState(listUser);
  const [dataAdmin, setDataAdmin] = useState(listAdmin);

  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Developer" />
        <SimpleGrid cols={2} spacing={50}>
          <TableAdmin
            dataAdmin={dataAdmin}
            setDataAdmin={setDataAdmin}
            setDataUser={setDataUser}
          />
          <TableUser
            dataUser={dataUser}
            setDataUser={setDataUser}
            setDataAdmin={setDataAdmin}
          />
        </SimpleGrid>
      </Stack>
    </>
  );
}

function TableAdmin({
  dataAdmin,
  setDataAdmin,
  setDataUser,
}: {
  dataAdmin: MODEL_USER[];
  setDataAdmin: any;
  setDataUser: any;
}) {
  async function onAccess(id: string) {
    await adminDeveloper_funEditUserAksesById(id, "1").then(async (res) => {
      if (res.status === 200) {
        await adminDeveloper_funGetListAllUser().then((val) => {
          setDataUser(val);
        });
        await adminDeveloper_funGetListAllAdmin().then((val) => {
          setDataAdmin(val);
        });
        ComponentGlobal_NotifikasiBerhasil(res.message);
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    });
  }

  const tableBody = dataAdmin.map((e) => (
    <tr key={e.id}>
      <td>
        <Center>{e.username}</Center>
      </td>
      <td>
        <Center>{e.nomor}</Center>
      </td>
      <td>
        <Center>
          <Button radius={"xl"} color="red" onClick={() => onAccess(e.id)}>
            Delete Access
          </Button>
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
          <Title order={4}>Table Admin</Title>
          <TextInput
            icon={<IconSearch size={20} />}
            radius={"xl"}
            placeholder="Masukan username"
          />
        </Group>
        <Paper p={"md"} withBorder shadow="lg" h={"80vh"}>
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
                  <Center>Username</Center>
                </th>
                <th>
                  <Center>Nomor</Center>
                </th>
                <th>
                  <Center>Aksi</Center>
                </th>
              </tr>
            </thead>
            <tbody>{tableBody}</tbody>
          </Table>
        </Paper>
      </Stack>
    </>
  );
}

function TableUser({
  dataUser,
  setDataUser,
  setDataAdmin,
}: {
  dataUser: MODEL_USER[];
  setDataUser: any;
  setDataAdmin: any;
}) {
  async function onAccess(id: string) {
    await adminDeveloper_funEditUserAksesById(id, "2").then(async (res) => {
      if (res.status === 200) {
        await adminDeveloper_funGetListAllUser().then((val) => {
          setDataUser(val);
        });
        await adminDeveloper_funGetListAllAdmin().then((val) => {
          setDataAdmin(val);
        });
        ComponentGlobal_NotifikasiBerhasil(res.message);
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    });
  }

  const tableBody = dataUser.map((e) => (
    <tr key={e.id}>
      <td>
        <Center>{e.username}</Center>
      </td>
      <td>
        <Center>{e.nomor}</Center>
      </td>
      <td>
        <Center>
          <Button radius={"xl"} onClick={() => onAccess(e.id)}>
            Admin Access
          </Button>
        </Center>
      </td>
    </tr>
  ));

  return (
    <>
      <Stack spacing={"xs"}>
        <Group
          position="apart"
          bg={"cyan.4"}
          p={"xs"}
          style={{ borderRadius: "6px" }}
        >
          <Title order={4}>Table User</Title>
          <TextInput
            icon={<IconSearch size={20} />}
            radius={"xl"}
            placeholder="Masukan username"
          />
        </Group>
        <Paper p={"md"} withBorder shadow="lg" h={"80vh"}>
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
                  <Center>Username</Center>
                </th>
                <th>
                  <Center>Nomor</Center>
                </th>
                <th>
                  <Center>Aksi</Center>
                </th>
              </tr>
            </thead>
            <tbody>{tableBody}</tbody>
          </Table>
        </Paper>
      </Stack>
    </>
  );
}
