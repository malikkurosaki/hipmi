"use client";

import { RouterVote } from "@/app/lib/router_hipmi/router_vote";
import {
  Stack,
  Card,
  Grid,
  Avatar,
  Divider,
  Title,
  Badge,
  Group,
  Radio,
  Center,
  Text,
  Box,
} from "@mantine/core";
import moment from "moment";
import { useRouter } from "next/navigation";
import ComponentVote_CardViewPublish from "../../component/card_view_publish";

export default function Vote_SemuaRiwayat() {
  const router = useRouter();
  return (
    <>
      <Stack>
        {Array(5)
          .fill(0)
          .map((e, i) => (
            <Box key={i}>
              <ComponentVote_CardViewPublish
                path={RouterVote.detail_semua_riwayat}
              />
            </Box>
          ))}
      </Stack>
    </>
  );
}
