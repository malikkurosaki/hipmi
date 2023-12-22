"use client";

import {
  Box,
  Button,
  Grid,
  Group,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import {
  IconChevronRight,
  IconMoodSmile,
  IconMoodSmileBeam,
  IconMoodSmileDizzy,
  IconMoodXd,
} from "@tabler/icons-react";

export default function MasukanDonasi() {
  const listNominal = [
    {
      id: 1,
      nominal: 25000,
      icon: <IconMoodSmile />,
    },
    {
      id: 2,
      nominal: 50000,
      icon: <IconMoodSmileBeam />,
    },
    {
      id: 3,
      nominal: 75000,
      icon: <IconMoodSmileDizzy />,
    },
    {
      id: 4,
      nominal: 10000,
      icon: <IconMoodXd />,
    },
  ];
  return (
    <>
      <Stack>
        <Box>
          {listNominal.map((e) => (
            <Paper
              key={e.id}
              withBorder
              radius={"md"}
              p={"sm"}
              shadow="lg"
              mb={"md"}
            >
              <Group position="apart">
                <Group>
                  {e.icon}
                  <Title order={4}>
                    Rp.{" "}
                    {new Intl.NumberFormat("id-ID", {
                      maximumFractionDigits: 10,
                    }).format(e.nominal)}
                  </Title>
                </Group>
                <IconChevronRight />
              </Group>
            </Paper>
          ))}
        </Box>
        <Paper p={"sm"} withBorder shadow="lg">
          <Stack>
            <Text>Nominal Lainnya</Text>
            <Grid>
              <Grid.Col span={1}>
                <Title order={4}>Rp.</Title>
              </Grid.Col>
              <Grid.Col span={11}>
                <TextInput type="number" />
              </Grid.Col>
            </Grid>
            <Text c={"gray"} fz={"xs"}>
              Minimal Donasi Rp. 10.000
            </Text>
          </Stack>
        </Paper>
        <Button radius={"xl"}>Lanjutan Pembayaran</Button>
      </Stack>
    </>
  );
}
