"use client";

import { Tabs, Stack, Paper } from "@mantine/core";
import { useState } from "react";
import Colab_StatusPublish from "./publish";
import Colab_StatusReject from "./reject";
import Colab_StatusReview from "./review";
import { useAtom } from "jotai";
import { gs_colab_status } from "../../global_state";

export default function Colab_Status({
  listPublish,
  listReview,
  listReject,
}: {
  listPublish: any[];
  listReview: any[];
  listReject: any[];
}) {
  const [tabsStatus, setTabsStatus] = useAtom(gs_colab_status);
  const [colorTab, setColorTab] = useState<string | null>("");

  const listTabs = [
    {
      id: 1,
      path: <Colab_StatusPublish listPublish={listPublish as any} />,
      value: "Publish",
      bg: "green",
    },
    // {
    //   id: 2,
    //   path: <Colab_StatusReview />,
    //   value: "Review",
    //   bg: "orange",
    // },
    {
      id: 3,
      path: <Colab_StatusReject />,
      value: "Reject",
      bg: "red",
    },
  ];

  return (
    <>
      <Tabs
        color={
          "blue"
          // colorTab === "Publish"
          // ? "green"
          // : colorTab === "Review"
          // ? "orange"
          // : "red"
        }
        variant="pills"
        radius={"xl"}
        defaultValue={"Publish"}
        value={tabsStatus}
        onTabChange={(val) => {
          setTabsStatus(val);
          // setColorTab(val);
        }}
      >
        <Stack>
          <Tabs.List grow>
            {listTabs.map((e) => (
              <Tabs.Tab
                key={e.id}
                value={e.value}
                bg={tabsStatus === e.value ? "cyan" : "gray.2"}
                fw={tabsStatus === e.value ? "bold" : "normal"}
              >
                {e.value}
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
