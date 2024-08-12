import { MODEL_NOTIFIKASI } from "@/app_modules/notifikasi/model/interface";
import {
  Center,
  Paper,
  Stack,
  Card,
  Group,
  Badge,
  Divider,
  Text,
} from "@mantine/core";
import { IconChecks, IconCheck } from "@tabler/icons-react";
import _ from "lodash";
import { useRouter } from "next/navigation";
import adminNotifikasi_countNotifikasi from "./fun/count/count_is_read";
import adminNotifikasi_getByUserId from "./fun/get/get_notifikasi_by_user_id";
import adminNotifikasi_funUpdateIsReadById from "./fun/update/fun_update_is_read_by_id";
import adminNotifikasi_findRouterDonasi from "./route_setting/donasi";
import { adminNotifikasi_findRouterEvent } from "./route_setting/event";
import adminNotifikasi_findRouterForum from "./route_setting/forum";
import adminNotifikasi_findRouterJob from "./route_setting/job";
import { adminNotifikasi_findRouterVoting } from "./route_setting/voting";
import adminNotifikasi_findRouterInvestasi from "./route_setting/investasi";

export function ComponentAdmin_UIDrawerNotifikasi({
  data,
  onLoadReadNotif,
  onChangeNavbar,
  onToggleNavbar,
  onLoadCountNotif,
}: {
  data: MODEL_NOTIFIKASI[];
  onLoadReadNotif: (val: any) => void;
  onChangeNavbar: (val: any) => void;
  onToggleNavbar: (val: any) => void;
  onLoadCountNotif: (val: any) => void;
}) {
  const router = useRouter();

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
              key={e?.id}
              // withBorder
              bg={e?.isRead ? "gray.1" : "gray.4"}
              sx={{
                borderColor: "gray",
                borderStyle: "solid",
                borderWidth: "0.5px",
                ":hover": {
                  backgroundColor: "#C1C2C5",
                },
              }}
              onClick={async () => {
                // JOB
                e?.kategoriApp === "JOB" &&
                  adminNotifikasi_findRouterJob({
                    data: e,
                    router: router,
                    onChangeNavbar: (val: any) => {
                      onChangeNavbar(val);
                    },
                    onToggleNavbar: onToggleNavbar,
                  });

                // FORUM
                e?.kategoriApp === "FORUM" &&
                  adminNotifikasi_findRouterForum({
                    data: e,
                    router: router,
                    onChangeNavbar(val) {
                      onChangeNavbar(val);
                    },
                    onToggleNavbar(val) {
                      onToggleNavbar(val);
                    },
                  });

                // VOTE
                e?.kategoriApp === "VOTING" &&
                  adminNotifikasi_findRouterVoting({
                    data: e,
                    router: router,
                    onChangeNavbar(val) {
                      onChangeNavbar(val);
                    },
                    onToggleNavbar(val) {
                      onToggleNavbar(val);
                    },
                  });

                //   EVENT
                e?.kategoriApp === "EVENT" &&
                  adminNotifikasi_findRouterEvent({
                    data: e,
                    router: router,
                    onChangeNavbar(val) {
                      onChangeNavbar(val);
                    },
                    onToggleNavbar(val) {
                      onToggleNavbar(val);
                    },
                  });

                // DONASI
                e.kategoriApp === "DONASI" &&
                  adminNotifikasi_findRouterDonasi({
                    data: e,
                    router: router,
                    onChangeNavbar(val) {
                      onChangeNavbar(val);
                    },
                    onToggleNavbar(val) {
                      onToggleNavbar(val);
                    },
                  });

                // INVESTASI
                e.kategoriApp === "INVESTASI" &&
                  adminNotifikasi_findRouterInvestasi({
                    data: e,
                    router: router,
                    onChangeNavbar(val) {
                      onChangeNavbar(val);
                    },
                    onToggleNavbar(val) {
                      onToggleNavbar(val);
                    },
                  });

                const updateIsRead = await adminNotifikasi_funUpdateIsReadById({
                  notifId: e?.id,
                });

                if (updateIsRead) {
                  const loadCountNotif =
                    await adminNotifikasi_countNotifikasi();
                  onLoadCountNotif(loadCountNotif);

                  const loadDataNotif = await adminNotifikasi_getByUserId();
                  onLoadReadNotif(loadDataNotif);
                } else {
                  return null;
                }

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
        </Stack>
      </Paper>
    </>
  );
}
