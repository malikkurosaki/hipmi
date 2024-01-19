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

// export const dynamic = "force-dynamic"
// export const revalidate = 0

export default function HomeView() {
  const router = useRouter();
  // const [stateUser, setStateUser] = useState(user);

  const listHalaman = [
    {
      id: 1,
      name: "Crowd Funding",
      icon: <IconHeartHandshake size={50} />,
      link: `/dev/crowd/splash`,
    },
    {
      id: 2,
      name: "Event",
      icon: <IconPresentation size={50} />,
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
      name: "Project Collaboration",
      icon: <IconAffiliate size={50} />,
      link: "",
    },
    {
      id: 5,
      name: "Forums",
      icon: <IconMessages size={50} />,
      link: "",
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
        {/* <Flex align={"center"} gap={"sm"}>
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
        </Flex> */}

        <Paper bg={"dark"} radius={5} my={"xs"}>
          <Image alt="logo" src={"/aset/investasi/home-hipmi.png"} />
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
                  // if (stateUser.Profile === null) {
                  //   return toast("Lengkapi Profile Anda !");
                  // } else {
                  //   if (e.link === "") {
                  //     toast(e.name);
                  //   } else {
                  //     return router.push(e.link);
                  //   }
                  // }
                  if (e.link === "") {
                    toast("Cooming Soon !!");
                  } else {
                    return router.push(e.link);
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
                  <Text c={e.link === "" ? "gray" : "teal"}>{e.name}</Text>
                </Flex>
              </Paper>
            ))}
          </SimpleGrid>
        </Box>
      </Box>
    </>
  );
}
