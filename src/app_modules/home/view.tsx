"use client";

import {
  ActionIcon,
  Box,
  Center,
  Group,
  Image,
  Loader,
  LoadingOverlay,
  Overlay,
  Paper,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";

import {
  IconAffiliate,
  IconBriefcase,
  IconHeartHandshake,
  IconPackageImport,
  IconPresentation,
  IconUserSearch,
} from "@tabler/icons-react";

import { RouterColab } from "@/app/lib/router_hipmi/router_colab";
import { RouterEvent } from "@/app/lib/router_hipmi/router_event";
import { RouterJob } from "@/app/lib/router_hipmi/router_job";
import { RouterVote } from "@/app/lib/router_hipmi/router_vote";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AccentColor, MainColor } from "../component_global/color/color_pallet";
import ComponentGlobal_IsEmptyData from "../component_global/is_empty_data";
import { ComponentGlobal_NotifikasiPeringatan } from "../component_global/notif_global/notifikasi_peringatan";
import { MODEL_JOB } from "../job/model/interface";
import { MODEL_USER } from "./model/interface";

export default function HomeView({
  dataUser,
  dataJob,
}: {
  dataUser: MODEL_USER;
  dataJob: MODEL_JOB[];
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [pageId, setPageId] = useState(0);

  const listPageOnBox = [
    {
      id: 1,
      name: "Event",
      icon: <IconPresentation size={50} />,
      link: RouterEvent.splash,
    },
    {
      id: 2,
      name: "Project Collaboration",
      icon: <IconAffiliate size={50} />,
      link: RouterColab.splash,
    },

    {
      id: 3,
      name: "Voting",
      icon: <IconPackageImport size={50} />,
      link: RouterVote.splash,
    },

    {
      id: 4,
      name: "Crowd Funding",
      icon: <IconHeartHandshake size={50} />,
      link: `/dev/crowd/splash`,
    },
  ];

  const routePageJob = {
    name: "Job Vacancy",
    icon: <IconBriefcase size={50} />,
    link: RouterJob.spalsh,
  };

  return (
    <>
      <Box p={"md"}>
        <Paper
          radius={"xl"}
          mb={"xs"}
          style={{
            borderRadius: "10px 10px 10px 10px",
            border: `2px solid ${AccentColor.blue}`,
          }}
        >
          <Image radius={"lg"} alt="logo" src={"/aset/home/home-hipmi.png"} />
        </Paper>

        <Stack my={"sm"}>
          <SimpleGrid
            cols={2}
            spacing="md"
            // breakpoints={[
            //   { maxWidth: 'md', cols: 2, spacing: 'md' },
            //   { maxWidth: 'sm', cols: 2, spacing: 'sm' },
            //   { maxWidth: 'xs', cols: 1, spacing: 'xs' },
            // ]}
          >
            {listPageOnBox.map((e, i) => (
              <Paper
                key={e.id}
                h={150}
                bg={MainColor.darkblue}
                style={{
                  borderRadius: "10px 10px 10px 10px",
                  border: `2px solid ${AccentColor.blue}`,
                }}
                onClick={() => {
                  if (dataUser.Profile === null) {
                    return ComponentGlobal_NotifikasiPeringatan(
                      "Lengkapi Data Profile"
                    );
                  } else {
                    if (e.link === "") {
                      return ComponentGlobal_NotifikasiPeringatan(
                        "Cooming Soon !!"
                      );
                    } else {
                      setIsLoading(true);
                      setPageId(e.id);
                      router.push(e.link);
                    }
                  }
                }}
              >
                <Stack align="center" justify="center" h={"100%"}>
                  <ActionIcon
                    size={50}
                    variant="transparent"
                    c={e.link === "" ? "gray.3" : "white"}
                  >
                    {isLoading && e.id === pageId ? <Loader /> : e.icon}
                  </ActionIcon>
                  <Text c={e.link === "" ? "gray.3" : "white"} fz={"sm"}>
                    {e.name}
                  </Text>
                </Stack>
              </Paper>
            ))}
          </SimpleGrid>

          {/* Job View */}

          <Paper
            p={"md"}
            w={"100%"}
            bg={MainColor.darkblue}
            style={{
              borderRadius: "10px 10px 10px 10px",
              border: `2px solid ${AccentColor.blue}`,
            }}
          >
            <Stack
              onClick={() => {
                if (dataUser.Profile === null) {
                  return ComponentGlobal_NotifikasiPeringatan(
                    "Lengkapi Data Profile"
                  );
                } else {
                  if (routePageJob.link === "") {
                    return ComponentGlobal_NotifikasiPeringatan(
                      "Cooming Soon !!"
                    );
                  } else {
                    return router.push(routePageJob.link);
                  }
                }
              }}
            >
              <Group>
                <ActionIcon
                  size={40}
                  c={routePageJob.link === "" ? "gray.3" : "white"}
                >
                  {routePageJob.icon}
                </ActionIcon>
                <Text c={routePageJob.link === "" ? "gray.3" : "white"}>
                  {routePageJob.name}
                </Text>
              </Group>

              {_.isEmpty(dataJob) ? (
                <ComponentGlobal_IsEmptyData text="-" height={10} />
              ) : (
                <SimpleGrid cols={2} spacing="md">
                  {dataJob.map((e, i) => (
                    <Stack key={e.id}>
                      <Group spacing={"xs"}>
                        <Stack h={"100%"} align="center" justify="flex-start">
                          <IconUserSearch size={20} color="white" />
                        </Stack>
                        <Stack spacing={0} w={"80%"}>
                          <Text c={MainColor.yellow} fw={"bold"}>
                            {e?.Author.username}
                          </Text>
                          <Text c={"white"} lineClamp={2} fz={"sm"}>
                            {e?.title}
                          </Text>
                        </Stack>
                      </Group>
                    </Stack>
                  ))}
                </SimpleGrid>
              )}
            </Stack>
          </Paper>
        </Stack>
      </Box>
    </>
  );
}
