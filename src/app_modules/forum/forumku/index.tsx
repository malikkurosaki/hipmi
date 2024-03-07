"use client";

import { RouterProfile } from "@/app/lib/router_hipmi/router_katalog";
import ComponentGlobal_AuthorNameOnHeader from "@/app_modules/component_global/author_name_on_header";
import { MODEL_USER } from "@/app_modules/home/model/interface";
import {
  ActionIcon,
  Avatar,
  Button,
  Card,
  Center,
  Divider,
  Group,
  Stack,
  Text,
} from "@mantine/core";
import { IconCircleFilled, IconMessageCircle } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import ComponentForum_AuthorNameOnHeader from "../component/author_header_name";
import { RouterForum } from "@/app/lib/router_hipmi/router_forum";
import { useState } from "react";
import ComponentGlobal_V2_LoadingPage from "@/app_modules/component_global/loading_page_v2";

export default function Forum_Forumku({
  auhtorSelectedData,
}: {
  auhtorSelectedData: MODEL_USER;
}) {
  const router = useRouter();
  const [loadingDetail, setLoaduingDetail] = useState(false);
  const [loadingKomen, setLoadingKomen] = useState(false);

  if (loadingDetail) return <ComponentGlobal_V2_LoadingPage />;
  if (loadingKomen) return <ComponentGlobal_V2_LoadingPage />;
  return (
    <>
      <Stack spacing={"xl"} px={"sm"}>
        <Center>
          <Avatar
            radius={"100%"}
            sx={{
              borderStyle: "solid",
              borderWidth: "0.5px",
              borderColor: "black",
            }}
            size={100}
            alt="foto"
            src={
              RouterProfile.api_foto_profile +
              auhtorSelectedData?.Profile?.imagesId
            }
          />
        </Center>
        <Group position="apart">
          <Stack spacing={0}>
            <Text lineClamp={1} fw={"bold"}>
              {auhtorSelectedData?.Profile?.name}
            </Text>
            <Text lineClamp={1} c={"gray"} fz={"sm"}>
              @{auhtorSelectedData?.username}{" "}
              <Text inherit span>
                <IconCircleFilled size={5} /> 5 Posting
              </Text>
            </Text>
          </Stack>
          <Button
            compact
            radius={"xl"}
            variant="outline"
            onClick={() =>
              router.push(
                RouterProfile.katalog + auhtorSelectedData?.Profile?.id
              )
            }
          >
            Kunjungi Profile
          </Button>
        </Group>
        <Divider />

        <Stack>
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
      </Stack>
    </>
  );
}
