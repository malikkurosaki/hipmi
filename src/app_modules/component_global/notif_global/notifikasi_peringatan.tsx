import { ActionIcon, Avatar, Center, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconAlertTriangle } from "@tabler/icons-react";

/**
 * 
 * @param text | masukan text untuk peringatan
 * @type string
 * @returns notifikasi peringatan
 */
export async function ComponentGlobal_NotifikasiPeringatan(text: string) {
  return notifications.show({
    message: (
      <Center>
        <Text fw={"bold"}>{text}</Text>
      </Center>
    ),
    color: "yellow.3",
    radius: "md",
    autoClose: 1000,
    icon: <ActionIcon radius={"xl"} bg={"white"} p={3}><IconAlertTriangle color="red" /></ActionIcon>,
    withCloseButton: false,

    styles: (theme) => ({
      description: { color: theme.white },
      root: {
        backgroundColor: theme.colors.yellow[7],
      },
    }),
  });
}
