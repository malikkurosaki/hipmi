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
import { gs_StatusPortoInvestasi } from "../g_state";
import {
  MODEL_Investasi,
  MODEL_Status_investasi,
} from "../model/model_investasi";
import _ from "lodash";

export default function PortofolioInvestasi({
  dataInvestasi,
  listStatusInvestasi,
}: {
  dataInvestasi: any
  listStatusInvestasi: any;
}) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useAtom(gs_StatusPortoInvestasi);

  const [investasi, setInvestasi] = useState<MODEL_Investasi[]>(dataInvestasi);
  const [status_inves, setStatus_inves] =
    useState<MODEL_Status_investasi[]>(listStatusInvestasi);

  return (
    <>
      {/* <pre>{JSON.stringify(dataInvestasi, null, 2)}</pre> */}
      <Tabs
        variant="pills"
        radius="xl"
        defaultValue="Draft"
        value={activeTab}
        onTabChange={setActiveTab}
      >
        <Tabs.List>
          {status_inves.map((e) => (
            <Tabs.Tab
              key={e.id}
              value={e.name}
              color={!activeTab ? "gray" : e.color}
            >
              {e.name}
            </Tabs.Tab>
          ))}
        </Tabs.List>
        <Divider my={"xs"} />
        <Tabs.Panel key={"1"} value="Draft">
          <Draft data={investasi as any} />
        </Tabs.Panel>
        <Tabs.Panel key={"2"} value="Review">
          <Review status={status_inves as any} data={investasi as any} />
        </Tabs.Panel>
        <Tabs.Panel key={"3"} value="Publish">
          <Publish status={status_inves as any} />
        </Tabs.Panel>
        <Tabs.Panel key={"4"} value="Reject">
          <Reject status={status_inves as any} />
        </Tabs.Panel>
      </Tabs>
    </>
  );
}

function Draft({ data }: { data: MODEL_Investasi[] }) {
  const router = useRouter();
  return (
    <>
      {data.map((e) =>
        e.MasterStatusInvestasi.id === "1" ? (
          <Card
            key={e.id}
            withBorder
            mb={40}
            bg={"gray.5"}
            onClick={() =>
              router.push(RouterInvestasi.detail_draft + `${e.id}`)
            }
          >
            <CardSection p={"xs"}>
              <AspectRatio ratio={16 / 9}>
                <Image
                  alt=""
                  src={RouterInvestasi.api_gambar + `${e.imagesId}`}
                />
              </AspectRatio>
            </CardSection>

            <CardSection p={"lg"}>
              <Box>
                <Title order={4}>{e.title}</Title>
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
        ) : (
          ""
        )
      )}
    </>
  );
}

function Review({
  status,
  data,
}: {
  status: MODEL_Status_investasi;
  data: MODEL_Investasi[];
}) {
  const router = useRouter();
  return (
    <>
      {data.map((e) =>
        e.MasterStatusInvestasi.id === "2" ? (
          <Card
            key={e.id}
            withBorder
            mb={40}
            bg={"gray.5"}
            onClick={() => router.push(RouterInvestasi.detail_review + `${e.id}`)}
          >
            <CardSection p={"xs"}>
              <AspectRatio ratio={16 / 9}>
                <Image
                  alt=""
                  src={RouterInvestasi.api_gambar + `${e.imagesId}`}
                />
              </AspectRatio>
            </CardSection>

            <CardSection p={"lg"}>
              <Box>
                <Title order={4}>{e.title}</Title>
              </Box>
            </CardSection>
            <Divider />
            <CardSection p={"md"}>
              <Group position="center">
                <Badge color="yellow" variant="dot">
                  Review
                </Badge>
              </Group>
            </CardSection>
          </Card>
        ) : (
          ""
        )
      )}
    </>
  );
}

function Publish({ status }: { status: MODEL_Status_investasi }) {
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
              {status.name}
            </Badge>
            <Text>Sisa Waktu : 30 Hari</Text>
          </Group>
        </CardSection>
      </Card>
    </>
  );
}

function Reject({ status }: { status: MODEL_Status_investasi }) {
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
              {status.name}
            </Badge>
          </Group>
        </CardSection>
      </Card>
    </>
  );
}
