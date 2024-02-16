"use client";

import { Stack, Tabs } from "@mantine/core";
import { useState } from "react";
import Vote_SemuaRiwayat from "./semua";
import Vote_RiwayatSaya from "./saya";
import { useAtom } from "jotai";
import { gs_vote_riwayat } from "../../global_state";
import { MODEL_VOTING } from "../../model/interface";

export default function Vote_Riwayat({
  listRiwayat,
  listRiwayatSaya,
}: {
  listRiwayat: MODEL_VOTING[];
  listRiwayatSaya: MODEL_VOTING[]
}) {
  const [tabsRiwayat, setTabsRiwayat] = useAtom(gs_vote_riwayat);
  const listTabs = [
    {
      id: 1,
      path: <Vote_SemuaRiwayat listRiwayat={listRiwayat} />,
      value: "Semua",
      label: "Semua Riwayat",
    },
    {
      id: 2,
      path: <Vote_RiwayatSaya listRiwayatSaya={listRiwayatSaya} />,
      value: "Saya",
      label: "Riwayat Saya",
    },
  ];

  return (
    <>
      <Tabs
        variant="pills"
        radius={"xl"}
        color="blue"
        defaultValue={"Semua"}
        value={tabsRiwayat}
        onTabChange={setTabsRiwayat}
      >
        <Stack>
          <Tabs.List grow>
            {listTabs.map((e, i) => (
              <Tabs.Tab
                key={i}
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
