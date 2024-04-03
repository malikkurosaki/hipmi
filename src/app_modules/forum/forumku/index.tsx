"use client";

import { RouterProfile } from "@/app/lib/router_hipmi/router_katalog";
import ComponentGlobal_AuthorNameOnHeader from "@/app_modules/component_global/author_name_on_header";
import { MODEL_USER } from "@/app_modules/home/model/interface";
import {
  ActionIcon,
  Affix,
  Avatar,
  Button,
  Card,
  Center,
  Divider,
  Grid,
  Group,
  Stack,
  Text,
  rem,
} from "@mantine/core";
import {
  IconCircleFilled,
  IconMessageCircle,
  IconPencilPlus,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import ComponentForum_PostingAuthorNameOnHeader from "../component/header/posting_author_header_name";
import { RouterForum } from "@/app/lib/router_hipmi/router_forum";
import { useState } from "react";
import ComponentGlobal_V2_LoadingPage from "@/app_modules/component_global/loading_page_v2";
import { MODEL_FORUM_POSTING } from "../model/interface";
import ComponentForum_MainCardView from "../component/main_card_view";
import { useWindowScroll } from "@mantine/hooks";
import _ from "lodash";

export default function Forum_Forumku({
  auhtorSelectedData,
  dataPosting,
  totalPosting,
  userLoginId,
}: {
  auhtorSelectedData: MODEL_USER;
  dataPosting: MODEL_FORUM_POSTING[];
  totalPosting: number;
  userLoginId: string;
}) {
  const router = useRouter();
  const [scroll, scrollTo] = useWindowScroll();
  const [loadingCreate, setLoadingCreate] = useState(false);

  return (
    <>
      {userLoginId === auhtorSelectedData.id ? (
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
      ) : (
        ""
      )}

      <Stack spacing={"xl"} px={"sm"}>
        <ForumProfile
          auhtorSelectedData={auhtorSelectedData}
          totalPosting={totalPosting}
        />
        {_.isEmpty(dataPosting) ? (
          <Center>
            <Text fw={"bold"} fz={"xs"} c={"gray"}>
              Belum ada posting
            </Text>
          </Center>
        ) : (
          <ForumPosting dataPosting={dataPosting} userLoginId={userLoginId} />
        )}
      </Stack>
    </>
  );
}

function ForumProfile({
  auhtorSelectedData,
  totalPosting,
}: {
  auhtorSelectedData: MODEL_USER;
  totalPosting: number;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // if (loading) return <ComponentGlobal_V2_LoadingPage />;

  return (
    <>
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
      <Grid>
        <Grid.Col span={"auto"}>
          <Stack spacing={0}>
            <Text lineClamp={1} fw={"bold"}>
              {auhtorSelectedData?.Profile?.name}
            </Text>
            <Grid gutter={"xs"}>
              <Grid.Col span={"content"}>
                <Text lineClamp={1} c={"gray"} fz={"sm"}>
                  {totalPosting} Posting <IconCircleFilled size={5} />
                </Text>
              </Grid.Col>
              <Grid.Col span={"auto"}>
                <Text lineClamp={1} c={"gray"} fz={"sm"}>
                  @{auhtorSelectedData?.username}
                  {""}
                </Text>
              </Grid.Col>
            </Grid>
          </Stack>
        </Grid.Col>
        <Grid.Col span={5}>
          <Stack align="center" justify="center" h={"100%"}>
            <Button
              compact
              loaderPosition="center"
              loading={loading ? true : false}
              radius={"xl"}
              variant="outline"
              onClick={() => {
                setLoading(true);
                router.push(
                  RouterProfile.katalog + auhtorSelectedData?.Profile?.id
                );
              }}
            >
              Kunjungi Profile
            </Button>
          </Stack>
        </Grid.Col>
      </Grid>

      <Divider />
    </>
  );
}

function ForumPosting({
  dataPosting,
  userLoginId,
}: {
  dataPosting: MODEL_FORUM_POSTING[];
  userLoginId: any;
}) {
  const router = useRouter();

  const [loadingDetail, setLoadingDetail] = useState(false);
  const [loadingKomen, setLoadingKomen] = useState(false);

  if (loadingDetail) return <ComponentGlobal_V2_LoadingPage />;
  if (loadingKomen) return <ComponentGlobal_V2_LoadingPage />;
  return (
    <>
      <ComponentForum_MainCardView
        data={dataPosting}
        setLoadingKomen={setLoadingKomen}
        setLoadingDetail={setLoadingDetail}
        userLoginId={userLoginId}
      />

      {/* <Stack>
        {dataPosting.map((e, i) => (
          <Card key={i}>
            <Card.Section>
              <ComponentForum_PostingAuthorNameOnHeader isMoreButton={true} />
            </Card.Section>
            <Card.Section
              sx={{ zIndex: 0 }}
              p={"sm"}
              onClick={() => {
                // console.log("halaman forum");
                setLoadingDetail(true);
                router.push(RouterForum.main_detail + i);
              }}
            >
              <Stack spacing={"xs"}>
                <Text fz={"sm"} lineClamp={4}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad,
                  vitae. Quisquam aspernatur, eius consequatur dicta repellendus
                  facere vero recusandae deleniti voluptas quod architecto,
                  tenetur totam excepturi rem nam iusto earum.
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
      </Stack> */}
    </>
  );
}
