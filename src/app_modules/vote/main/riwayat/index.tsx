"use client";

import { Stack, Tabs } from "@mantine/core";
import { useState } from "react";
import Vote_SemuaRiwayat from "./semua";
import Vote_RiwayatSaya from "./saya";
import { useAtom } from "jotai";
import { gs_vote_riwayat } from "../../global_state";
import { MODEL_VOTING } from "../../model/interface";
import { AccentColor, MainColor } from "@/app_modules/_global/color/color_pallet";

export default function Vote_Riwayat({
  listRiwayat,
  listRiwayatSaya,
}: {
  listRiwayat: MODEL_VOTING[];
  listRiwayatSaya: MODEL_VOTING[];
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
        mt={1}
        variant="pills"
        radius={"xl"}
        defaultValue={"Semua"}
        value={tabsRiwayat}
        onTabChange={setTabsRiwayat}
        styles={{
          tabsList: {
            backgroundColor: MainColor.darkblue,
            position: "sticky",
            top: 0,
            zIndex: 99,
          },
          panel: {
            paddingTop: 10,
          },
        }}
      >
        <Stack>
          <Tabs.List grow>
            {listTabs.map((e, i) => (
              <Tabs.Tab
                key={i}
                value={e.value}
                fw={"bold"}
                c={"black"}
                style={{
                  transition: "0.5s",
                  backgroundColor:
                    tabsRiwayat === e.value ? MainColor.yellow : "white",
                  border:
                    tabsRiwayat === e.value
                      ? `1px solid ${AccentColor.yellow}`
                      : `1px solid white`,
                }}
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
