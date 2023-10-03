"use client";

import { ActionIcon, Box, Flex, Image, Paper, SimpleGrid, Text, Title } from "@mantine/core";
import { Logout } from "../auth";
import { useState } from "react";
import { ApiHipmi } from "@/app/lib/api";
import { useShallowEffect } from "@mantine/hooks";
import { getToken } from "./fun/get-token";

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
import router from "next/router";
import toast from "react-simple-toasts";

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
  const [token, setToken] = useState<any | null>(null);

  useShallowEffect(() => {
    getUserId();
  }, []);
  async function getUserId() {
    const data = await getToken();
    setToken(data);
  }

  return (
    <>
      {/* <pre>{JSON.stringify(token, null, 2)}</pre> */}
      
      <Box>
        <Flex align={"center"} gap={"sm"}>
          <ActionIcon
            size={30}
            variant="transparent"
            // onClick={() => {
            //   if (valToken?.data?.Profile === null) {
            //     return router.push("/dev/katalog/profile/create");
            //   } else {
            //     return router.push("/dev/katalog/view");
            //   }
            // }}
          >
            <IconUserCircle size={50} color="black" />
          </ActionIcon>

          <Text>Welcome to, {token?.username}</Text>
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
