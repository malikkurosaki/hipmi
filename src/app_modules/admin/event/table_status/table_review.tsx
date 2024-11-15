"use client";

import {
  Stack
} from "@mantine/core";
import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";
import { AdminEvent_ComponentTableReview } from "../_view";

export default function AdminEvent_TableReview({
  listData,
}: {
  listData: any;
}) {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Event" />
        <AdminEvent_ComponentTableReview listData={listData} />
      </Stack>
    </>
  );
}


