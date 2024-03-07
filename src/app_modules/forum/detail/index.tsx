"use client";

import { RouterForum } from "@/app/lib/router_hipmi/router_forum";
import {
  ActionIcon,
  Box,
  Card,
  Divider,
  Group,
  Stack,
  Text,
} from "@mantine/core";
import { IconMessageCircle } from "@tabler/icons-react";
import ComponentForum_AuthorNameOnHeader from "../component/author_header_name";
import ComponentForum_AuthorNameOnDetail from "../component/author_name_on_detail";
import { useRouter } from "next/navigation";

export default function Forum_Detail({ forumId }: { forumId: string }) {
  return (
    <>
      <Stack px={"xs"}>
        <ForumView forumId={forumId} />
        <DiskusiView />
      </Stack>
    </>
  );
}

function ForumView({ forumId }: { forumId: string }) {
  const router = useRouter();
  return (
    <>
      <Card style={{ position: "relative", width: "100%" }}>
        <Card.Section>
          <ComponentForum_AuthorNameOnDetail forumId={forumId} tipe="posting" />
        </Card.Section>
        <Card.Section sx={{ zIndex: 0 }} py={"sm"}>
          <Stack spacing={"xs"}>
            <Text fz={"sm"}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad,
              vitae. Quisquam aspernatur, eius consequatur dicta repellendus
              facere vero recusandae deleniti voluptas quod architecto, tenetur
              totam excepturi rem nam iusto earum.
            </Text>
          </Stack>
        </Card.Section>
        <Card.Section>
          <Stack>
            <Group position="apart">
              <Group spacing={"xs"}>
                <ActionIcon
                  variant="transparent"
                  sx={{ zIndex: 1 }}
                  onClick={() => {
                    router.push(RouterForum.komentar + forumId);
                  }}
                >
                  <IconMessageCircle color="gray" size={25} />
                </ActionIcon>
                <Text c={"gray"}>1</Text>
              </Group>
              <Group>
                <Text c={"gray"} fz={"sm"}>
                  {new Date(
                    "August 19, 1975 23:15:30 GMT+00:00"
                  ).toLocaleTimeString()}
                </Text>
                <Text c={"gray"} fz={"sm"}>
                  {new Date().toLocaleDateString(["id-ID"], {
                    dateStyle: "medium",
                  })}
                </Text>
              </Group>
            </Group>
            <Box>
              <Divider />
            </Box>
          </Stack>
        </Card.Section>
      </Card>
    </>
  );
}

function DiskusiView() {
  return (
    <>
      <Stack>
        {Array(5)
          .fill(0)
          .map((e, i) => (
            <Card key={i} mt={"xs"}>
              <Card.Section>
                <ComponentForum_AuthorNameOnHeader
                  forumId={i as any}
                  tipe="komentar"
                  isMoreButton={true}
                />
              </Card.Section>
              <Card.Section sx={{ zIndex: 0 }} p={"sm"}>
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
                  {/* <Group>
              <Text c={"gray"} fz={"sm"}>
                {new Date(
                  "August 19, 1975 23:15:30 GMT+00:00"
                ).toLocaleTimeString()}
              </Text>
              <Text c={"gray"} fz={"sm"}>
                {new Date().toLocaleDateString(["id-ID"], {
                  dateStyle: "medium",
                })}
              </Text>
            </Group> */}

                  <Divider />
                </Stack>
              </Card.Section>
            </Card>
          ))}
      </Stack>
    </>
  );
}
