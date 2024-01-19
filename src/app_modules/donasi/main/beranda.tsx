"use client";

import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import { Warna } from "@/app/lib/warna";
import {
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
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { MODEL_DONASI } from "../model/interface";
import { useState } from "react";
import ComponentDonasi_BoxPublish from "../component/box_publish";

export default function MainDonasi({
  listDonasi,
}: {
  listDonasi: MODEL_DONASI[];
}) {
 
  return (
    <>
      <ComponentDonasi_BoxPublish dataDonasi={listDonasi} path={RouterDonasi.detail_main}/>
    </>
  );
}
