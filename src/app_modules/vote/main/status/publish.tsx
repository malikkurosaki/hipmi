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
  Skeleton,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import moment from "moment";
import { useRouter } from "next/navigation";
import { MODEL_VOTING } from "../../model/interface";
import ComponentVote_IsEmptyData from "../../component/is_empty_data";
import _ from "lodash";
import ComponentVote_CardViewPublish from "../../component/card_view_publish";

export default function Vote_StatusPublish({
  listPublish,
}: {
  listPublish: MODEL_VOTING[];
}) {
  const router = useRouter();

  if (_.isEmpty(listPublish))
    return (
      <>
        <ComponentVote_IsEmptyData text="Tidak ada voting" />
      </>
    );

  return (
    <>
      <Stack>
        {listPublish.map((e) => (
          <Box key={e.id}>
            <ComponentVote_CardViewPublish
              data={e}
              path={RouterVote.detail_publish}
            />
          </Box>
        ))}
      </Stack>
    </>
  );
}
