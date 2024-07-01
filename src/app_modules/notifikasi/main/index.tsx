"use client";

import AppComponentGlobal_LayoutTamplate from "@/app_modules/component_global/component_layout_tamplate";
import ComponentGlobal_HeaderTamplate from "@/app_modules/component_global/header_tamplate";
import {
  Badge,
  Card,
  Divider,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { MODEL_NOTIFIKASI } from "../model/interface";
import { useState } from "react";
import adminNotifikasi_countNotifikasi from "@/app_modules/admin/notifikasi/fun/count/count_is_read";
import adminNotifikasi_getByUserId from "@/app_modules/admin/notifikasi/fun/get/get_notifikasi_by_user_id";
import adminNotifikasi_funUpdateIsReadById from "@/app_modules/admin/notifikasi/fun/update/fun_update_is_read_by_id";
import { IconChecks, IconCheck } from "@tabler/icons-react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { RouterJob } from "@/app/lib/router_hipmi/router_job";
import notifikasi_funUpdateIsReadById from "../fun/update/fun_update_is_read_by_user_id";
import { useAtom } from "jotai";
import { gs_job_hot_menu, gs_job_status } from "@/app_modules/job/global_state";
import _ from "lodash";
import ComponentGlobal_IsEmptyData from "@/app_modules/component_global/is_empty_data";
import { RouterForum } from "@/app/lib/router_hipmi/router_forum";
import notifikasi_getByUserId from "../fun/get/get_notifiaksi_by_id";
import { useShallowEffect } from "@mantine/hooks";
import { data } from "autoprefixer";

export default function Notifikasi_MainView({
  listNotifikasi,
}: {
  listNotifikasi: any[];
}) {
  return (
    <>
      <AppComponentGlobal_LayoutTamplate
        header={<ComponentGlobal_HeaderTamplate title="Notifikasi" />}
      >
        <MainView listNotifikasi={listNotifikasi} />
      </AppComponentGlobal_LayoutTamplate>
    </>
  );
}

function MainView({ listNotifikasi }: { listNotifikasi: MODEL_NOTIFIKASI[] }) {
  const router = useRouter();
  const [data, setData] = useState(listNotifikasi);

  // JOB
  const [jobMenuId, setJobMenuId] = useAtom(gs_job_hot_menu);
  const [jobStatus, setJobStatus] = useAtom(gs_job_status);

  useShallowEffect(() => {
    onLoadData({
      onLoad(val) {
        setData(val);
      },
    });
  }, []);

  async function onLoadData({ onLoad }: { onLoad: (val: any) => void }) {
    const loadData = await notifikasi_getByUserId();
    onLoad(loadData);
  }

  if (_.isEmpty(data)) {
    return <ComponentGlobal_IsEmptyData text="Tidak ada pemberitahuan" />;
  }
  return (
    <>
      <SimpleGrid
        cols={1}
        spacing="lg"
        breakpoints={[
          { maxWidth: "md", cols: 2, spacing: "md" },
          { maxWidth: "sm", cols: 2, spacing: "sm" },
          { maxWidth: "xs", cols: 1, spacing: "sm" },
        ]}
      >
        {data.map((e, i) => (
          <Card
            key={e?.id}
            // withBorder
            bg={e?.isRead ? "gray.1" : "gray.4"}
            sx={{
              borderColor: "gray",
              borderStyle: "solid",
              borderWidth: "0.5px",
            }}
            onClick={async () => {
              e?.kategoriApp === "JOB" &&
                redirectJobPage({
                  data: e,
                  router: router,
                  onSetPage(val) {
                    setJobMenuId(val.menuId);
                    setJobStatus(val.status);
                  },
                });

              e?.kategoriApp === "FORUM" &&
                redirectDetailForumPage({
                  data: e,
                  router: router,
                });

              const updateIsRead = await notifikasi_funUpdateIsReadById({
                notifId: e?.id,
              });
              if (updateIsRead.status === 200) return null;
            }}
          >
            {/* <pre>{JSON.stringify(e, null, 2)}</pre> */}
            <Card.Section p={"sm"}>
              <Stack spacing={"xs"}>
                <Group position="apart">
                  <Text fw={"bold"} fz={10}>
                    # {e?.kategoriApp}
                  </Text>
                  {e?.status ? <Badge fz={10}>{e?.status}</Badge> : ""}
                </Group>
                <Divider color="gray.3" />
              </Stack>
            </Card.Section>
            <Card.Section px={"sm"} pb={"sm"}>
              <Stack spacing={e.kategoriApp === "FORUM" ? 0 : "xs"}>
                <Text lineClamp={2} fw={"bold"} fz={"xs"}>
                  {e?.title}
                </Text>
                {e.kategoriApp === "FORUM" ? (
                  <div
                    style={{ fontSize: 12 }}
                    dangerouslySetInnerHTML={{ __html: e?.pesan }}
                  />
                ) : (
                  // <Text >
                  // </Text>
                  <Text lineClamp={2} fz={"xs"}>
                    {e?.pesan}
                  </Text>
                )}
              </Stack>
            </Card.Section>
            <Card.Section p={"sm"}>
              <Group position="apart">
                <Text fz={10} color="gray">
                  {new Intl.DateTimeFormat("id-ID", {
                    dateStyle: "long",
                  }).format(e?.createdAt)}

                  <Text span inherit fz={10} color="gray">
                    {", "}
                    {new Intl.DateTimeFormat("id-ID", {
                      timeStyle: "short",
                    }).format(e?.createdAt)}
                  </Text>
                </Text>
                {e?.isRead ? (
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
        ))}
      </SimpleGrid>
    </>
  );
}

function redirectJobPage({
  data,
  router,
  onSetPage,
}: {
  data: MODEL_NOTIFIKASI;
  router: AppRouterInstance;
  onSetPage: (val: any) => void;
}) {
  const path = RouterJob.status;

  if (data.status === "Publish") {
    onSetPage({
      menuId: 2,
      status: data.status,
    });
  }

  if (data.status === "Reject") {
    onSetPage({
      menuId: 2,
      status: data.status,
    });
  }

  router.push(path);
}

function redirectDetailForumPage({
  data,
  router,
}: {
  data: MODEL_NOTIFIKASI;
  router: AppRouterInstance;
}) {
  if (data.status === null) {
    const path = RouterForum.main_detail + data.appId;
    router.push(path);
  }

  if (data.status === "Report Komentar") {
    const path = RouterForum.detail_report_komentar + data.appId;
    router.push(path);
  }

  if (data.status === "Report Posting") {
    const path = RouterForum.detail_report_posting + data.appId;
    router.push(path);
  }
}
