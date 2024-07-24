"use client";

import {
  Stack,
  Tabs,
  Text
} from "@mantine/core";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { gs_donasi_tabs_posting } from "../../global_state";
import PostingDraftDonasi from "./draft";
import PostingPublishDonasi from "./publish";
import PostingRejectDonasi from "./reject";
import PostingReviewDonasi from "./review";
import { AccentColor, MainColor } from "@/app_modules/_global/color/color_pallet";

export default function GalangDanaDonasi({
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
  const [tabsPostingDonasi, setTabsPostingDonasi] = useAtom(
    gs_donasi_tabs_posting
  );

  const listPosting = [
    {
      id: 1,
      value: "Publish",
      path: <PostingPublishDonasi listPublish={listPublish} />,
      color: "green",
    },
    {
      id: 2,
      value: "Review",
      path: <PostingReviewDonasi listReview={listReview} />,
      color: "yellow",
    },
    {
      id: 3,
      value: "Draft",
      path: <PostingDraftDonasi listDraft={listDraft} />,
      color: "red",
    },
    {
      id: 4,
      value: "Reject",
      path: <PostingRejectDonasi listReject={listReject} />,
      color: "red",
    },
  ];

  return (
    <>
      <Tabs
        color="orange"
        variant="pills"
        radius="xl"
        defaultValue="Publish"
        value={tabsPostingDonasi}
        onTabChange={setTabsPostingDonasi}
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
            {listPosting.map((e, i) => (
              <Tabs.Tab
                key={e.id}
                value={e.value}
                fw={"bold"}
                c={"black"}
                style={{
                  transition: "0.5s",
                  backgroundColor:
                    tabsPostingDonasi === e.value ? MainColor.yellow : "white",
                  border:
                    tabsPostingDonasi === e.value
                      ? `1px solid ${AccentColor.yellow}`
                      : `1px solid white`,
                }}
              >
                {e.value}
              </Tabs.Tab>
            ))}
          </Tabs.List>
          {listPosting.map((e, i) => (
            <Tabs.Panel key={e.id} value={e.value} pt="xs">
              {e.path}
            </Tabs.Panel>
          ))}
        </Stack>
      </Tabs>
    </>
  );
}
