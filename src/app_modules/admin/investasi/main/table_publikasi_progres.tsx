"use client";

import {
  Paper,
  Stack,
  Center,
  Title,
  Table,
  Group,
  Avatar,
} from "@mantine/core";
import _ from "lodash";
import moment from "moment";

export default function TablePublikasiProgresInvestasi({
  publishProgres,
}: {
  publishProgres: any[];
}) {
  return (
    <>
      <Paper
        radius={"md"}
        bg={"gray.4"}
        p={"sm"}
        // sx={{ borderStyle: "solid", borderColor: "teal" }}
      >
        <Stack spacing={"xl"}>
          <Center>
            <Title order={4}>Publikasi & Progres Investasi</Title>
          </Center>
          <Table bg={"gray.2"} sx={{borderRadius: "10px"}}>
            <thead>
              <tr>
                <th>
                  <Center>Username</Center>
                </th>
                <th>
                  <Center>Publis</Center>
                </th>
                <th>
                  <Center>Progres</Center>
                </th>
               
              </tr>
            </thead>
            <tbody>
              {_.isEmpty(publishProgres)
                ? []
                : publishProgres.map((e) => (
                    <tr key={e.id}>
                      <td>
                        <Group position="left">
                          <Avatar variant="gradient" radius={"xl"} />{" "}
                          {e.author.username}
                        </Group>
                      </td>
                      <td>
                        <Center>
                          {moment(e.updatedAt).format("DD MMM YYYY")}{" "}
                        </Center>
                      </td>
                      <td>
                        <Center>{e.progress} %</Center>
                      </td>
                      
                    </tr>
                  ))}
            </tbody>
          </Table>
        </Stack>
      </Paper>
    </>
  );
}
