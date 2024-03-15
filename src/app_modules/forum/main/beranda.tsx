"use client";

import { RouterForum } from "@/app/lib/router_hipmi/router_forum";
import { RouterJob } from "@/app/lib/router_hipmi/router_job";
import ComponentGlobal_AuthorNameOnHeader from "@/app_modules/component_global/author_name_on_header";
import {
  Affix,
  rem,
  ActionIcon,
  Card,
  CardSection,
  Text,
  Stack,
  Divider,
  Group,
  Box,
} from "@mantine/core";
import { useShallowEffect, useTimeout, useWindowScroll } from "@mantine/hooks";
import {
  IconCirclePlus,
  IconMessageCircle,
  IconPencilPlus,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import ComponentForum_PostingAuthorNameOnHeader from "../component/header/posting_author_header_name";
import { useState } from "react";
import ComponentGlobal_V2_LoadingPage from "@/app_modules/component_global/loading_page_v2";
import { useAtom } from "jotai";
import { gs_forum_loading_edit_posting } from "../global_state";
import { MODEL_FORUM_POSTING } from "../model/interface";
import ComponentForum_MainCardView from "../component/main_card_view";

export default function Forum_Beranda({
  listForum,
}: {
  listForum: MODEL_FORUM_POSTING[];
}) {
  const router = useRouter();
  const [scroll, scrollTo] = useWindowScroll();

  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingKomen, setLoadingKomen] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);

  if (loadingDetail) return <ComponentGlobal_V2_LoadingPage />;
  if (loadingKomen) return <ComponentGlobal_V2_LoadingPage />;

  return (
    <>
    {/* <pre>{JSON.stringify(listForum, null, 2)}</pre> */}
      <Affix position={{ bottom: rem(100), right: rem(30) }}>
        <ActionIcon
          loading={loadingCreate ? true : false}
          opacity={scroll.y > 0 ? 0.5 : ""}
          style={{
            transition: "0.5s",
          }}
          size={"xl"}
          radius={"xl"}
          variant="transparent"
          bg={"blue"}
          onClick={() => {
            setLoadingCreate(true);
            router.push(RouterForum.create);
          }}
        >
          <IconPencilPlus color="white" />
        </ActionIcon>
      </Affix>

      <Box px={"sm"}>
        <ComponentForum_MainCardView
          data={listForum}
          setLoadingKomen={setLoadingKomen}
          setLoadingDetail={setLoadingDetail}
        />
      </Box>

      {/* <Stack px={"sm"}>
        {listForum.map((e, i) => (
          <Card key={i}>
            <Card.Section>
              <ComponentForum_PostingAuthorNameOnHeader
                authorName={e?.Author?.Profile?.name}
                imagesId={e?.Author?.Profile?.imagesId}
                tglPublish={e?.createdAt}
                isMoreButton={true}
                authorId={e?.Author?.id}
                postingId={e?.id}
              />
            </Card.Section>
            <Card.Section
              sx={{ zIndex: 0 }}
              p={"sm"}
              onClick={() => {
                // console.log("halaman forum");
                setLoadingDetail(true);
                router.push(RouterForum.main_detail + e.id);
              }}
            >
              <Stack spacing={"xs"}>
                <Text fz={"sm"} lineClamp={4}>
                  <div dangerouslySetInnerHTML={{ __html: e.diskusi }} />
                </Text>
              </Stack>
            </Card.Section>
            <Card.Section>
              <Stack>
                <Group spacing={"xs"} px={"sm"}>
                  <ActionIcon
                    // loading={loadingKomen ? true : false}
                    variant="transparent"
                    sx={{ zIndex: 1 }}
                    onClick={() => {
                      setLoadingKomen(true);
                      router.push(RouterForum.komentar + e.id);
                    }}
                  >
                    <IconMessageCircle color="gray" size={25} />
                  </ActionIcon>

                  <TotalKomentar postingId={e?.id} />
                </Group>
                <Divider />
              </Stack>
            </Card.Section>
          </Card>
        ))}
      </Stack> */}
    </>
  );
}


