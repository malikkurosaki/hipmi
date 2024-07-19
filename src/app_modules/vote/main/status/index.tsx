"use client";

import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import { Stack, Tabs } from "@mantine/core";
import { useAtom } from "jotai";
import { gs_vote_status } from "../../global_state";
import Vote_StatusDraft from "./draft";
import Vote_StatusPublish from "./publish";
import Vote_StatusReject from "./reject";
import Vote_StatusReview from "./review";

export default function Vote_Status({
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

  const [tabsStatus, setTabsStatus] = useAtom(gs_vote_status);
  const listTabs = [
    {
      id: 1,
      path: <Vote_StatusPublish listPublish={listPublish} />,
      value: "Publish",
    },
    {
      id: 2,
      path: <Vote_StatusReview listReview={listReview} />,
      value: "Review",
    },
    {
      id: 3,
      path: <Vote_StatusDraft listDraft={listDraft} />,
      value: "Draft",
    },
    {
      id: 4,
      path: <Vote_StatusReject listReject={listReject} />,
      value: "Reject",
    },
  ];

  return (
    <>
      <Tabs
        mt={1}
        variant="pills"
        radius={"xl"}
        defaultValue={"Publish"}
        value={tabsStatus}
        onTabChange={setTabsStatus}
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
