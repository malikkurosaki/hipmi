"use client";

import {
  Badge,
  Card,
  Center,
  Grid,
  Group,
  Radio,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import moment from "moment";
import ComponentVote_HasilVoting from "../../component/detail/hasil_voting";
import ComponentVote_DaftarVoter from "../../component/detail/daftar_voter";

export default function Vote_DetailKontribusi() {
  return (
    <>
      <Stack>
        <TampilanDataVoting />
        <ComponentVote_HasilVoting />
        <ComponentVote_DaftarVoter />
      </Stack>
    </>
  );
}

function TampilanDataVoting() {
  return (
    <>
      <Card shadow="lg" withBorder p={30}>
        <Card.Section px={"xs"}>
          <Stack spacing={"lg"}>
            <Center>
              <Title order={5}>Judul voting</Title>
            </Center>
            <Text>
              Deskripsi: Lorem, ipsum dolor sit amet consectetur adipisicing
              elit. Mollitia possimus repellendus in, iste voluptatibus sit
              laborum voluptates aliquam nisi? Earum quas ea quaerat veniam
              porro, magni nulla consequuntur distinctio at.
            </Text>
          </Stack>
        </Card.Section>
        <Card.Section py={"lg"}>
          <Stack spacing={0}>
            <Center>
              <Text fz={10} fw={"bold"}>
                Batas Voting
              </Text>
            </Center>
            <Badge>
              <Group>
                <Text>
                  {new Date().toLocaleDateString(["id-ID"], {
                    dateStyle: "medium",
                  })}
                </Text>
                <Text>-</Text>
                <Text>
                  {new Date(
                    moment(Date.now()).add(10, "days").calendar()
                  ).toLocaleDateString(["id-ID"], {
                    dateStyle: "medium",
                  })}
                </Text>
              </Group>
            </Badge>
          </Stack>
        </Card.Section>
      </Card>
    </>
  );
}
