"use client";

import { RouterForum } from "@/app/lib/router_hipmi/router_forum";
import {
  ActionIcon,
  Button,
  Card,
  Group,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
import ComponentForum_AuthorNameOnHeader from "../component/author_header_name";

import dynamic from "next/dynamic";
import React, { useState } from "react";
const ReactQuill = dynamic(
  () => {
    return import("react-quill");
  },
  { ssr: false }
);
import "react-quill/dist/quill.bubble.css";
import { IconPhotoUp } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function Forum_Komentar({ forumId }: { forumId: string }) {
  const [value, setValue] = useState("");

  return (
    <>
      <Stack px={"sm"}>
        <Card>
          <Card.Section>
            <ComponentForum_AuthorNameOnHeader
              forumId={forumId}
              tipe="komentar"
            />
          </Card.Section>
          <Card.Section sx={{ zIndex: 0 }} p={"sm"}>
            <Stack spacing={"xs"}>
              <Text fz={"sm"}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad,
                vitae. Quisquam aspernatur, eius consequatur dicta repellendus
                facere vero recusandae deleniti voluptas quod architecto,
                tenetur totam excepturi rem nam iusto earum.
              </Text>
            </Stack>
          </Card.Section>
        </Card>
        <Stack>
          <Paper withBorder shadow="lg">
            <ReactQuill
              theme="bubble"
              placeholder="Posting balasan anda?"
              //   style={{ height: 150 }}
              onChange={(val) => {
                setValue(val);
              }}
            />
          </Paper>
          <Group position="apart">
            <ActionIcon>
              <IconPhotoUp />
            </ActionIcon>
            <ButtonAction forumId={forumId} />
          </Group>
        </Stack>
      </Stack>
    </>
  );
}

function ButtonAction({ forumId }: { forumId: string }) {
  const router = useRouter();
  return (
    <>
      <Button
        radius={"xl"}
        onClick={() => router.replace(RouterForum.main_detail + forumId)}
      >
        Balas
      </Button>
    </>
  );
}
