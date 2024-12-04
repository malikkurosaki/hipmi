"use client";

import { Stack, Tabs } from "@mantine/core";
import { useState } from "react";
import Vote_SemuaRiwayat from "./semua";
import Vote_RiwayatSaya from "./saya";
import { useAtom } from "jotai";
import { gs_vote_riwayat } from "../../global_state";
import { MODEL_VOTING } from "../../model/interface";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import { useRouter } from "next/navigation";
import { RouterVote } from "@/app/lib/router_hipmi/router_vote";

export default function Vote_Riwayat({
  riwayatId,
  listRiwayat,
  listRiwayatSaya,
}: {
  riwayatId: string;
  listRiwayat?: MODEL_VOTING[];
  listRiwayatSaya?: MODEL_VOTING[];
}) {
  const router = useRouter();
  const [changeStatus, setChangeStatus] = useState(riwayatId);

  const listTabs = [
    {
      id: "1",
      value: "Semua",
      label: "Semua Riwayat",
    },
    {
      id: "2",
      value: "Saya",
      label: "Riwayat Saya",
    },
  ];

  async function onChangeStatus({ statusId }: { statusId: string }) {
    router.push(RouterVote.riwayat({ id: statusId }));
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
            {listTabs.map((e, i) => (
              <Tabs.Tab
                key={i}
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
                {e.label}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          {riwayatId === "1" && (
            <Vote_SemuaRiwayat listRiwayat={listRiwayat as any} />
          )}

          {riwayatId === "2" && (
            <Vote_RiwayatSaya listRiwayatSaya={listRiwayatSaya as any} />
          )}
        </Stack>
      </Tabs>
    </>
  );
}
