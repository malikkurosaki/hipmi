"use client";

import {
  ActionIcon,
  Button,
  Center,
  Grid,
  Group,
  Modal,
  Paper,
  ScrollArea,
  Space,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
  Tooltip,
} from "@mantine/core";
import { list } from "postcss";
import ComponentAdminGlobal_HeaderTamplate from "../../component_global/header_tamplate";
import { useState } from "react";
import {
  IconEdit,
  IconEye,
  IconEyeClosed,
  IconEyeOff,
  IconPhone,
  IconPlus,
  IconTrack,
  IconTrash,
} from "@tabler/icons-react";
import { ComponentGlobalAdmin_NotifikasiPeringatan } from "../../component_global/admin_notifikasi/notifikasi_peringatan";
import adminAppInformation_funUpdateNomorAdmin from "../fun/update/fun_update_nomor";
import { ComponentGlobalAdmin_NotifikasiBerhasil } from "../../component_global/admin_notifikasi/notifikasi_berhasil";
import { ComponentGlobalAdmin_NotifikasiGagal } from "../../component_global/admin_notifikasi/notifikasi_gagal";
import adminAppInformation_getNomorAdmin from "../fun/master/get_nomor_admin";
import { MODEL_DATA_BANK } from "@/app_modules/investasi/model/model_investasi";
import _ from "lodash";
import InformasiWhatApps from "./info_whatsapp";
import InformasiBank from "./info_bank";

export default function AdminAppInformation_MainView({
  nomorAdmin,
  listBank,
}: {
  nomorAdmin: any;
  listBank: any[];
}) {
  return (
    <>
      <Stack h={"100%"}>
        <ComponentAdminGlobal_HeaderTamplate name="App Information" />
        <InformasiWhatApps nomorAdmin={nomorAdmin} />
        <Space h={50} />
        <InformasiBank listBank={listBank} />
      </Stack>
    </>
  );
}
