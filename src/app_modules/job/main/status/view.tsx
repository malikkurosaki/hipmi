"use client";

import { Stack, Tabs } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Job_Publish from "./publish";
import Job_Review from "./review";
import Job_Draft from "./draft";
import Job_Reject from "./reject";
import { useAtom } from "jotai";
import { gs_job_status } from "../../global_state";

export default function Job_Status({
  listPublish,
  listReview,
  listDraft,
  listReject,
}: {
  listPublish: any[];
  listReview: any[];
  listDraft: any[];
  listReject: any[];
}) {
  const router = useRouter();
  const [tabsStatus, setTabsStatus] = useAtom(gs_job_status);
  const listTabs = [
    {
      id: 1,
      path: <Job_Publish />,
      value: "Publish",
    },
    {
      id: 2,
      path: <Job_Review />,
      value: "Review",
    },
    {
      id: 3,
      path: <Job_Draft />,
      value: "Draft",
    },
    {
      id: 4,
      path: <Job_Reject />,
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
