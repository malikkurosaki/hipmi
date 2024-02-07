"use client";

import { RouterVote } from "@/app/lib/router_hipmi/router_vote";
import {
  Avatar,
  Badge,
  Box,
  Card,
  Center,
  Divider,
  Grid,
  Group,
  Radio,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import moment from "moment";
import { useRouter } from "next/navigation";
import ComponentVote_CardViewPublish from "../component/card_view_publish";

export default function Vote_Kontribusi() {
  const router = useRouter();
  return (
    <>
      <Stack>
        {Array(5)
          .fill(0)
          .map((e, i) => (
            <Box key={i}>
              <ComponentVote_CardViewPublish
                path={RouterVote.detail_kontribusi}
                pilihanSaya={true}
              />
            </Box>
          ))}
      </Stack>
    </>
  );
}
