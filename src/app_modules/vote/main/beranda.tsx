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
import { IconCirclePlus, IconPencilPlus } from "@tabler/icons-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import ComponentVote_CardViewPublish from "../component/card_view_publish";
import { MODEL_VOTING } from "../model/interface";
import ComponentGlobal_AuthorNameOnHeader from "@/app_modules/component_global/author_name_on_header";
import _ from "lodash";
import ComponentVote_IsEmptyData from "../component/is_empty_data";
import { useState } from "react";
import { useShallowEffect, useWindowScroll } from "@mantine/hooks";
import { Vote_getAllListPublish } from "../fun/get/get_all_list_publish";

export default function Vote_Beranda({
  dataVote,
}: {
  dataVote: MODEL_VOTING[];
}) {
  const router = useRouter();

  const [data, setData] = useState(dataVote);

  const [isLoading, setIsLoading] = useState(false);
  const [scroll, scrollTo] = useWindowScroll();

  useShallowEffect(() => {
    onLoad({
      setData(val) {
        setData(val);
      },
    });
  }, [setData]);

  async function onLoad({ setData }: { setData: (val: any) => void }) {
    const loadData = await Vote_getAllListPublish();
    setData(loadData);
  }

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
          bg={"blue"}
          onClick={() => {
            setIsLoading(true);
            router.push(RouterVote.create);
          }}
        >
          <IconPencilPlus color="white" />
        </ActionIcon>
      </Affix>

      {_.isEmpty(data) ? (
        <ComponentVote_IsEmptyData text="Tidak ada data" />
      ) : (
        <Stack>
          {data.map((e, i) => (
            <Box key={i}>
              <ComponentVote_CardViewPublish
                path={RouterVote.main_detail}
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
