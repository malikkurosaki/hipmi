"use client";

import {
  ActionIcon,
  Box,
  Center,
  Flex,
  Image,
  Loader,
  LoadingOverlay,
  Paper,
  SimpleGrid,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";

import {
  IconAffiliate,
  IconBriefcase,
  IconHeartHandshake,
  IconMap2,
  IconMessages,
  IconPackageImport,
  IconPresentation,
  IconShoppingBag,
  IconUserCircle,
} from "@tabler/icons-react";

import toast from "react-simple-toasts";
import { useRouter } from "next/navigation";
import { MODEL_PROFILE_OLD } from "./model/user_profile";
import AppNotif from "../notif";
import { RouterEvent } from "@/app/lib/router_hipmi/router_event";
import { RouterVote } from "@/app/lib/router_hipmi/router_vote";
import { MODEL_USER } from "./model/interface";
import { ComponentGlobal_NotifikasiPeringatan } from "../component_global/notif_global/notifikasi_peringatan";
import { RouterJob } from "@/app/lib/router_hipmi/router_job";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { RouterForum } from "@/app/lib/router_hipmi/router_forum";
import ComponentGlobal_V2_LoadingPage from "../component_global/loading_page_v2";
import { RouterColab } from "@/app/lib/router_hipmi/router_colab";

export default function HomeView({ dataUser }: { dataUser: MODEL_USER }) {
  const router = useRouter();
  // const [stateUser, setStateUser] = useState(user);
  const [loading, setLoading] = useState(false);
  const [visible, { toggle }] = useDisclosure(false);

  const listHalaman = [
    {
      id: 1,
      name: "Forums",
      icon: <IconMessages size={50} />,
      link: RouterForum.splash,
    },

    {
      id: 2,
      name: "Event",
      icon: <IconPresentation size={50} />,
      link: RouterEvent.splash,
    },
    {
      id: 3,
      name: "Business Maps",
      icon: <IconMap2 size={50} />,
      link: "",
    },
    {
      id: 4,
      name: "Voting",
      icon: <IconPackageImport size={50} />,
      link: RouterVote.splash,
    },
    {
      id: 5,
      name: "Project Collaboration",
      icon: <IconAffiliate size={50} />,
      link: RouterColab.splash,
    },
    {
      id: 6,
      name: "Crowd Funding",
      icon: <IconHeartHandshake size={50} />,
      link: `/dev/crowd/splash`,
    },
    {
      id: 7,
      name: "Job Vacancy",
      icon: <IconBriefcase size={50} />,
      link: RouterJob.spalsh,
    },

    {
      id: 8,
      name: "Marketplace",
      icon: <IconShoppingBag size={50} />,
      link: "",
    },
  ];

  return (
    <>
      {visible ? <ComponentGlobal_V2_LoadingPage /> : ""}

      <Box>
        <Paper bg={"dark"} radius={5} mb={"xs"}>
          <Image alt="logo" src={"/aset/home/home-hipmi.png"} />
        </Paper>

        {/* <pre>{JSON.stringify(stateUser, null, 2)}</pre> */}

        <Box my={"sm"}>
          <SimpleGrid
            cols={2}
            spacing="md"
            // breakpoints={[
            //   { maxWidth: 'md', cols: 2, spacing: 'md' },
            //   { maxWidth: 'sm', cols: 2, spacing: 'sm' },
            //   { maxWidth: 'xs', cols: 1, spacing: 'xs' },
            // ]}
          >
            {listHalaman.map((e, i) => (
              <Paper
                key={e.id}
                h={100}
                withBorder
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
                      toggle();
                      return router.push(e.link);
                    }
                  }
                }}
              >
                <Flex
                  justify={"center"}
                  align={"center"}
                  direction={"column"}
                  h={100}
                >
                  <ActionIcon
                    size={50}
                    variant="transparent"
                    color={e.link === "" ? "gray" : "teal"}
                  >
                    {e.icon}
                  </ActionIcon>
                  <Text c={e.link === "" ? "gray" : "teal"} fz={"sm"}>
                    {e.name}
                  </Text>
                </Flex>
              </Paper>
            ))}
          </SimpleGrid>
        </Box>
      </Box>
    </>
  );
}
