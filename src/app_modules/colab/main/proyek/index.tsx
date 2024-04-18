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
    <Tabs variant="pills" value={activeTab} onTabChange={setActiveTab}>
      <Stack>
        <Tabs.List grow>
          {listTabs.map((e) => (
            <Tabs.Tab
              key={e.id}
              value={e.value}
              bg={activeTab === e.value ? "blue" : "gray.2"}
              fw={activeTab === e.value ? "bold" : "normal"}
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
