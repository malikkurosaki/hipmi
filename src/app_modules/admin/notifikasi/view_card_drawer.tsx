import {
  gs_adminJobTriggerReview,
  gs_adminEventTriggerReview,
} from "@/app/lib/global_state";
import { AccentColor } from "@/app_modules/_global/color";
import { ComponentGlobal_CardLoadingOverlay } from "@/app_modules/_global/component";
import { MODEL_NOTIFIKASI } from "@/app_modules/notifikasi/model/interface";
import { Card, Stack, Group, Badge, Divider, Text } from "@mantine/core";
import { IconChecks, IconCheck } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import adminNotifikasi_countNotifikasi from "./fun/count/count_is_read";
import adminNotifikasi_getByUserId from "./fun/get/get_notifikasi_by_user_id";
import { adminNotifikasi_findRouterEvent } from "./route_setting/event";
import { adminNotifikasi_findRouterJob } from "./route_setting/job";
import {
  IAdmin_ActivePage,
  IAdmin_ActiveChildId,
} from "./route_setting/type_of_select_page";

export default function AdminNotifikasi_ViewCardDrawer({
  data,
  activePage,
  onChangeNavbar,
  onToggleNavbar,
  onLoadCountNotif,
  onLoadDataNotifikasi,
}: {
  data: MODEL_NOTIFIKASI;
  activePage: number;
  onChangeNavbar: (val: {
    id: IAdmin_ActivePage;
    childId: IAdmin_ActiveChildId;
  }) => void;
  onToggleNavbar: (val: any) => void;
  onLoadCountNotif: (val: any) => void;
  onLoadDataNotifikasi: (val: any) => void;
}) {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [dataId, setDataId] = useState<string>("");

  // Realtime
  const [isAdminJob_TriggerReview, setIsAdminJob_TriggerReview] = useAtom(
    gs_adminJobTriggerReview
  );
  const [isAdminEvent_TriggerReview, setIsAdminEvent_TriggerReview] = useAtom(
    gs_adminEventTriggerReview
  );

  async function onRead({ data }: { data: MODEL_NOTIFIKASI }) {
    // JOB
    if (data?.kategoriApp === "JOB") {
      const checkJob = await adminNotifikasi_findRouterJob({
        data: data,
      });

      if (checkJob?.success) {
        setVisible(true);
        setDataId(data.id);

        const loadCountNotif = await adminNotifikasi_countNotifikasi();
        onLoadCountNotif(loadCountNotif);

        const loadListNotifikasi = await adminNotifikasi_getByUserId({
          page: activePage,
        });
        onLoadDataNotifikasi(loadListNotifikasi as any);

        if (loadCountNotif && loadListNotifikasi) {
          const path = `/dev/admin/job/child/${checkJob.statusName}`;

          if (checkJob.statusName == "publish") {
            onChangeNavbar({
              id: "Job",
              childId: "Job_2",
            });
          }

          if (checkJob.statusName == "review") {
            onChangeNavbar({
              id: "Job",
              childId: "Job_3",
            });
          }

          if (checkJob.statusName == "reject") {
            onChangeNavbar({
              id: "Job",
              childId: "Job_4",
            });
          }

          setIsAdminJob_TriggerReview(false);
          router.push(path);
          setVisible(false);
          setDataId("");
        }
      }
    }

    // EVENT
    if (data.kategoriApp == "EVENT") {
      const checkEvent = await adminNotifikasi_findRouterEvent({
        data: data,
      });

      if (checkEvent?.success) {
        setVisible(true);
        setDataId(data.id);

        const loadCountNotif = await adminNotifikasi_countNotifikasi();
        onLoadCountNotif(loadCountNotif);

        const loadListNotifikasi = await adminNotifikasi_getByUserId({
          page: activePage,
        });
        onLoadDataNotifikasi(loadListNotifikasi as any);

        if (loadCountNotif && loadListNotifikasi) {
          const path = `/dev/admin/event/table/${checkEvent.statusName}`;

          if (checkEvent.statusName == "publish") {
            onChangeNavbar({
              id: "Event",
              childId: "Event_2",
            });
          }

          if (checkEvent.statusName == "review") {
            onChangeNavbar({
              id: "Event",
              childId: "Event_3",
            });
          }

          if (checkEvent.statusName == "reject") {
            onChangeNavbar({
              id: "Event",
              childId: "Event_4",
            });
          }

          setIsAdminEvent_TriggerReview(false);
          router.push(path);
          setVisible(false);
          setDataId("");
        }
      }
    }

    // // FORUM
    // e?.kategoriApp === "FORUM" &&
    //   adminNotifikasi_findRouterForum({
    //     data: e,
    //     router: router,
    //     onChangeNavbar(val) {
    //       onChangeNavbar(val);
    //     },
    //     onToggleNavbar(val) {
    //       onToggleNavbar(val);
    //     },
    //   });

    // // VOTE
    // e?.kategoriApp === "VOTING" &&
    //   adminNotifikasi_findRouterVoting({
    //     data: e,
    //     router: router,
    //     onChangeNavbar(val) {
    //       onChangeNavbar(val);
    //     },
    //     onToggleNavbar(val) {
    //       onToggleNavbar(val);
    //     },
    //   });

    // //   EVENT
    // e?.kategoriApp === "EVENT" &&
    //

    // // DONASI
    // e.kategoriApp === "DONASI" &&
    //   adminNotifikasi_findRouterDonasi({
    //     data: e,
    //     router: router,
    //     onChangeNavbar(val) {
    //       onChangeNavbar(val);
    //     },
    //     onToggleNavbar(val) {
    //       onToggleNavbar(val);
    //     },
    //   });

    // // INVESTASI
    // e.kategoriApp === "INVESTASI" &&
    //   adminNotifikasi_findRouterInvestasi({
    //     data: e,
    //     router: router,
    //     onChangeNavbar(val) {
    //       onChangeNavbar(val);
    //     },
    //     onToggleNavbar(val) {
    //       onToggleNavbar(val);
    //     },
    //   });
  }

  return (
    <>
      <Card
        style={{
          transition: "0.5s",
        }}
        mb={"md"}
        c={"white"}
        key={data.id}
        bg={data.isRead ? "gray" : AccentColor.darkblue}
        sx={{
          borderColor: AccentColor.blue,
          borderStyle: "solid",
          borderWidth: "2px",
          ":hover": {
            backgroundColor: AccentColor.blue,
            borderColor: AccentColor.softblue,
            borderStyle: "solid",
            borderWidth: "2px",
          },
        }}
        onClick={async () => {
          onRead({ data: data });
          // callBackIsNotifikasi(false);
        }}
      >
        <Card.Section p={"sm"}>
          <Stack spacing={"xs"}>
            <Group position="apart">
              <Text fw={"bold"} fz={10}>
                # {data.kategoriApp}
              </Text>
              {data.status ? (
                <Badge fz={10} size="sm">
                  {data.status}
                </Badge>
              ) : (
                ""
              )}
            </Group>
            <Divider color="gray.3" />
          </Stack>
        </Card.Section>
        <Card.Section px={"sm"} pb={"sm"}>
          <Stack spacing={0}>
            <Text lineClamp={2} fw={"bold"} fz={"xs"}>
              {data.title}
            </Text>
            <Text lineClamp={2} fz={"xs"}>
              {data.pesan}
            </Text>
          </Stack>
        </Card.Section>
        <Card.Section p={"sm"}>
          <Group position="apart">
            <Text fz={10}>
              {new Intl.DateTimeFormat("id-ID", {
                dateStyle: "long",
              }).format(data.createdAt)}

              <Text span inherit fz={10}>
                {", "}
                {new Intl.DateTimeFormat("id-ID", {
                  timeStyle: "short",
                }).format(data.createdAt)}
              </Text>
            </Text>
            {data.isRead ? (
              <Group spacing={5}>
                <IconChecks size={10} />
                <Text fz={10}>Sudah dilihat</Text>
              </Group>
            ) : (
              <Group spacing={5}>
                <IconCheck size={10} />
                <Text fz={10}>Belum dilihat</Text>
              </Group>
            )}
          </Group>
          {visible && dataId === data.id && (
            <ComponentGlobal_CardLoadingOverlay />
          )}
        </Card.Section>
      </Card>
    </>
  );
}
