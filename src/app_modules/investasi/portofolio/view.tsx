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
import {
  IconCaretDown,
  IconCircleCheck,
  IconCirclePlus,
} from "@tabler/icons-react";
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
import Draft from "./draft";
import Review from "./review";
import Publish from "./publish";
import Reject from "./reject";

export default function PortofolioInvestasi({
  listStatusInvestasi,
  dataDraft,
  dataReview,
  dataPublish,
  dataReject,
}: {
  listStatusInvestasi: any;
  dataDraft: any;
  dataReview: any;
  dataPublish: any;
  dataReject: any;
}) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useAtom(gs_StatusPortoInvestasi);
  const [status_inves, setStatus_inves] =
    useState<MODEL_Status_investasi[]>(listStatusInvestasi);

  return (
    <>
      {/* <pre>{JSON.stringify(dataInvestasi, null, 2)}</pre> */}
      <Stack>
        {/* <Button
          radius={"xl"}
          bg={Warna.hijau_muda}
          color="green"
          leftIcon={<IconCirclePlus />}
          onClick={() => router.push(RouterInvestasi.create)}
        >
          Buat Proyek Invetasi
        </Button> */}
        <Tabs
          variant="pills"
          radius="xl"
          defaultValue="Draft"
          value={activeTab}
          onTabChange={setActiveTab}
        >
          <Stack>
            <Tabs.List grow>
              {status_inves.map((e) => (
                <Tabs.Tab
                  sx={
                    activeTab === e.name
                      ? {
                          boxShadow:
                            "0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 2px 6px 0 rgba(0, 0, 0, 0.2)",
                        }
                      : {}
                  }
                  key={e.id}
                  value={e.name}
                  bg={activeTab === e.name ? "blue" : "gray.1"}
                  fw={activeTab === e.name ? "bold" : "normal"}
                >
                  {e.name}
                </Tabs.Tab>
              ))}
            </Tabs.List>

            <Tabs.Panel key={"1"} value="Draft">
              <Draft data={dataDraft as any} />
            </Tabs.Panel>
            <Tabs.Panel key={"2"} value="Review">
              <Review data={dataReview as any} />
            </Tabs.Panel>
            <Tabs.Panel key={"3"} value="Publish">
              <Publish data={dataPublish as any} />
            </Tabs.Panel>
            <Tabs.Panel key={"4"} value="Reject">
              <Reject data={dataReject as any} />
            </Tabs.Panel>
          </Stack>
        </Tabs>
      </Stack>
    </>
  );
}
