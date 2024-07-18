" use client";

import {
  ActionIcon,
  Button,
  Group,
  Paper,
  Stack,
  TextInput,
  Title,
  Tooltip
} from "@mantine/core";
import { IconEdit, IconPhone } from "@tabler/icons-react";
import { useState } from "react";
import { ComponentAdminGlobal_NotifikasiBerhasil } from "../../component_global/admin_notifikasi/notifikasi_berhasil";
import { ComponentAdminGlobal_NotifikasiGagal } from "../../component_global/admin_notifikasi/notifikasi_gagal";
import adminAppInformation_getNomorAdmin from "../fun/master/get_nomor_admin";
import adminAppInformation_funUpdateNomorAdmin from "../fun/update/fun_update_nomor";

export default function InformasiWhatApps({ nomorAdmin }: { nomorAdmin: any }) {
  const [disabled, setDisable] = useState(true);
  const [dataNomor, setDataNomor] = useState(nomorAdmin);
  const [updateNomor, setUpdateNomor] = useState("");

  async function onUpdate() {
    const newNumber = (dataNomor.nomor = updateNomor);
    setDataNomor({
      ...dataNomor,
      nomor: newNumber,
    });

    const updt = await adminAppInformation_funUpdateNomorAdmin({
      data: dataNomor,
    });
    if (updt.status === 200) {
      setDisable(true);
      setUpdateNomor("");
      const loadDdata = await adminAppInformation_getNomorAdmin();
      setDataNomor(loadDdata);
      if (loadDdata) {
        ComponentAdminGlobal_NotifikasiBerhasil(updt.message);
        return;
      }
    } else {
      ComponentAdminGlobal_NotifikasiGagal(updt.message);
    }
  }

  return (
    <>
      <Stack>
        <Stack spacing={"xs"}>
          <Group
            position="apart"
            bg={"gray.4"}
            p={"xs"}
            style={{ borderRadius: "6px" }}
          >
            <Title order={4}>Informasi WhatsApp</Title>
          </Group>
        </Stack>

        <Paper w={"50%"} withBorder p={"md"}>
          <Stack>
            <Paper bg={"gray.4"} p={"xl"}>
              <Group position="apart">
                <Title order={2}>{`+${dataNomor.nomor}`}</Title>
                <Tooltip label={"Edit"}>
                  <ActionIcon
                    style={{ transition: "0.2s" }}
                    variant="subtle"
                    disabled={disabled ? false : true}
                    radius={"xl"}
                    onClick={() => {
                      setDisable(false);
                      setUpdateNomor(dataNomor.nomor);
                    }}
                  >
                    <IconEdit
                      style={{ transition: "0.2s" }}
                      color={disabled ? "green" : "gray"}
                    />
                  </ActionIcon>
                </Tooltip>
              </Group>
            </Paper>

            {disabled ? (
              ""
            ) : (
              <Stack>
                <TextInput
                  disabled={disabled ? true : false}
                  type="number"
                  placeholder="Update nomor admin"
                  icon={<IconPhone />}
                  value={updateNomor}
                  label={<Title order={6}>Nomor Aktif Admin</Title>}
                  onChange={(val) => {
                    setUpdateNomor(val.currentTarget.value);
                  }}
                />
                <Group position="right">
                  <Button
                    style={{ transition: "0.2s" }}
                    disabled={disabled ? true : false}
                    radius={"xl"}
                    onClick={() => {
                      setDisable(true);
                      setUpdateNomor("");
                    }}
                  >
                    Batal
                  </Button>
                  <Button
                    style={{ transition: "0.2s" }}
                    disabled={disabled || updateNomor === "" ? true : false}
                    color="green"
                    radius={"xl"}
                    onClick={() => {
                      onUpdate();
                    }}
                  >
                    Update
                  </Button>
                </Group>
              </Stack>
            )}
          </Stack>
        </Paper>
      </Stack>
    </>
  );
}
