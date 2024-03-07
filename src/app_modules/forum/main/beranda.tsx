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
} from "@mantine/core";
import { useTimeout, useWindowScroll } from "@mantine/hooks";
import {
  IconCirclePlus,
  IconMessageCircle,
  IconPencilPlus,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import ComponentForum_AuthorNameOnHeader from "../component/author_header_name";
import { useState } from "react";
import ComponentGlobal_V2_LoadingPage from "@/app_modules/component_global/loading_page_v2";
import { useAtom } from "jotai";
import { gs_forum_loading_edit_posting } from "../global_state";

export default function Forum_Beranda() {
  const router = useRouter();
  const skrng = Date.now();
  const [scroll, scrollTo] = useWindowScroll();
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingKomen, setLoadingKomen] = useState(false);
  const [loadingDetail, setLoaduingDetail] = useState(false);

  if (loadingDetail) return <ComponentGlobal_V2_LoadingPage />;
  if (loadingKomen) return <ComponentGlobal_V2_LoadingPage />;

  return (
    <>
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

      <Stack px={"sm"}>
        {Array(5)
          .fill(0)
          .map((e, i) => (
            <Card key={i}>
              <Card.Section>
                <ComponentForum_AuthorNameOnHeader
                  forumId={i as any}
                  tipe="posting"
                  isMoreButton={true}
                />
              </Card.Section>
              <Card.Section
                sx={{ zIndex: 0 }}
                p={"sm"}
                onClick={() => {
                  // console.log("halaman forum");
                  setLoaduingDetail(true);
                  router.push(RouterForum.main_detail + i);
                }}
              >
                <Stack spacing={"xs"}>
                  <Text fz={"sm"} lineClamp={4}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Ad, vitae. Quisquam aspernatur, eius consequatur dicta
                    repellendus facere vero recusandae deleniti voluptas quod
                    architecto, tenetur totam excepturi rem nam iusto earum.
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
                        router.push(RouterForum.komentar + i);
                      }}
                    >
                      <IconMessageCircle color="gray" size={25} />
                    </ActionIcon>
                    <Text c={"gray"}>1</Text>
                  </Group>
                  <Divider />
                </Stack>
              </Card.Section>
            </Card>
          ))}
      </Stack>
    </>
  );
}
