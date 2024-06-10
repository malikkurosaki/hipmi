"use client";

import AppComponentGlobal_LayoutTamplate from "@/app_modules/component_global/component_layout_tamplate";
import ComponentGlobal_HeaderTamplate from "@/app_modules/component_global/header_tamplate";
import { Text } from "@mantine/core";

export default function Notifikasi_MainView() {
  return (
    <>
      <AppComponentGlobal_LayoutTamplate
        header={<ComponentGlobal_HeaderTamplate title="Notifikasi" />}
      >
        <MainView />
      </AppComponentGlobal_LayoutTamplate>
    </>
  );
}

function MainView() {
  return (
    <>
      <Text>notif</Text>
    </>
  );
}
