import {
  Divider,
  Grid,
  Group,
  Navbar,
  ScrollArea,
  Skeleton,
  Stack,
} from "@mantine/core";

export function Admin_ComponentSkeletonNavbar() {
  return (
    <>
      <Navbar.Section h={"6vh"}>
        <Stack spacing={"lg"}>
          <Grid>
            <Grid.Col span={7}>
              <Skeleton height={30} radius="xl" />
            </Grid.Col>

            <Grid.Col span={5}>
              <Stack h={"100%"} justify="center">
                <Group position="right" spacing={5}>
                  <Skeleton circle height={30} />
                  <Skeleton circle height={30} />
                </Group>
              </Stack>
            </Grid.Col>
          </Grid>
          <Divider />
        </Stack>
      </Navbar.Section>

      <Navbar.Section h={"88vh"} grow component={ScrollArea} py={"sm"}>
        <Stack spacing={"lg"}>
          {Array.from(new Array(20)).map((e, i) => (
            <Grid key={i}>
              <Grid.Col span={"content"}>
                <Stack h={"100%"} justify="center">
                  <Group position="right" spacing={5}>
                    <Skeleton circle height={30} />
                  </Group>
                </Stack>
              </Grid.Col>
              <Grid.Col span={"auto"}>
                <Skeleton height={30} radius="xl" />
              </Grid.Col>
            </Grid>
          ))}
        </Stack>
      </Navbar.Section>

      <Navbar.Section h={"6vh"}>
        <Stack spacing={"lg"}>
          <Divider />
          <Skeleton height={20} radius="xl" />
        </Stack>
      </Navbar.Section>
    </>
  );
}
