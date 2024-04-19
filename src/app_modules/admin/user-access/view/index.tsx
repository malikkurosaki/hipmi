"use client";

import { MODEL_USER } from "@/app_modules/home/model/interface";
import {
  Button,
  Center,
  Group,
  Paper,
  ScrollArea,
  Stack,
  Table,
  TextInput,
  Title,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import adminUserAccess_funEditAccess from "../fun/edit/fun_edit_access";
import { useState } from "react";
import adminUserAccess_getListUser from "../fun/get/get_list_all_user";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/component_global/notif_global/notifikasi_gagal";

export default function AdminUserAccess_View({
  listUser,
}: {
  listUser: MODEL_USER[];
}) {
  const [data, setData] = useState(listUser);
  async function onAccess(id: string) {
    await adminUserAccess_funEditAccess(id, true).then(async (res) => {
      if (res.status === 200) {
        const value = await adminUserAccess_getListUser();
        setData(value as any);
        ComponentGlobal_NotifikasiBerhasil(res.message);
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    });
  }

  async function onDelAccess(id: string) {
    await adminUserAccess_funEditAccess(id, false).then(async (res) => {
      if (res.status === 200) {
        const value = await adminUserAccess_getListUser();
        setData(value as any);
        ComponentGlobal_NotifikasiBerhasil(res.message);
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    });
  }

  const tableBody = data.map((e, i) => (
    <tr key={e.id}>
      <td>
        <Center>{e.username}</Center>
      </td>
      <td>
        <Center>{e.nomor}</Center>
      </td>
      <td>
        {e.active === false ? (
          <Center>
            <Button
              radius={"xl"}
              color="Green"
              onClick={() => {
                onAccess(e.id);
              }}
            >
              Give Access
            </Button>
          </Center>
        ) : (
          <Center>
            <Button
              radius={"xl"}
              color="red"
              onClick={() => {
                onDelAccess(e.id);
              }}
            >
              Delete Access
            </Button>
          </Center>
        )}
      </td>
    </tr>
  ));
  return (
    <>
      <Stack spacing={"xs"}>
        {/* <pre>{JSON.stringify(listUser, null, 2)}</pre> */}
        <Group
          position="apart"
          bg={"blue.4"}
          p={"xs"}
          style={{ borderRadius: "6px" }}
        >
          <Title order={4}>Table User</Title>
          {/* <TextInput
              icon={<IconSearch size={20} />}
              radius={"xl"}
              placeholder="Masukan username"
            /> */}
        </Group>
        <Paper p={"md"} withBorder shadow="lg" h={"80vh"}>
          <ScrollArea h={"70vh"}>
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
          </ScrollArea>
        </Paper>
      </Stack>
    </>
  );
}
