import { AccentColor } from "@/app_modules/_global/color";
import { ComponentGlobal_CardLoadingOverlay } from "@/app_modules/_global/component";
import { MODEL_NOTIFIKASI } from "@/app_modules/notifikasi/model/interface";
import {
  Badge,
  Card,
  Center,
  Divider,
  Group,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
import { IconCheck, IconChecks } from "@tabler/icons-react";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import adminNotifikasi_countNotifikasi from "./fun/count/count_is_read";
import adminNotifikasi_getByUserId from "./fun/get/get_notifikasi_by_user_id";
import { adminNotifikasi_findRouterJob } from "./route_setting/job";
import {
  IAdmin_ActiveChildId,
  IAdmin_ActivePage,
} from "./route_setting/type_of_select_page";

export function ComponentAdmin_UIDrawerNotifikasi({
  listNotifikasi,
  onChangeNavbar,
  onToggleNavbar,
  onLoadCountNotif,
}: {
  listNotifikasi: MODEL_NOTIFIKASI[];
  onChangeNavbar: (val: {
    id: IAdmin_ActivePage;
    childId: IAdmin_ActiveChildId;
  }) => void;
  onToggleNavbar: (val: any) => void;
  onLoadCountNotif: (val: any) => void;
}) {
  const router = useRouter();
  const [data, setData] = useState<MODEL_NOTIFIKASI[]>(listNotifikasi);
  const [visible, setVisible] = useState(false);
  const [dataId, setDataId] = useState<string>("");

  async function onRead({ data }: { data: MODEL_NOTIFIKASI }) {
    // JOB
    if (data?.kategoriApp === "JOB") {
      const checkJob = await adminNotifikasi_findRouterJob({
        data: data,
      });

      if (checkJob) {
        setVisible(true);
        setDataId(data.id);

        const loadCountNotif = await adminNotifikasi_countNotifikasi();
        onLoadCountNotif(loadCountNotif);

        const loadListNotifikasi = await adminNotifikasi_getByUserId();
        setData(loadListNotifikasi as any);

        if (loadCountNotif && loadListNotifikasi) {
          onChangeNavbar({
            id: "Job",
            childId: "Job_3",
          });

          router.push("/dev/admin/job/child/review");
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
    //   adminNotifikasi_findRouterEvent({
    //     data: e,
    //     router: router,
    //     onChangeNavbar(val) {
    //       onChangeNavbar(val);
    //     },
    //     onToggleNavbar(val) {
    //       onToggleNavbar(val);
    //     },
    //   });

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

  if (_.isEmpty(data)) {
    return (
      <>
        <Center>
          <Text c={"gray"} fz={"xs"}>
            Tidak ada notifikasi
          </Text>
        </Center>
      </>
    );
  }

  return (
    <>
      <Paper h={"100%"}>
        <Stack>
          {data.map((e, i) => (
            <Card
              style={{
                transition: "0.5s",
              }}
              c={"white"}
              key={e?.id}
              bg={e?.isRead ? "gray" : AccentColor.darkblue}
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
                onRead({ data: e });
                // callBackIsNotifikasi(false);
              }}
            >
              <Card.Section p={"sm"}>
                <Stack spacing={"xs"}>
                  <Group position="apart">
                    <Text fw={"bold"} fz={10}>
                      # {e?.kategoriApp}
                    </Text>
                    {e?.status ? (
                      <Badge fz={10} size="sm">
                        {e?.status}
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
                    {e?.title}
                  </Text>
                  <Text lineClamp={2} fz={"xs"}>
                    {e?.pesan}
                  </Text>
                </Stack>
              </Card.Section>
              <Card.Section p={"sm"}>
                <Group position="apart">
                  <Text fz={10}>
                    {new Intl.DateTimeFormat("id-ID", {
                      dateStyle: "long",
                    }).format(e?.createdAt)}

                    <Text span inherit fz={10}>
                      {", "}
                      {new Intl.DateTimeFormat("id-ID", {
                        timeStyle: "short",
                      }).format(e?.createdAt)}
                    </Text>
                  </Text>
                  {e?.isRead ? (
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
                {visible && dataId === e?.id && (
                  <ComponentGlobal_CardLoadingOverlay />
                )}
              </Card.Section>
            </Card>
          ))}
        </Stack>
      </Paper>
    </>
  );
}
