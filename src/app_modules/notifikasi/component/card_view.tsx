"use client";

import { Badge, Card, Divider, Group, Stack, Text } from "@mantine/core";
import { IconCheck, IconChecks } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import notifikasi_funUpdateIsReadById from "../fun/update/fun_update_is_read_by_user_id";
import { MODEL_NOTIFIKASI } from "../model/interface";
import { redirectDetailForumPage } from "./path/forum";
import { redirectJobPage } from "./path/job";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/component_global/color/color_pallet";
import notifikasi_getByUserId from "../fun/get/get_notifiaksi_by_id";

export function ComponentNotifiaksi_CardView({
  data,
  onLoadData,
  activePage,
  onSetJob,
}: {
  data: MODEL_NOTIFIKASI;
  onLoadData: (val: any) => void;
  activePage: number;
  onSetJob: (val: any) => void;
}) {
  const router = useRouter();
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
          data?.kategoriApp === "JOB" &&
            redirectJobPage({
              data: data,
              router: router,
              onSetPage(val) {
                onSetJob(val);
              },
            });

          data?.kategoriApp === "FORUM" &&
            redirectDetailForumPage({
              data: data,
              router: router,
            });

          const updateIsRead = await notifikasi_funUpdateIsReadById({
            notifId: data?.id,
          });

          if (updateIsRead.status === 200) {
            // console.log(updateIsRead.status);
            // const loadData = await notifikasi_getByUserId({ page: activePage });
            // onLoadData(loadData);
            // console.log("berhasil load")
          }
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
        </Card.Section>
      </Card>
    </>
  );
}
