"use client";

import { RouterEvent } from "@/app/lib/router_hipmi/router_event";
import { Affix, Button, Stack, Tabs, rem } from "@mantine/core";
import { IconCirclePlus } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { gs_event_status } from "../../global_state";
import Event_StatusPublish from "./publish";
import Event_StatusReview from "./review";
import Event_StatusDraft from "./draft";
import Event_StatusReject from "./reject";
import { MODEL_EVENT } from "../../model/interface";

export default function Event_StatusPage({
  listPublish,
  listReview,
  listDraft,
  listReject,
}: {
  listPublish: any;
  listReview: any;
  listDraft: any;
  listReject: any;
}) {
  const router = useRouter();
  const [tabsStatus, setTabsStatus] = useAtom(gs_event_status);
  const listTabs = [
    {
      id: 1,
      path: <Event_StatusPublish listPublish={listPublish} />,
      value: "Publish",
    },
    {
      id: 2,
      path: <Event_StatusReview listReview={listReview} />,
      value: "Review",
    },
    {
      id: 3,
      path: <Event_StatusDraft listDraft={listDraft} />,
      value: "Draft",
    },
    {
      id: 4,
      path: <Event_StatusReject listReject={listReject} />,
      value: "Reject",
    },
  ];
  return (
    <>
      <Affix position={{ bottom: rem(100), right: rem(20) }}>
        <Button
          radius={"xl"}
          color="blue"
          leftIcon={<IconCirclePlus />}
          onClick={() => router.push(RouterEvent.create)}
        >
          Tambah Event
        </Button>
      </Affix>

      <Tabs
        color="blue"
        variant="pills"
        radius="xl"
        defaultValue="Publish"
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
