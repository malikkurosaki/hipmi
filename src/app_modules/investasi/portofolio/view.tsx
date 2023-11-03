"use client";

import {
  AspectRatio,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardSection,
  Collapse,
  Divider,
  Flex,
  Grid,
  Group,
  Image,
  Paper,
  ScrollArea,
  Select,
  Slider,
  Stack,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import dataDummy from "../dummy/data_dummy.json";
import moment from "moment";
import { useRouter } from "next/navigation";
import { IconCaretDown, IconCircleCheck } from "@tabler/icons-react";
import { useState } from "react";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useDisclosure } from "@mantine/hooks";
import { Warna } from "@/app/lib/warna";
import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import {
  IconPhoto,
  IconMessageCircle,
  IconSettings,
} from "@tabler/icons-react";
import { atomWithStorage } from "jotai/utils";
import { useAtom } from "jotai";
import { gs_TabPortoInvestasi } from "../g_state";


export default function PortofolioInvestasi() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useAtom(gs_TabPortoInvestasi)
  const listButton = [
    {
      id: 1,
      name: "Draft",
      color: "yellow",
    },
    {
      id: 2,
      name: "Review",
      color: "orange",
    },
    {
      id: 3,
      name: "Publish",
      color: "green",
    },
    {
      id: 4,
      name: "Reject",
      color: "red",
    },
  ];
  return (
    <>
      <Tabs  variant="pills"  radius="xl" defaultValue="Draft" value={activeTab} onTabChange={setActiveTab}>
        <Tabs.List>
          {listButton.map((e) => (
            <Tabs.Tab key={e.id} value={e.name} color={!activeTab ? "gray" : e.color} >
              {e.name}
            </Tabs.Tab>
          ))}
        </Tabs.List>

        <Divider my={"xs"}/>

        {listButton.map((e) => (
          <Tabs.Panel key={e.id} value={e.name} pt="xs">
            <StatusPortofolio data={e} />
          </Tabs.Panel>
        ))}
      </Tabs>
      
    </>
  );
}

function StatusPortofolio({ data }: { data: any }) {
  return (
    <>
      {(() => {
        if (data.id === 1) {
          return (
            <>
              <Draft data={data} />
            </>
          );
        } else {
          if (data.id === 2) {
            return (
              <>
                <Review data={data} />
              </>
            );
          } else {
            if (data.id === 3) {
              return (
                <>
                  <Publish data={data} />
                </>
              );
            } else {
              return (
                <>
                  <Reject data={data} />
                </>
              );
            }
          }
        }
      })()}
    </>
  );
}

function Draft({ data }: { data: any }) {
  const router = useRouter();
  return (
    <>
      <Card
        withBorder
        mb={40}
        bg={"gray.5"}
        onClick={() => router.push(RouterInvestasi.detail_draft)}
      >
        <CardSection p={"xs"}>
          <AspectRatio ratio={16 / 9}>
            <Image alt="" src={"/aset/no-img.png"} />
          </AspectRatio>
        </CardSection>

        <CardSection p={"lg"}>
          <Box>
            <Title order={4}>Judul Investasi</Title>
          </Box>
        </CardSection>
        <Divider />
        <CardSection p={"md"}>
          <Group position="center">
            <Badge color="yellow" variant="dot">
              Draft
            </Badge>
          </Group>
        </CardSection>
      </Card>
    </>
  );
}

function Review({ data }: { data: any }) {
  const router = useRouter();
  return (
    <>
      <Card
        withBorder
        mb={40}
        bg={"gray.5"}
        onClick={() => router.push(RouterInvestasi.detail_review)}
      >
        <CardSection p={"xs"}>
          <AspectRatio ratio={16 / 9}>
            <Image alt="" src={"/aset/no-img.png"} />
          </AspectRatio>
        </CardSection>

        <CardSection p={"lg"}>
          <Box >
            <Title order={4}>Judul Investasi</Title>
            
          </Box>
        </CardSection>
        <Divider />
        <CardSection p={"md"}>
          <Group position="center">
            <Badge color="orange" variant="dot">
              {data.name}
            </Badge>
          </Group>
        </CardSection>
      </Card>
    </>
  );
}

function Publish({ data }: { data: any }) {
  const router = useRouter();
  return (
    <>
      <Card
        withBorder
        mb={40}
        bg={"gray.5"}
        onClick={() => router.push(RouterInvestasi.detail_publish)}
      >
        <CardSection p={"xs"}>
          <AspectRatio ratio={16 / 9}>
            <Image alt="" src={"/aset/no-img.png"} />
          </AspectRatio>
        </CardSection>

        <CardSection p={"lg"}>
          <Box mb={"md"}>
            <Title order={4}>Judul Investasi</Title>
            <Slider
              size={10}
              disabled
              labelAlwaysOn
              value={60}
              marks={[{ value: 60, label: 60 + `%` }]}
            />
          </Box>
        </CardSection>
        <Divider />
        <CardSection p={"md"}>
          <Group position="apart">
            <Badge color="green" variant="dot">
              {data.name}
            </Badge>
            <Text>Sisa Waktu : 30 Hari</Text>
          </Group>
        
        </CardSection>
      </Card>
    </>
  );
}

function Reject({ data }: { data: any }) {
  const router = useRouter();
  return (
    <>
      <Card
        withBorder
        mb={40}
        bg={"gray.5"}
        onClick={() => router.push(RouterInvestasi.detail_reject)}
      >
        <CardSection p={"xs"}>
          <AspectRatio ratio={16 / 9}>
            <Image alt="" src={"/aset/no-img.png"} />
          </AspectRatio>
        </CardSection>

        <CardSection p={"lg"}>
          <Box>
            <Title order={4}>Judul Investasi</Title>
          </Box>
        </CardSection>
        <Divider />
        <CardSection p={"md"}>
          <Group position="center">
            <Badge color="red" variant="dot">
              {data.name}
            </Badge>
          </Group>
        </CardSection>
      </Card>
    </>
  );
}
