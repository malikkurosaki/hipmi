"use client";

import {
  ActionIcon,
  Box,
  Center,
  Flex,
  Image,
  Loader,
  Paper,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import { Logout } from "../auth";
import { useState } from "react";
import { ApiHipmi } from "@/app/lib/api";
import { useShallowEffect } from "@mantine/hooks";
import { getToken } from "./api/api-get-token";

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
import { getProfile } from "../katalog/profile";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { gs_token } from "./state/global_state";
import { loadDataProfile } from "../katalog/profile/fun/fun_get_profile";
import {
  gs_fotoProfile,
  gs_profile,
} from "../katalog/profile/state/global_state";
import { gs_ListPortofolio } from "../katalog/portofolio/state/global_state";
import { myConsole } from "@/app/fun/my_console";
import { getFotoProfile } from "../katalog/profile/api/get-foto-profile";
import { funGetUserProfile } from "../fun/get_user_profile";
import { USER_PROFILE } from "../models/user_profile";
import AppNotif from "../notif";

// export const dynamic = "force-dynamic"
// export const revalidate = 0

export default function HomeView({ user }: { user: USER_PROFILE }) {
  const router = useRouter();
  const [stateUser, setStateUser] = useState(user);

  const listHalaman = [
    {
      id: 1,
      name: "Forums",
      icon: <IconMessages size={50} />,
      link: "",
    },
    {
      id: 2,
      name: "Project Collaboration",
      icon: <IconAffiliate size={50} />,
      link: "",
    },
    {
      id: 3,
      name: "Voting",
      icon: <IconPackageImport size={50} />,
      link: "",
    },
    {
      id: 4,
      name: "Event",
      icon: <IconPresentation size={50} />,
      link: "",
    },
    {
      id: 5,
      name: "Crowd Funding",
      icon: <IconHeartHandshake size={50} />,
      link: `/dev/crowd/splash`,
    },
    {
      id: 6,
      name: "Marketplace",
      icon: <IconShoppingBag size={50} />,
      link: "",
    },
    {
      id: 7,
      name: "Job Vacancy",
      icon: <IconBriefcase size={50} />,
      link: "",
    },
    {
      id: 8,
      name: "Business Maps",
      icon: <IconMap2 size={50} />,
      link: "",
    },
  ];

  return (
    <>
      <Box>
        <Flex align={"center"} gap={"sm"}>
          <ActionIcon
            size={30}
            variant="transparent"
            onClick={() => {
              if (stateUser.Profile === null) {
                return router.push(`/dev/profile/create/${stateUser.id}`);
              } else {
                return router.push(`/dev/katalog/${stateUser.Profile.id}`);
              }
            }}
          >
            <IconUserCircle size={50} color="black" />
          </ActionIcon>

          <Text>
            Welcome to ,{" "}
            {stateUser.username ? stateUser.username : <Loader size={"xs"} />}
          </Text>
        </Flex>

        <Paper bg={"dark"} radius={5} my={"xs"}>
          <Image alt="logo" src={"/aset/logo.png"} />
        </Paper>

        {/* <pre>{JSON.stringify(stateUser, null, 2)}</pre> */}

        <Box my={"sm"}>
          <SimpleGrid cols={2}>
            {listHalaman.map((e, i) => (
              <Paper
                key={e.id}
                h={100}
                withBorder
                onClick={() => {
                  if (stateUser.Profile === null) {
                    return toast("Lengkapi Profile Anda !");
                  } else {
                    if (e.link === "") {
                      toast(e.name);
                    } else {
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
                  {e.icon}
                  {e.name}
                </Flex>
              </Paper>
            ))}
          </SimpleGrid>
        </Box>
      </Box>
    </>
  );
}
