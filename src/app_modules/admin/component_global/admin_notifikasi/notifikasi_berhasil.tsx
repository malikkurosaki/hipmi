import { Center, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  IconAlertTriangle,
  IconChecklist,
  IconCircleCheck,
} from "@tabler/icons-react";

/**
 *
 * @param text | masukan text untuk peringatan
 * @type string
 * @param durasi | durasi autoClose
 * @type number
 * @returns notifikasi berhasil warna hijau
 */
export async function ComponentAdminGlobal_NotifikasiBerhasil(
  text: string,
  durasi?: number
) {
  return notifications.show({
    message: (
      <Center>
        <Text fw={"bold"}>{text}</Text>
      </Center>
    ),
    color: "green",
    radius: "md",
    autoClose: durasi ? durasi : 2000,
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
