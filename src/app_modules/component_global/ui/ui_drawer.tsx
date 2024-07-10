import {
  Drawer,
  Stack,
  Group,
  ActionIcon,
  SimpleGrid,
  Text,
  Box,
} from "@mantine/core";
import { IconX, IconEdit } from "@tabler/icons-react";
import { MainColor, AccentColor } from "../color/color_pallet";
import React from "react";
import { useRouter } from "next/navigation";

interface MODEL_DRAWER {
  id: string;
  name: string;
  icon: string;
  path: string;
}
export default function ComponentGlobal_UI_Drawer({
  opened,
  close,
  component,
}: {
  opened: boolean;
  close: () => void;
  component: MODEL_DRAWER[] | any[];
}) {
  const router = useRouter();
  return (
    <>
      <Drawer
        opened={opened}
        onClose={() => close()}
        position={"bottom"}
        size={"auto"}
        withCloseButton={false}
        styles={{
          content: {
            padding: 0,
            position: "absolute",
            margin: "auto",
            backgroundColor: "transparent",
            left: 0,
            right: 0,
            width: 500,
          },
          body: {
            backgroundColor: AccentColor.darkblue,
            borderTop: `2px solid ${AccentColor.blue}`,
            borderRight: `1px solid ${AccentColor.blue}`,
            borderLeft: `1px solid ${AccentColor.blue}`,
            borderRadius: "20px 20px 0px 0px",
            color: "white",
            paddingBottom: "5%",
          },
        }}
      >
        <Stack spacing={"xs"}>
          <Group position="right">
            <ActionIcon onClick={close} variant="transparent">
              <IconX color="white" />
            </ActionIcon>
          </Group>
          <SimpleGrid cols={component.length < 4 ? component.length : 4}>
            {component.map((e, i) => (
              <Stack key={i} align="center" spacing={"xs"}>
                <ActionIcon
                  variant="transparent"
                  c="white"
                  onClick={() => router.push(e.path)}
                >
                  {e.icon}
                </ActionIcon>
                <Text align="center" color="white">
                  {e.name}
                </Text>
              </Stack>
            ))}
          </SimpleGrid>
        </Stack>
      </Drawer>
    </>
  );
}
