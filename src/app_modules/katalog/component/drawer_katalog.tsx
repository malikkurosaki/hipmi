import { RouterProfile } from "@/app/lib/router_hipmi/router_katalog";
import Component_Logout from "@/app_modules/auth/logout/view";
import { AccentColor } from "@/app_modules/component_global/color/color_pallet";
import ComponentGlobal_UI_Loader from "@/app_modules/component_global/ui/ui_loader";
import {
  ActionIcon,
  Drawer,
  Group,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import {
  IconEdit,
  IconLogout,
  IconLogout2,
  IconPhotoEdit,
  IconPolaroid,
  IconX,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ComponentKatalog_DrawerKatalog({
  opened,
  close,
  profileId,
}: {
  opened: boolean;
  close: () => void;
  profileId: string;
}) {
  const router = useRouter();
  const [pageId, setPageId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const listPage = [
    {
      id: "1",
      name: "Edit profile",
      icon: <IconEdit />,
      path: RouterProfile.edit + profileId,
    },
    {
      id: "2",
      name: "Ubah Foto Profile",
      icon: <IconPhotoEdit />,
      path: RouterProfile.update_foto_profile + profileId,
    },
    {
      id: "3",
      name: "Ubah Latar Belakang",
      icon: <IconPolaroid />,
      path: RouterProfile.update_foto_background + profileId,
    },
  ];

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
          <SimpleGrid cols={4}>
            {listPage.map((e, i) => (
              <Stack key={i} align="center" spacing={"xs"}>
                <ActionIcon
                  variant="transparent"
                  c="white"
                  onClick={() => {
                    router.push(e.path);
                    setPageId(e?.id);
                    setIsLoading(true)
                  }}
                >
                  {isLoading && e.id === pageId ? <ComponentGlobal_UI_Loader /> :  e.icon}
                </ActionIcon>
                <Text align="center" color="white">
                  {e.name}
                </Text>
              </Stack>
            ))}
            <Component_Logout />
          </SimpleGrid>
        </Stack>
      </Drawer>
    </>
  );
}
