"use client";

import { Space, Stack } from "@mantine/core";
import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";
import {
  AdminAppInformation_ViewInfoBank,
  AdminAppInformation_ViewInformasiWhatApps,
} from "../view";

export default function AdminAppInformation_UiMain({
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
        <AdminAppInformation_ViewInformasiWhatApps nomorAdmin={nomorAdmin} />
        <Space h={50} />
        <AdminAppInformation_ViewInfoBank listBank={listBank} />
      </Stack>
    </>
  );
}
