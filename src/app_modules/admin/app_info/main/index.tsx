"use client";

import {
  Space,
  Stack
} from "@mantine/core";
import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";
import InformasiBank from "./info_bank";
import InformasiWhatApps from "./info_whatsapp";

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
