import { Center, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconAlertTriangle } from "@tabler/icons-react";

/**
 * 
 * @param text | masukan text untuk peringatan
 * @type string
 * @returns notifikasi peringatan
 */
export async function ComponentGlobalAdmin_NotifikasiGagal(text: string) {
  return notifications.show({
    message: (
      <Center>
        <Text fw={"bold"}>{text}</Text>
      </Center>
    ),
    color: "red",
    radius: "md",
    autoClose: 2000,
    icon: <IconAlertTriangle color="white" />,
    withCloseButton: false,

    styles: (theme) => ({
      description: { color: theme.white },
      root: {
        backgroundColor: theme.colors.red[7],
      },
    }),
  });
}
