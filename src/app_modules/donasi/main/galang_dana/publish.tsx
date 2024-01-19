"use client";

import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import {
  AspectRatio,
  Box,
  Button,
  Card,
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
import toast from "react-simple-toasts";
import { MODEL_DONASI } from "../../model/interface";
import { useState } from "react";
import TampilanRupiahDonasi from "../../component/tampilan_rupiah";
import ComponentDonasi_TampilanHitungMundur from "../../component/tampilan_hitung_mundur";
import ComponentDonasi_BoxPublish from "../../component/box_publish";

export default function PostingPublishDonasi({
  listPublish,
}: {
  listPublish: MODEL_DONASI[];
}) {
  return (
    <>
      <ComponentDonasi_BoxPublish dataDonasi={listPublish} path={RouterDonasi.detail_publish} />
    </>
  );
}
