"use client";

import {
  ActionIcon,
  Box,
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
import { getToken } from "./fun/api-get-token";

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
import { gs_fotoProfile, gs_profile } from "../katalog/profile/state/global_state";
import { loadListPortofolio } from "../katalog/portofolio/fun/fun_get_all_portofolio";
import { gs_ListPortofolio } from "../katalog/portofolio/state/global_state";
import { myConsole } from "@/app/fun/my_console";
import { getFotoProfile } from "../katalog/profile/api/get-foto-profile";

const listHalaman = [
  {
    id: 1,
    name: "Forums",
    icon: <IconMessages size={50} />,
  },
  {
    id: 2,
    name: "Project Collaboration",
    icon: <IconAffiliate size={50} />,
  },
  {
    id: 3,
    name: "Voting",
    icon: <IconPackageImport size={50} />,
  },
  {
    id: 4,
    name: "Event",
    icon: <IconPresentation size={50} />,
  },
  {
    id: 5,
    name: "Crowd Funding",
    icon: <IconHeartHandshake size={50} />,
  },
  {
    id: 6,
    name: "Marketplace",
    icon: <IconShoppingBag size={50} />,
  },
  {
    id: 7,
    name: "Job Vacancy",
    icon: <IconBriefcase size={50} />,
  },
  {
    id: 8,
    name: "Business Maps",
    icon: <IconMap2 size={50} />,
  },
];

export default function HomeView() {
  const router = useRouter();
  const [token, setToken] = useAtom(gs_token);


  useShallowEffect(() => {
    getUserId();
  }, []);
  async function getUserId() {
    const data = await getToken();
    setToken(data);
  }

  const [profile, setProfile] = useAtom(gs_profile);
  useShallowEffect(() => {
    loadDataProfile(setProfile);
  }, []);

  // const [foto, setFoto] = useAtom(gs_fotoProfile);
  // useShallowEffect(() => {
  //   if (profile?.imagesId === undefined) {
  //     return myConsole("Waiting data");
  //   } else {
  //     getFotoProfile(profile?.imagesId).then((v) => setFoto(v?.url));
  //   }
  // }, [profile?.imagesId]);

  // const [listPorto, setListPorto] = useAtom(gs_ListPortofolio)
  // useShallowEffect(() => {
  //   loadListPortofolio(profile?.id).then((res) => setListPorto(res));
  // }, [profile?.id]);

  return (
    <>
      {/* <pre>{JSON.stringify(profile, null, 2)}</pre> */}
      <Box>
        <Flex align={"center"} gap={"sm"}>
          <ActionIcon
            size={30}
            variant="transparent"
            onClick={() => {
              if (profile === null) {
                return router.push("/dev/katalog/profile/create");
              } else {
                return router.push("/dev/katalog/view");
              }
            }}
          >
            <IconUserCircle size={50} color="black" />
          </ActionIcon>

          <Text>
            Welcome to,{" "}
            {token?.username ? token?.username : <Loader size={"xs"} />}
          </Text>
        </Flex>
        <Paper bg={"dark"} radius={5} my={"xs"}>
          <Image alt="logo" src={"/aset/logo.png"} />
        </Paper>
        <Box my={"sm"}>
          <SimpleGrid cols={2}>
            {listHalaman.map((e, i) => (
              <Paper
                key={e.id}
                h={100}
                withBorder
                onClick={() => toast(e.name)}
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
