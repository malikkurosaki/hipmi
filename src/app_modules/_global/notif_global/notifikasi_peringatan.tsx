import { ActionIcon, Avatar, Center, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconAlertTriangle } from "@tabler/icons-react";

/**
 *
 * @param text | masukan text untuk peringatan
 * @type string
 * @returns notifikasi peringatan
 */
export async function ComponentGlobal_NotifikasiPeringatan(
  text: string,
  durasi?: number
) {
  return notifications.show({
    message: (
      <Center>
        <Text align="center" fw={"bold"}>
          {text}
        </Text>
      </Center>
    ),
    color: "yellow.1",
    radius: "md",
    autoClose: durasi ? durasi : 2000,
    style: {
      borderWidth: "0.5px",
      borderStyle: "solid",
      borderColor: "red",
    },

    icon: (
      <ActionIcon variant="transparent" radius={"xl"} p={3}>
        <IconAlertTriangle
          color="red"
          style={{ backgroundColor: "transparent" }}
        />
      </ActionIcon>
    ),
    withCloseButton: false,

    styles: (theme) => ({
      description: { color: theme.white },
      root: {
        backgroundColor: theme.colors.orange[5],
      },
    }),
  });
}
