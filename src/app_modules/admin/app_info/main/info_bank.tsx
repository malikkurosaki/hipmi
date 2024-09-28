"use client";

import { MODEL_DATA_BANK } from "@/app_modules/investasi/model/model_investasi";
import {
  ActionIcon,
  Button,
  Center,
  Grid,
  Group,
  Modal,
  Paper,
  ScrollArea,
  Stack,
  Switch,
  Table,
  Text,
  TextInput,
  Title,
  Tooltip
} from "@mantine/core";
import {
  IconCirclePlus,
  IconEdit
} from "@tabler/icons-react";
import _ from "lodash";
import { useState } from "react";
import { ComponentAdminGlobal_NotifikasiBerhasil } from "../../component_global/admin_notifikasi/notifikasi_berhasil";
import { ComponentAdminGlobal_NotifikasiGagal } from "../../component_global/admin_notifikasi/notifikasi_gagal";
import adminAppInformation_createBank from "../fun/create/fun_create_new_bank";
import adminAppInformation_getMasterBank from "../fun/master/get_list_bank";
import adminAppInformation_updateStatusBankById from "../fun/update/fun_udpate_status_bank";
import adminAppInformation_updateDataBankById from "../fun/update/fun_update_data_bank";

export default function InformasiBank({
  listBank,
}: {
  listBank: MODEL_DATA_BANK[];
}) {
  const [data, setData] = useState(listBank);
  const [isCreate, setIsCreate] = useState(false);
  const [newData, setNewData] = useState({
    name: "",
    norek: "",
  });

  const [isUpdate, setIsUpdate] = useState(false);
  const [updateData, setUpdateData] = useState({
    id: "",
    name: "",
    norek: "",
  });

  const [isActivation, setIsActivation] = useState(false);
  const [updateStatus, setUpdateStatus] = useState({
    id: "",
    active: "",
  });

  const [checked, setChecked] = useState(false);

  async function onCreate() {
    const create = await adminAppInformation_createBank({ data: newData });
    if (create.status === 200) {
      const loadData = await adminAppInformation_getMasterBank();
      setData(loadData);
      ComponentAdminGlobal_NotifikasiBerhasil(create.message);
    } else {
      ComponentAdminGlobal_NotifikasiGagal(create.message);
    }
    setIsCreate(false);
  }

  async function onUpdate() {
    const updt = await adminAppInformation_updateDataBankById({
      data: updateData as any,
    });
    if (updt.status === 200) {
      const loadData = await adminAppInformation_getMasterBank();
      setData(loadData);
      ComponentAdminGlobal_NotifikasiBerhasil(updt.message);
      setIsUpdate(false);
    } else {
      ComponentAdminGlobal_NotifikasiGagal(updt.message);
    }
  }

  async function onUpdateActivation({
    id,
    value,
  }: {
    id: string;
    value: boolean;
  }) {
    const data = {
      id: id,
      active: value,
    };
    const updt = await adminAppInformation_updateStatusBankById({
      data: data as any,
    });
    if (updt.status === 200) {
      const loadData = await adminAppInformation_getMasterBank();
      setData(loadData);
      ComponentAdminGlobal_NotifikasiBerhasil(updt.message);
      setIsActivation(false);
    } else {
      ComponentAdminGlobal_NotifikasiGagal(updt.message);
    }
  }

  const rowTable = _.isEmpty(data) ? (
    <tr>
      <Center>
        <Text>Tidak ada data</Text>
      </Center>
    </tr>
  ) : (
    data.map((e, i) => (
      <tr key={i}>
        <td>
          <Center>
            <Text>{e?.name}</Text>
          </Center>
        </td>
        <td>
          <Center>
            <Text>{e?.norek}</Text>
          </Center>
        </td>
        <td>
          <Center>
            <Switch
              color="orange"
              onLabel="ON"
              offLabel="OFF"
              checked={e?.active}
              onChange={(val) => {
                setIsActivation(true);
                setUpdateStatus({
                  id: e?.id,
                  active: val.currentTarget.checked as any,
                });
              }}
            />
          </Center>
        </td>
        <td>
          <Stack align="center" justify="center">
            <ActionIcon
              radius={"xl"}
              variant="transparent"
              onClick={() => {
                setIsUpdate(true);
                setIsCreate(false);
                setUpdateData({
                  id: e?.id,
                  name: e?.name,
                  norek: e?.norek,
                });
              }}
            >
              <Tooltip label="Edit">
                <IconEdit color="green" />
              </Tooltip>
            </ActionIcon>
          </Stack>
        </td>
      </tr>
    ))
  );

  return (
    <>
      <Stack spacing={"xs"}>
        <Group
          position="apart"
          bg={"gray.4"}
          p={"xs"}
          style={{ borderRadius: "6px" }}
        >
          <Title order={4}>Informasi Bank</Title>
          <Button
            w={120}
            leftIcon={<IconCirclePlus />}
            radius={"xl"}
            onClick={() => {
              setIsCreate(true);
              setIsUpdate(false);
            }}
          >
            Tambah
          </Button>
        </Group>
      </Stack>

      <Grid>
        <Grid.Col span={"auto"}>
          <Paper p={"md"} withBorder shadow="lg" h={"50vh"}>
            <ScrollArea w={"100%"} h={"90%"} offsetScrollbars>
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
                      <Center>Nama Bank</Center>
                    </th>
                    <th>
                      <Center>Nomor Rekening</Center>
                    </th>
                    <th>
                      <Center>Status</Center>
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

        <Grid.Col span={4}>
          {isCreate ? (
            <Paper p={"md"} withBorder shadow="lg">
              <Stack>
                <Center>
                  <Title order={5}>Tambah Daftar Bank</Title>
                </Center>
                <TextInput
                  label={"Nama Bank"}
                  placeholder="Masukan nama bank"
                  onChange={(val) => {
                    setNewData({
                      ...newData,
                      name: val.currentTarget.value,
                    });
                  }}
                />
                <TextInput
                  label={"Nomor Rekening Bank"}
                  placeholder=" Masukan nomor rekening bank"
                  type="number"
                  onChange={(val) => {
                    setNewData({
                      ...newData,
                      norek: val.currentTarget.value,
                    });
                  }}
                />
                <Group position="right" align="flex-end">
                  <Button
                    radius={"xl"}
                    onClick={() => {
                      setIsCreate(false);
                    }}
                  >
                    Batal
                  </Button>
                  <Button
                    style={{ transition: "0.5s" }}
                    disabled={_.values(newData).includes("") ? true : false}
                    radius={"xl"}
                    color="green"
                    onClick={() => {
                      onCreate();
                    }}
                  >
                    Simpan
                  </Button>
                </Group>
              </Stack>
            </Paper>
          ) : (
            ""
          )}
          {isUpdate ? (
            <Paper p={"md"} withBorder shadow="lg">
              <Stack>
                <Center>
                  <Title order={5}>Update Data Bank</Title>
                </Center>
                <TextInput
                  label={"Nama Bank"}
                  placeholder="Masukan nama bank"
                  value={updateData.name}
                  onChange={(val) => {
                    const value = val.currentTarget.value;
                    setUpdateData({ ...updateData, name: value });
                  }}
                />
                <TextInput
                  label={"Nomor Rekening Bank"}
                  placeholder=" Masukan nomor rekening bank"
                  type="number"
                  value={updateData.norek}
                  onChange={(val) => {
                    const value = val.currentTarget.value;
                    setUpdateData({ ...updateData, norek: value });
                  }}
                />
                <Group position="right">
                  <Button
                    radius={"xl"}
                    onClick={() => {
                      setIsUpdate(false);
                    }}
                  >
                    Batal
                  </Button>
                  <Button
                    style={{ transition: "0.5s" }}
                    disabled={
                      updateData?.name === "" || updateData?.norek === ""
                        ? true
                        : false
                    }
                    radius={"xl"}
                    color="green"
                    onClick={() => {
                      onUpdate();
                    }}
                  >
                    Simpan
                  </Button>
                </Group>
              </Stack>
            </Paper>
          ) : (
            ""
          )}
        </Grid.Col>
      </Grid>

      {/* Activasi bank */}
      <Modal
        centered
        withCloseButton={false}
        opened={isActivation}
        onClose={() => setIsActivation(false)}
      >
        <Stack align="center">
          <Title order={5}>
            Anda ingin{" "}
            {updateStatus.active ? (
              <Text span inherit>
                mengaktifkan
              </Text>
            ) : (
              <Text span inherit>
                menonaktifkan
              </Text>
            )}{" "}
            Bank ini ?
          </Title>
          <Group>
            <Button radius={"xl"} onClick={() => setIsActivation(false)}>
              Batal
            </Button>
            <Button
              color="green"
              radius={"xl"}
              onClick={() => {
                onUpdateActivation({
                  id: updateStatus.id,
                  value: updateStatus.active as any,
                });
              }}
            >
              Iya
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
