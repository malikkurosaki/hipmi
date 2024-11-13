"use client";

import { RouterJob } from "@/app/lib/router_hipmi/router_job";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_CardLoadingOverlay } from "@/app_modules/_global/component";
import { gs_job_hot_menu } from "@/app_modules/job/global_state";
import { Badge, Card, Divider, Group, Stack, Text } from "@mantine/core";
import { IconCheck, IconChecks } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import notifikasi_getByUserId from "../fun/get/get_notifiaksi_by_id";
import { gs_notifikasi_kategori_app } from "../lib";
import { MODEL_NOTIFIKASI } from "../model/interface";
import { notifikasi_jobCheckStatus } from "./path/job";

export function ComponentNotifiaksi_CardView({
  data,
  onLoadData,
  categoryPage,
}: {
  data: MODEL_NOTIFIKASI;
  onLoadData: (val: any) => void;
  categoryPage: any;
}) {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  const [jobMenuId, setJobMenuId] = useAtom(gs_job_hot_menu);

  return (
    <>
      <Card
        style={{
          backgroundColor: data?.isRead
            ? MainColor.darkblue
            : AccentColor.darkblue,
          color: data?.isRead ? "gray" : "white",
          border: data?.isRead
            ? `2px solid ${AccentColor.darkblue}`
            : `2px solid ${AccentColor.blue}`,
          borderRadius: "10px 10px 10px 10px",
        }}
        my={"xs"}
        onClick={async () => {
          if (data?.kategoriApp === "JOB") {
            const checkStatus = await notifikasi_jobCheckStatus({
              appId: data.appId,
              dataId: data.id,
            });

            if (checkStatus?.success) {
              const loadListNotifikasi = await notifikasi_getByUserId({
                page: 1,
                kategoriApp: "Job",
              });

              onLoadData(loadListNotifikasi);

              const path = RouterJob.status({
                id: checkStatus.statusId as string,
              });

              setJobMenuId(2);
              router.push(path);
              setVisible(true);
            }
          }

          // data?.kategoriApp === "FORUM" &&
          //   redirectDetailForumPage({
          //     data: data,
          //     router: router,
          //   });

          // data?.kategoriApp === "VOTING" &&
          //   redirectVotingPage({
          //     data: data,
          //     router: router,
          //     onSetPage(val) {
          //       // onSetMenu(val);
          //     },
          //   });

          // data?.kategoriApp === "EVENT" &&
          //   redirectEventPage({
          //     data: data,
          //     router: router,
          //     onSetPage(val) {
          //       // onSetMenu(val);
          //     },
          //   });

          // data?.kategoriApp === "COLLABORATION" &&
          //   redirectDetailCollaborationPage({
          //     data: data,
          //     router: router,
          //   });

          // data.kategoriApp === "DONASI" &&
          //   redirectDonasiPage({
          //     data: data,
          //     router: router,
          //     onSetPage(val) {
          //       // onSetMenu(val);
          //     },
          //   });

          // data.kategoriApp === "INVESTASI" &&
          //   redirectInvestasiPage({
          //     data: data,
          //     router: router,
          //     onSetPage(val) {
          //       // onSetMenu(val);
          //     },
          //   });
        }}
      >
        {/* <pre>{JSON.stringify(e, null, 2)}</pre> */}
        <Card.Section p={"sm"}>
          <Stack spacing={"xs"}>
            <Group position="apart">
              <Text fw={"bold"} fz={10}>
                # {data?.kategoriApp}
              </Text>
              {data?.status ? (
                <Badge
                  //   fz={10}
                  variant="outline"
                  color={data?.isRead ? "gray" : "teal"}
                >
                  {data?.status}
                </Badge>
              ) : (
                ""
              )}
            </Group>
            <Divider color={data?.isRead ? "gray" : "white"} />
          </Stack>
        </Card.Section>
        <Card.Section px={"sm"} pb={"sm"}>
          <Stack spacing={data.kategoriApp === "FORUM" ? 0 : "xs"}>
            <Text lineClamp={2} fw={"bold"}>
              {data?.title}
            </Text>
            {data.kategoriApp === "FORUM" ? (
              <div
                style={{ fontSize: 12 }}
                dangerouslySetInnerHTML={{ __html: data?.pesan }}
              />
            ) : (
              <Text lineClamp={2}>{data?.pesan}</Text>
            )}
          </Stack>
        </Card.Section>
        <Card.Section p={"sm"}>
          <Group position="apart">
            <Text fz={10} color="gray">
              {new Intl.DateTimeFormat("id-ID", {
                dateStyle: "long",
              }).format(data?.createdAt)}

              <Text span inherit fz={10} color="gray">
                {", "}
                {new Intl.DateTimeFormat("id-ID", {
                  timeStyle: "short",
                }).format(data?.createdAt)}
              </Text>
            </Text>
            {data?.isRead ? (
              <Group spacing={5}>
                <IconChecks color="gray" size={10} />
                <Text fz={10} color="gray">
                  Sudah dilihat
                </Text>
              </Group>
            ) : (
              <Group spacing={5}>
                <IconCheck color="gray" size={10} />
                <Text fz={10} color="gray">
                  Belum dilihat
                </Text>
              </Group>
            )}
          </Group>
          {visible && <ComponentGlobal_CardLoadingOverlay />}
        </Card.Section>
      </Card>
    </>
  );
}
