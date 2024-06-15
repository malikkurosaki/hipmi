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
import { MODEL_VOTING } from "../../model/interface";
import _ from "lodash";
import ComponentVote_IsEmptyData from "../../component/is_empty_data";

export default function Vote_RiwayatSaya({
  listRiwayatSaya,
}: {
  listRiwayatSaya: MODEL_VOTING[];
}) {
  const router = useRouter();
  return (
    <>
    {_.isEmpty(listRiwayatSaya) ? (
        <ComponentVote_IsEmptyData text="Tidak ada data"/>
      ) : (
      <Stack>
        {listRiwayatSaya.map((e, i) => (
          <Box key={i}>
            <ComponentVote_CardViewPublish
              path={RouterVote.detail_riwayat_saya}
              data={e}
              authorName={true}
            />
          </Box>
        ))}
      </Stack>
      )}
    </>
  );
}
