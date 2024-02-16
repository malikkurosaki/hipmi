"use client";

import { RouterProfile } from "@/app/lib/router_hipmi/router_katalog";
import { RouterVote } from "@/app/lib/router_hipmi/router_vote";
import {
  ActionIcon,
  Affix,
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
  rem,
} from "@mantine/core";
import { IconCirclePlus } from "@tabler/icons-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import ComponentVote_CardViewPublish from "../component/card_view_publish";
import { MODEL_VOTING } from "../model/interface";
import ComponentGlobal_AuthorNameOnHeader from "@/app_modules/component_global/author_name_on_header";

export default function Vote_Beranda({
  dataVote,
}: {
  dataVote: MODEL_VOTING[];
}) {
  const router = useRouter();

  return (
    <>
      <Affix position={{ bottom: rem(100), right: rem(30) }}>
        <ActionIcon
          size={"xl"}
          radius={"xl"}
          variant="transparent"
          bg={"blue"}
          onClick={() => {
            router.push(RouterVote.create);
          }}
        >
          <IconCirclePlus color="white" size={40} />
        </ActionIcon>
      </Affix>

      <Stack>
        {dataVote.map((e, i) => (
          <Box key={i}>
            <ComponentVote_CardViewPublish
              path={RouterVote.main_detail}
              data={e}
              authorName={true}
            />
          </Box>
        ))}
      </Stack>
    </>
  );
}
