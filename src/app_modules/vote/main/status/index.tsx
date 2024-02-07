"use client";

import { Stack, Tabs } from "@mantine/core";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { gs_vote_status } from "../../global_state";
import Vote_StatusPublish from "./publish";
import Vote_StatusReview from "./review";
import Vote_StatusDraft from "./draft";
import Vote_StatusReject from "./reject";

export default function Vote_Status() {
  const router = useRouter();
  const [tabsStatus, setTabsStatus] = useAtom(gs_vote_status);
  const listTabs = [
    {
      id: 1,
      path: <Vote_StatusPublish />,
      value: "Publish",
    },
    {
      id: 2,
      path: <Vote_StatusReview />,
      value: "Review",
    },
    {
      id: 3,
      path: <Vote_StatusDraft />,
      value: "Draft",
    },
    {
      id: 4,
      path: <Vote_StatusReject />,
      value: "Reject",
    },
  ];
  return (
    <>
      <Tabs
        color="blue"
        variant="pills"
        radius={"xl"}
        defaultValue={"Publish"}
        value={tabsStatus}
        onTabChange={setTabsStatus}
      >
        <Stack>
          <Tabs.List grow>
            {listTabs.map((e) => (
              <Tabs.Tab
                key={e.id}
                value={e.value}
                bg={tabsStatus === e.value ? "blue" : "gray.1"}
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
