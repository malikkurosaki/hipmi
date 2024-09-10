"use client";

import { Stack } from "@mantine/core";
import ComponentAdminGlobal_BackButton from "../../_admin_global/back_button";
import { AdminEvent_ViewDetailPeserta } from "../_view";
import { MODEL_EVENT_PESERTA } from "@/app_modules/event/model/interface";
import { ComponentAdminGlobal_TitlePage } from "../../_admin_global/_component";

export function AdminEvent_UiDetailPeserta({
  dataPeserta,
  eventId,
}: {
  dataPeserta: any;
  eventId: string
}) {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_BackButton />
        <ComponentAdminGlobal_TitlePage name="Detail Peserta" />
        <AdminEvent_ViewDetailPeserta
          dataPeserta={dataPeserta as any}
          eventId={eventId}
        />
      </Stack>
    </>
  );
}
