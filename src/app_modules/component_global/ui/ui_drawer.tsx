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

export default function ComponentGlobal_UI_Drawer({
  opened,
  close,
  component,
}: {
  opened: boolean;
  close: () => void;
  component: any[];
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
            backgroundColor: "transparent",
          },
          body: {
            backgroundColor: MainColor.darkblue,
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
          <SimpleGrid cols={4}>
            {component.map((e, i) => (
              <Stack key={i} align="center" spacing={"xs"}>
                <ActionIcon
                  variant="transparent"
                  c="white"
                  onClick={() => router.push(e.path)}
                >
                  {e.icon}
                </ActionIcon>
                <Text color="white">{e.name}</Text>
              </Stack>
            ))}
          </SimpleGrid>
        </Stack>
      </Drawer>
    </>
  );
}
