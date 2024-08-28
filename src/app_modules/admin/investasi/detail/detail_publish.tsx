"use client";

import { MODEL_INVESTASI } from "@/app_modules/investasi/_lib/interface";
import { Button, Group, Stack } from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";
import { useState } from "react";
import ComponentAdminGlobal_BackButton from "../../_admin_global/back_button";
import {
  AdminInvestasi_ViewDaftarInvestor,
  AdminInvestasi_ViewDaftarTransaksi,
  AdminInvestasi_ViewDetailData,
} from "../_view";

export function AdminInvestasi_DetailPublish({
  data,
}: {
  data: MODEL_INVESTASI;
}) {
  const [selectPage, setSelectPage] = useState("1");
  const listPage = [
    {
      id: "1",
      name: "Detail Data",
      icon: <IconCircleCheck />,
    },
    {
      id: "2",
      name: "Daftar Transaksi",
      icon: <IconCircleCheck />,
    },
    // {
    //   id: "3",
    //   name: "Daftar Investor",
    //   icon: <IconCircleCheck />,
    // },
  ];

  return (
    <>
      <Stack px={"lg"}>
        <ComponentAdminGlobal_BackButton />

        <Group>
          {listPage.map((e) => (
            <Button
              key={e.id}
              color={selectPage == e.id ? "green" : "gray"}
              radius={"xl"}
              onClick={() => setSelectPage(e.id)}
              style={{
                transition: "all 0.3s",
              }}
            >
              {e.name}
            </Button>
          ))}
        </Group>

        {selectPage == "1" ? (
          <AdminInvestasi_ViewDetailData data={data} />
        ) : null}
        {selectPage == "2" ? (
          <AdminInvestasi_ViewDaftarTransaksi dataTransaksi={{}} />
        ) : null}
        {selectPage == "3" ? <AdminInvestasi_ViewDaftarInvestor /> : null}
      </Stack>
    </>
  );
}
