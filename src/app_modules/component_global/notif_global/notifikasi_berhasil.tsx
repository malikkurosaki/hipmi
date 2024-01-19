import { Center, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconAlertTriangle, IconChecklist, IconCircleCheck } from "@tabler/icons-react";

/**
 * 
 * @param text | masukan text untuk peringatan
 * @type string
 * @returns notifikasi peringatan
 */
export async function ComponentGlobal_NotifikasiBerhasil(text: string) {
  return notifications.show({
    message: (
      <Center>
        <Text fw={"bold"}>{text}</Text>
      </Center>
    ),
    color: "green",
    radius: "md",
    autoClose: 1000,
    icon: <IconCircleCheck color="white" />,
    withCloseButton: false,

    styles: (theme) => ({
      description: { color: theme.white },
      root: {
        backgroundColor: theme.colors.green[7],
      },
    }),
  });
}
