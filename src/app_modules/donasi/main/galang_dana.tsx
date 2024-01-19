"use client";

import {
  Affix,
  Box,
  Button,
  Divider,
  Stack,
  Tabs,
  TabsProps,
  Text,
  rem,
} from "@mantine/core";
import { IconCirclePlus } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { gs_donasi_tabs_posting } from "../global_state";
import PostingPublishDonasi from "./galang_dana/publish";
import PostingReviewDonasi from "./galang_dana/review";
import PostingRejectDonasi from "./galang_dana/reject";
import { Warna } from "@/app/lib/warna";
import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import PostingDraftDonasi from "./galang_dana/draft";

export default function GalangDanaDonasi({
  listPublish,
  listReview,
  listDraft,
  listReject
}: {
  listPublish: any;
  listReview: any;
  listDraft: any;
  listReject: any
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
      <Affix position={{ bottom: rem(100), right: rem(20) }}>
        <Button
          radius={"xl"}
          bg={"orange"}
          color="orange"
          leftIcon={<IconCirclePlus />}
          onClick={() => router.push(RouterDonasi.create_donasi)}
        >
          Galang Dana
        </Button>
      </Affix>
      <Stack>
        <Tabs
          color="orange"
          variant="pills"
          radius="xl"
          defaultValue="Publish"
          value={tabsPostingDonasi}
          onTabChange={setTabsPostingDonasi}
        >
          <Stack>
            <Tabs.List grow>
              {listPosting.map((e, i) => (
                <Tabs.Tab
                  key={e.id}
                  value={e.value}
                  bg={tabsPostingDonasi === e.value ? e.color : "gray.1"}
                >
                  <Text
                    c={tabsPostingDonasi === e.value ? "white" : "gray"}
                    fw={tabsPostingDonasi === e.value ? 900 : "normal"}
                  >
                    {e.value}
                  </Text>
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
      </Stack>
    </>
  );
}
