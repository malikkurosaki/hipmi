"use client";

import { RouterEvent } from "@/app/lib/router_hipmi/router_event";
import ComponentGlobal_AuthorNameOnHeader from "@/app_modules/component_global/author_name_on_header";
import { Card, Stack, Grid, Title, Text, Center, Tabs } from "@mantine/core";
import moment from "moment";

import { MODEL_EVENT } from "../../model/interface";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Event_SemuaRiwayat from "./semua";
import Event_RiwayatSaya from "./saya";
import { useAtom } from "jotai";
import { gs_event_riwayat } from "../../global_state";

export default function Event_Riwayat({
  dataSemuaRiwayat,
  dataRiwayatSaya
}: {
  dataSemuaRiwayat: MODEL_EVENT[];
  dataRiwayatSaya: MODEL_EVENT[]
}) {
  const router = useRouter();
  const [tabsRiwayat, setTabsRiwayat] = useAtom(gs_event_riwayat)

  const listTabs = [
    {
      id: 1,
      label: "Semua Riwayat",
      value: "Semua",
      path: <Event_SemuaRiwayat data={dataSemuaRiwayat as any} />,
    },
    {
      id: 2,
      label: "Riwayat Saya",
      value: "Saya",
      path: <Event_RiwayatSaya data={dataRiwayatSaya as any}/>,
    },
  ];

  return (
    <>
      <Tabs
        defaultValue={"Semua"}
        variant="pills"
        radius={"xl"}
        onTabChange={setTabsRiwayat}
        value={tabsRiwayat}
      >
        <Stack>
          <Tabs.List grow>
            {listTabs.map((e) => (
              <Tabs.Tab
                key={e.id}
                value={e.value}
                bg={tabsRiwayat === e.value ? "blue" : "gray.1"}
                fw={tabsRiwayat === e.value ? "bold" : "normal"}
              >
                {e.label}
              </Tabs.Tab>
            ))}
          </Tabs.List>
          {listTabs.map((e) => (
            <Tabs.Panel key={e.id} value={e.value}>
              {e.path}
            </Tabs.Panel>
          ))}
        </Stack>
      </Tabs>
     
    </>
  );
}
