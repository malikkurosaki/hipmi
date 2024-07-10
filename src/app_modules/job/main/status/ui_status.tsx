"use client";

import { Tabs, Stack } from "@mantine/core";
import { useAtom } from "jotai";
import { gs_job_status } from "../../global_state";
import Job_Draft from "./draft";
import Job_Publish from "./publish";
import Job_Reject from "./reject";
import Job_Review from "./review";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";

export default function Job_UiStatus({
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
  const [tabsStatus, setTabsStatus] = useAtom(gs_job_status);
  const listTabs = [
    {
      id: 1,
      path: <Job_Publish listPublish={listPublish} />,
      value: "Publish",
    },
    {
      id: 2,
      path: <Job_Review listReview={listReview} />,
      value: "Review",
    },
    {
      id: 3,
      path: <Job_Draft listDraft={listDraft} />,
      value: "Draft",
    },
    {
      id: 4,
      path: <Job_Reject listReject={listReject} />,
      value: "Reject",
    },
  ];
  return (
    <>
      <Tabs
        mt={1}
        color="yellow"
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
            paddingTop: 10
          }
          
        }}
      >
        <Stack>
          <Tabs.List grow>
            {listTabs.map((e) => (
              <Tabs.Tab
                key={e.id}
                value={e.value}
                fw={"bold"}
                color={tabsStatus === e.value ? "black" : "white"}
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
