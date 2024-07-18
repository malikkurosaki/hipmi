"use client";

import { Stack, Tabs, Text } from "@mantine/core";
import { IconBrandOffice, IconUsersGroup, IconUser } from "@tabler/icons-react";
import { useState } from "react";
import Colab_ProyekSaya from "./saya";
import Colab_PartisipasiProyek from "./partisipasi";
import { useAtom } from "jotai";
import { gs_colab_proyek } from "../../global_state";
import {
  MODEL_COLLABORATION,
  MODEL_COLLABORATION_PARTISIPASI,
} from "../../model/interface";
import { AccentColor, MainColor } from "@/app_modules/_global/color/color_pallet";

export default function Colab_Proyek({
  listPartisipasiUser,
  listProyekSaya,
}: {
  listPartisipasiUser: MODEL_COLLABORATION_PARTISIPASI[];
  listProyekSaya: MODEL_COLLABORATION[];
}) {
  const [activeTab, setActiveTab] = useAtom(gs_colab_proyek);

  const listTabs = [
    {
      id: 1,
      icon: <IconUsersGroup />,
      label: "Partisipasi Proyek",
      value: "Partisipasi",
      path: (
        <Colab_PartisipasiProyek
          listPartisipasiUser={listPartisipasiUser as any}
        />
      ),
    },
    {
      id: 2,
      icon: <IconUser />,
      label: "Proyek Saya",
      value: "Saya",
      path: <Colab_ProyekSaya listProyekSaya={listProyekSaya as any} />,
    },
  ];

  return (
    <Tabs
      variant="pills"
      value={activeTab}
      onTabChange={setActiveTab}
      styles={{
        tabsList: {
          backgroundColor: MainColor.darkblue,
          position: "sticky",
          top: 0,
          zIndex: 99,
        },
      }}
    >
      <Stack>
        <Tabs.List grow>
          {listTabs.map((e) => (
            <Tabs.Tab
              key={e.id}
              value={e.value}
              fw={"bold"}
              c={"black"}
              style={{
                transition: "0.5s",
                backgroundColor:
                  activeTab === e.value ? MainColor.yellow : "white",
                border:
                  activeTab === e.value
                    ? `1px solid ${AccentColor.yellow}`
                    : `1px solid white`,
              }}
            >
              <Stack align="center" justify="center" spacing={0}>
                {e.icon}
                <Text>{e.label}</Text>
              </Stack>
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
  );
}
