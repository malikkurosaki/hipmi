import { AccentColor } from "@/app_modules/_global/color";
import { MODEL_USER } from "@/app_modules/home/model/interface";
import { Menu, ActionIcon, Stack, Grid, Center, Text } from "@mantine/core";
import { IconUserCircle, IconUser, IconPhone } from "@tabler/icons-react";
import { useState } from "react";
import Admin_Logout from "../logout";

export function Admin_ComponentButtonUserCircle({ dataUser }: { dataUser: MODEL_USER }) {
  const [isOpenMenuUser, setOpenMenuUser] = useState(false);
  return (
    <>
      <Menu
        withArrow
        arrowPosition="center"
        opened={isOpenMenuUser}
        onChange={setOpenMenuUser}
        shadow="md"
        width={250}
        position="bottom-start"
        styles={{
          dropdown: {
            backgroundColor: AccentColor.blue,
            border: `1px solid ${AccentColor.skyblue}`,
          },
          item: {
            color: "white",
            ":hover": {
              backgroundColor: "gray",
            },
          },
          arrow: {
            borderTopColor: AccentColor.skyblue,
            borderLeftColor: AccentColor.skyblue,
          },
        }}
      >
        <Menu.Target>
          <ActionIcon variant="transparent" onClick={() => console.log("test")}>
            <IconUserCircle color="white" />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Stack spacing={5} px={"xs"}>
            <Menu.Item>
              <Grid>
                <Grid.Col span={2}>
                  <IconUser />
                </Grid.Col>
                <Grid.Col span={"auto"}>
                  <Text lineClamp={1}>{dataUser.username}</Text>
                </Grid.Col>
              </Grid>
            </Menu.Item>
            <Menu.Item>
              <Grid>
                <Grid.Col span={2}>
                  <IconPhone />
                </Grid.Col>
                <Grid.Col span={"auto"}>
                  <Text lineClamp={1}>+{dataUser.nomor}</Text>
                </Grid.Col>
              </Grid>
            </Menu.Item>

            <Menu.Divider />
            <Center py={"xs"}>
              <Admin_Logout />
            </Center>
          </Stack>
        </Menu.Dropdown>
      </Menu>
    </>
  );
}