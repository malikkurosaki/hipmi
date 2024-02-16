"use client";

import {
  ActionIcon,
  Box,
  Button,
  Divider,
  Group,
  List,
  Modal,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import ComponentAdminDonasi_TombolKembali from "../../donasi/component/tombol_kembali";
import ComponentAdminGlobal_HeaderTamplate from "../../component/header_tamplate";
import { MODEL_DEFAULT_MASTER } from "@/app_modules/model_global/interface";
import { useState } from "react";
import { AdminEvent_funCreateTipeAcara } from "../fun/create/fun_create_tipe_acara";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/component_global/notif_global/notifikasi_peringatan";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/component_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/component_global/notif_global/notifikasi_gagal";
import { AdminEvent_getListTipeAcara } from "../fun/get/get_list_tipe_acara";
import { IconEditCircle, IconTrash } from "@tabler/icons-react";
import { AdminEvent_funEditTipeAcara } from "../fun/edit/fun_edit_tipe_acara";
import { useDisclosure } from "@mantine/hooks";
import { AdminEvent_funEditActivationTipeAcaraById } from "../fun/edit/fun_edit_activation_tipe_acara";
import { number } from "echarts";

export default function AdminEvent_DetailTipeAcara({
  listTipe,
}: {
  listTipe: any;
}) {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Event: Tipe Acara" />
        <DetailTipeAcara listTipe={listTipe} />
      </Stack>
    </>
  );
}

function DetailTipeAcara({ listTipe }: { listTipe: MODEL_DEFAULT_MASTER[] }) {
  const [tipe, setTipe] = useState(listTipe);
  const [name, setName] = useState("");
  const [openEditor, setOpenEditor] = useState(false);
  const [edit, setEdit] = useState<MODEL_DEFAULT_MASTER | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [hapusTipe, setHapusTipe] = useState({
    id: "",
    name: "",
  });

  return (
    <>
      <Modal opened={opened} onClose={close} centered withCloseButton={false}>
        <Stack>
          <Title order={6}>
            Anda yakin akan menghapus{" "}
            <Text span c={"red"} inherit>
              {hapusTipe.name}
            </Text>{" "}
            ?
          </Title>
          <Group position="center">
            <Button onClick={() => close()}>Batal</Button>
            <Button
              onClick={() => onDelete(hapusTipe as any, close, setTipe)}
              color="red"
            >
              Hapus
            </Button>
          </Group>
        </Stack>
      </Modal>

      <SimpleGrid
        cols={3}
        spacing="lg"
        breakpoints={[
          { maxWidth: "62rem", cols: 4, spacing: "lg" },
          { maxWidth: "48rem", cols: 2, spacing: "sm" },
          { maxWidth: "36rem", cols: 1, spacing: "sm" },
        ]}
      >
        <div>
          <Paper p={"sm"} shadow="lg" withBorder>
            <Stack>
              <TextInput
                value={name ? name : ""}
                label="Masukan Tipe"
                placeholder="Contoh: Seminar, Workshop, dll."
                onChange={(val) => {
                  setName(val.target.value);
                }}
              />
              <Group position="right">
                <Button onClick={() => onSave(name, setName, setTipe)}>
                  Tambah
                </Button>
              </Group>
            </Stack>
          </Paper>
        </div>

        <div>
          <Paper p={"md"} shadow="lg" withBorder>
            <Stack>
              <Title order={3}>Tipe Acara Yang Tersedia </Title>
              <Stack px={"md"}>
                {tipe.map((e, i) => (
                  <Stack key={e.id} spacing={"xs"}>
                    <Group position="apart">
                      <Text>{e.name}</Text>
                      <Group>
                        <ActionIcon
                          variant="transparent"
                          onClick={() => {
                            setOpenEditor(true);
                            setEdit(e);
                          }}
                        >
                          <IconEditCircle color="green" />
                        </ActionIcon>{" "}
                        <ActionIcon
                          variant="transparent"
                          onClick={() => {
                            open();
                            setHapusTipe({
                              ...hapusTipe,
                              id: e.id,
                              name: e.name,
                            });
                          }}
                        >
                          <IconTrash color="red" />
                        </ActionIcon>
                      </Group>
                    </Group>
                    <Divider />
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </Paper>
        </div>

        <div>
          {openEditor ? (
            <Paper p={"sm"} shadow="lg" withBorder>
              <Stack>
                <TextInput
                  value={edit?.name ? edit?.name : ""}
                  label="Edit Tipe Event"
                  placeholder="Contoh: Ramah Tamah, dll"
                  onChange={(val) => {
                    setEdit({
                      ...(edit as any),
                      name: val.target.value,
                    });
                  }}
                />
                <Group position="right">
                  <Group position="apart">
                    <Button color="red" onClick={() => setOpenEditor(false)}>
                      Batal
                    </Button>
                    <Button
                      color="green"
                      onClick={() =>
                        onUpdate(edit?.id, edit?.name, setTipe, setOpenEditor)
                      }
                    >
                      Update
                    </Button>
                  </Group>
                </Group>
              </Stack>
            </Paper>
          ) : (
            ""
          )}
        </div>
      </SimpleGrid>
    </>
  );
}

async function onSave(name: string, setName: any, setTipe: any) {
  if (name === "")
    return ComponentGlobal_NotifikasiPeringatan("Isi Tipe Acara");

  await AdminEvent_funCreateTipeAcara(name).then(async (res) => {
    if (res.status === 201) {
      await AdminEvent_getListTipeAcara().then((val) => {
        setTipe(val);
        setName("");
        ComponentGlobal_NotifikasiBerhasil("Berhasil Menyimpan Data");
      });
    } else {
      ComponentGlobal_NotifikasiGagal("Gagal Menyimpan Data");
    }
  });
}

async function onUpdate(id: any, edit: any, setTipe: any, setOpenEditor: any) {
  await AdminEvent_funEditTipeAcara(id, edit).then(async (res) => {
    if (res.status === 200) {
      await AdminEvent_getListTipeAcara().then((val) => {
        setTipe(val);
        ComponentGlobal_NotifikasiBerhasil(res.message);
        setOpenEditor(false);
      });
    } else {
      ComponentGlobal_NotifikasiGagal(res.message);
    }
  });
}

async function onDelete(data: MODEL_DEFAULT_MASTER, close: any, setTipe: any) {
  await AdminEvent_funEditActivationTipeAcaraById(data.id as any).then(
    async (res) => {
      if (res.status === 200) {
        const data = await AdminEvent_getListTipeAcara();
        setTipe(data);
        ComponentGlobal_NotifikasiBerhasil(res.message);
        close();
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    }
  );
}
