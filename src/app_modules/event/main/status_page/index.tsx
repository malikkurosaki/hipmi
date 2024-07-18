"use client";

import { Stack, Tabs } from "@mantine/core";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { gs_event_status } from "../../global_state";
import Event_StatusDraft from "./draft";
import Event_StatusPublish from "./publish";
import Event_StatusReject from "./reject";
import Event_StatusReview from "./review";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";

export default function Event_StatusPage({
  authorId,
  listPublish,
  listReview,
  listDraft,
  listReject,
}: {
  authorId: string;
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
      <Tabs
        variant="pills"
        radius="xl"
        mt={1}
        defaultValue="Publish"
        value={tabsStatus}
        onTabChange={setTabsStatus}
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
                    tabsStatus === e.value ? MainColor.yellow : "white",
                  border:
                    tabsStatus === e.value
                      ? `1px solid ${AccentColor.yellow}`
                      : `1px solid white`,
                }}
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
