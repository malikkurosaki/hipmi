"use client";

import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import { Warna } from "@/app/lib/warna";
import {
  ActionIcon,
  Affix,
  AspectRatio,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardSection,
  Center,
  Divider,
  Grid,
  Group,
  Image,
  Paper,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  Title,
  rem,
} from "@mantine/core";
import { useViewportSize, useWindowScroll } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { MODEL_DONASI } from "../model/interface";
import { useState } from "react";
import ComponentDonasi_BoxPublish from "../component/box_publish";
import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import { IconPencilPlus } from "@tabler/icons-react";

export default function MainDonasi({
  listDonasi,
}: {
  listDonasi: MODEL_DONASI[];
}) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <>
      <Affix position={{ bottom: rem(150), right: rem(30) }}>
        <ActionIcon
          loading={isLoading ? true : false}
          opacity={scroll.y > 0 ? 0.5 : ""}
          style={{
            transition: "0.5s",
          }}
          size={"xl"}
          radius={"xl"}
          variant="transparent"
          bg={"orange"}
          onClick={() => {
            setLoading(true);
            router.push(RouterDonasi.create_donasi);
          }}
        >
          <IconPencilPlus color="white" />
        </ActionIcon>
      </Affix>

      <ComponentDonasi_BoxPublish
        dataDonasi={listDonasi}
        path={RouterDonasi.detail_main}
      />
    </>
  );
}
