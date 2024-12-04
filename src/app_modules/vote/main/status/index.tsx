"use client";

import { RouterVote } from "@/app/lib/router_hipmi/router_vote";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import { MODEL_NEW_DEFAULT_MASTER } from "@/app_modules/model_global/interface";
import { Box, Stack, Tabs } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MODEL_VOTING } from "../../model/interface";
import Vote_StatusDraft from "./draft";
import Vote_StatusPublish from "./publish";
import Vote_StatusReject from "./reject";
import Vote_StatusReview from "./review";

export default function Vote_Status({
  statusId,
  dataVoting,
  listStatus,
}: {
  statusId: string;
  dataVoting: MODEL_VOTING[];
  listStatus: MODEL_NEW_DEFAULT_MASTER[];
}) {

  const router = useRouter();
  const [changeStatus, setChangeStatus] = useState(statusId);

  async function onChangeStatus({ statusId }: { statusId: string }) {
    router.replace(RouterVote.status({ id: statusId }));
  }

  return (
    <>
      <Tabs
        mt={1}
        variant="pills"
        radius={"xl"}
        value={changeStatus}
        onTabChange={(val: any) => {
          setChangeStatus(val);
          onChangeStatus({ statusId: val });
        }}
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
            {listStatus.map((e) => (
              <Tabs.Tab
                w={"20%"}
                key={e.id}
                value={e.id}
                fw={"bold"}
                c={"black"}
                style={{
                  transition: "0.5s",
                  backgroundColor:
                    changeStatus === e.id ? MainColor.yellow : "white",
                  border:
                    changeStatus === e.id
                      ? `1px solid ${AccentColor.yellow}`
                      : `1px solid white`,
                }}
              >
                {e.name}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          <Box>
            {statusId === "1" && (
              <Vote_StatusPublish listPublish={dataVoting} />
            )}
            {statusId === "2" && <Vote_StatusReview listReview={dataVoting} />}
            {statusId === "3" && <Vote_StatusDraft listDraft={dataVoting} />}
            {statusId === "4" && <Vote_StatusReject listReject={dataVoting} />}
          </Box>
        </Stack>
      </Tabs>
    </>
  );
}
